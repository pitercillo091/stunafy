import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const port = Number(process.env.PORT || 4173);
const mime = { '.html':'text/html; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.css':'text/css; charset=utf-8', '.json':'application/json; charset=utf-8', '.png':'image/png', '.svg':'image/svg+xml' };
async function fetchAudio(upstream, headers) {
  let lastError;
  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      const response = await fetch(upstream, { headers, signal: AbortSignal.timeout(30000) });
      if (response.status < 500 || attempt === 2) return response;
      await response.body?.cancel();
    } catch (error) {
      lastError = error;
      if (attempt < 2) await new Promise(resolve => setTimeout(resolve, 250 * (attempt + 1)));
    }
  }
  throw lastError || new Error('No se pudo conectar con Tuna UPV');
}

const server = http.createServer(async (req, res) => {
  const requestPath = new URL(req.url, `http://${req.headers.host}`).pathname;
  if (requestPath.startsWith('/audio/')) {
    const upstream = `https://tuna.upv.es${requestPath}`;
    const headers = { 'Referer': 'https://tuna.upv.es/', 'User-Agent': 'Mozilla/5.0' };
    if (req.headers.range) headers.Range = req.headers.range;
    try {
      const response = await fetchAudio(upstream, headers);
      res.writeHead(response.status, {
        'Content-Type': response.headers.get('content-type') || 'audio/mpeg',
        'Content-Length': response.headers.get('content-length') || undefined,
        'Content-Range': response.headers.get('content-range') || undefined,
        'Accept-Ranges': response.headers.get('accept-ranges') || 'bytes',
        'Cache-Control': 'no-store'
      });
      if (req.method === 'HEAD') { response.body?.cancel(); res.end(); return; }
      if (response.body) response.body.pipeTo(new WritableStream({ write(chunk) { res.write(Buffer.from(chunk)); }, close() { res.end(); } }));
    } catch { res.writeHead(502); res.end('No se pudo conectar con Tuna UPV'); }
    return;
  }
  const safePath = requestPath === '/' ? '/index.html' : requestPath;
  const file = path.join(root, 'dist', path.normalize(safePath).replace(/^\\|^\//, ''));
  if (!file.startsWith(path.join(root, 'dist'))) return res.writeHead(403).end();
  fs.readFile(file, (err, data) => { if (err) return res.writeHead(404).end(); res.writeHead(200, { 'Content-Type': mime[path.extname(file)] || 'application/octet-stream' }); res.end(data); });
});
server.listen(port, () => console.log(`Stunafy en http://localhost:${port}`));
