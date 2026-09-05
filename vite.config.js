import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    proxy: {
      '/audio': {
        target: 'https://tuna.upv.es',
        changeOrigin: true,
        secure: false,
        configure: (proxy) => {
          proxy.on('proxyReq', (proxyReq) => {
            proxyReq.setHeader('Referer', 'https://tuna.upv.es/');
            proxyReq.setHeader('Origin', 'https://tuna.upv.es');
            proxyReq.setHeader('User-Agent', 'Mozilla/5.0');
          });
        }
      }
    }
  }
});
