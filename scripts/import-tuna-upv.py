#!/usr/bin/env python3
"""Importa el catálogo público de CDs de Tuna UPV.

Uso: python scripts/import-tuna-upv.py
El script conserva la URL publicada por cada ficha, comprueba el audio con una
petición Range y escribe src/catalog.json. No descarga ni almacena canciones.
"""
from __future__ import annotations

import json
import re
import sys
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path
from urllib.parse import urljoin

import requests
from bs4 import BeautifulSoup

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "src" / "catalog.json"
BASE = "https://tuna.upv.es/"
HEADERS = {"User-Agent": "Mozilla/5.0 (compatible; Stunafy catalog importer)", "Referer": BASE}


def clean(value: str) -> str:
    return re.sub(r"\\s+", " ", value or "").strip()


def import_cd(session: requests.Session, cd_number: int) -> list[dict]:
    cd_id = f"CD{cd_number:04d}"
    page = session.get(f"{BASE}cd?Id_CD={cd_id}", headers=HEADERS, timeout=30)
    page.raise_for_status()
    soup = BeautifulSoup(page.text, "html.parser")
    text = soup.get_text(" ", strip=True)
    album = clean((soup.find("b") or {}).get_text(" ", strip=True) if soup.find("b") else "")
    group_match = re.search(r"Tuna o grupo:\s*([^\n]+?)(?:Año|Ano|AÃ±o)\s*de publicaci", text, re.I)
    group = clean(group_match.group(1)) if group_match else ""
    result = []
    for audio in soup.find_all("audio"):
        src = audio.get("src", "").strip()
        row = audio.find_parent("tr")
        cells = row.find_all(["td", "th"]) if row else []
        if not src or len(cells) < 2:
            continue
        number = clean(cells[0].get_text(" ", strip=True))
        title = clean(cells[1].get_text(" ", strip=True))
        size = clean(cells[3].get_text(" ", strip=True)) if len(cells) > 3 else ""
        url = urljoin(BASE, src)
        result.append({"cd_id": cd_id, "album": album, "group": group, "number": number,
                       "title": title, "size_mb": size, "audio_url": url,
                       "availability": "unknown", "source": "Tuna UPV"})
    return result


def check_audio(session: requests.Session, item: dict) -> None:
    candidates = [item["audio_url"]]
    if item["audio_url"].lower().endswith(".mp3"):
        candidates.append(item["audio_url"][:-4] + ".MP3")
    for candidate in candidates:
        for attempt in range(3):
            try:
                response = session.get(candidate, headers={**HEADERS, "Range": "bytes=0-0"},
                                       timeout=(8, 20), stream=True)
                ok = response.status_code in (200, 206)
                response.close()
                if ok:
                    item["audio_url"] = candidate
                    item["availability"] = "available"
                    return
                if response.status_code == 404:
                    break
            except requests.RequestException:
                if attempt == 2:
                    continue
    item["availability"] = "missing"


def check_audio_item(item: dict) -> dict:
    """Comprueba una pista en una sesión independiente para poder paralelizar."""
    with requests.Session() as session:
        check_audio(session, item)
    return item


def main() -> int:
    session = requests.Session()
    records: list[dict] = []
    for number in range(1, 61):
        try:
            records.extend(import_cd(session, number))
            print(f"{number:04d}: {len(records)} pistas", flush=True)
        except requests.HTTPError as exc:
            if exc.response is not None and exc.response.status_code == 404:
                continue
            print(f"No se pudo leer CD{number:04d}: {exc}", file=sys.stderr)
    with ThreadPoolExecutor(max_workers=16) as pool:
        records = list(pool.map(check_audio_item, records))
    OUT.write_text(json.dumps(records, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    available = sum(item["availability"] == "available" for item in records)
    print(f"Escritas {len(records)} pistas: {available} disponibles, {len(records)-available} no disponibles")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
