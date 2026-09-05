#!/usr/bin/env python3
"""Valida las rutas de audio del catálogo contra una instalación Stunafy."""
import json
import sys
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

import requests

ROOT = Path(__file__).resolve().parents[1]
CATALOG = ROOT / "src" / "catalog.json"
BASE = "http://localhost:4173"


def check(item):
    source = item["audio_url"]
    path = source.split("tuna.upv.es", 1)[-1] if "tuna.upv.es" in source else source
    url = BASE + path if path.startswith("/") else BASE + "/" + path
    headers = {"Range": "bytes=0-0"}
    for attempt in range(3):
        try:
            r = requests.get(url, headers=headers, timeout=(4, 12), stream=True)
            code = r.status_code
            content_type = r.headers.get("content-type", "")
            r.close()
            if code in (200, 206):
                return item["cd_id"] + "-" + item["number"], "available", content_type
            if code == 404:
                return item["cd_id"] + "-" + item["number"], "missing", content_type
        except requests.RequestException:
            if attempt == 2:
                return item["cd_id"] + "-" + item["number"], "temporary-error", ""
    return item["cd_id"] + "-" + item["number"], "temporary-error", ""


def main():
    if not requests.get(BASE + "/", timeout=5).ok:
        print("No se pudo conectar con Stunafy en " + BASE, file=sys.stderr)
        return 2
    items = json.loads(CATALOG.read_text(encoding="utf-8"))
    # Cuatro conexiones evitan saturar el servidor de origen durante una auditoría.
    with ThreadPoolExecutor(max_workers=4) as pool:
        results = list(pool.map(check, items))
    counts = {state: sum(status == state for _, status, _ in results) for state in {r[1] for r in results}}
    print(f"Validadas {len(items)} pistas: {counts}")
    for key, status, _ in results:
        if status != "available":
            print(f"{key}: {status}")
    return 0 if counts.get("temporary-error", 0) == 0 else 1


if __name__ == "__main__":
    raise SystemExit(main())
