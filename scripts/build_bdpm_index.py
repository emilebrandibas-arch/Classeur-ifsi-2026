#!/usr/bin/env python3
"""Construit un index de recherche des spécialités à partir des exports officiels BDPM.

Source : https://base-donnees-publique.medicaments.gouv.fr/telechargement
Licence ouverte Etalab : attribution de la source et de la date d'extraction.
Un index ne remplace jamais le RCP ni une validation pharmaceutique.
"""
import csv
import io
import json
import re
import urllib.request
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
BASES = [
    "https://base-donnees-publique.medicaments.gouv.fr/download/file/",
    "https://base-donnees-publique.medicaments.gouv.fr/telechargement.php?fichier=",
    "https://rec-bdm.ansm.integra.fr/telechargement.php?fichier=",
]


def load_file(filename):
    problems = []
    for base in BASES:
        url = base + filename
        try:
            req = urllib.request.Request(url, headers={
                "User-Agent": "IFSI-Pedagogie/1.0 (referencement public BDPM)",
                "Accept": "*/*",
            })
            with urllib.request.urlopen(req, timeout=60) as response:
                payload = response.read(12_000_000)
            decoded = None
            for codec in ("utf-8-sig", "cp1252", "iso-8859-1"):
                try:
                    decoded = payload.decode(codec)
                    break
                except UnicodeDecodeError:
                    continue
            if decoded is None:
                raise ValueError("Encodage non reconnu")
            rows = list(csv.reader(io.StringIO(decoded), delimiter="\t"))
            if len(rows) < 10000 or not all(len(r) >= 7 for r in rows[:20]):
                raise ValueError(f"Fichier manifestement incomplet ({len(rows)} lignes)")
            print(f"BDPM : {filename} téléchargé, {len(rows)} lignes, {len(payload)} octets ; {url}")
            return rows, url
        except Exception as exc:
            problems.append(f"{url}: {exc}")
    raise RuntimeError("Téléchargement officiel indisponible :\n" + "\n".join(problems))


def compact_field(value):
    return re.sub(r"\s+", " ", value or "").strip()


specialties, source_specialties = load_file("CIS_bdpm.txt")
compositions, source_compositions = load_file("CIS_COMPO_bdpm.txt")

substances = {}
for row in compositions:
    if len(row) < 7:
        continue
    cis = compact_field(row[0])
    # Nature SA = substance active ; nature FT = fraction thérapeutique.
    if compact_field(row[6]).upper() != "SA":
        continue
    substance = compact_field(row[3])
    if cis and substance:
        items = substances.setdefault(cis, [])
        if substance not in items:
            items.append(substance)

entries = []
seen = set()
for row in specialties:
    if len(row) < 8:
        continue
    cis, name = compact_field(row[0]), compact_field(row[1])
    if not cis.isdigit() or not name or cis in seen:
        continue
    seen.add(cis)
    # [CIS, spécialité exacte, substances actives, forme, voies, état commercialisation]
    entries.append([
        cis,
        name,
        " + ".join(substances.get(cis, [])),
        compact_field(row[2]),
        compact_field(row[3]),
        compact_field(row[6]),
    ])
entries.sort(key=lambda item: item[1].casefold())

if len(entries) < 10000 or sum(bool(e[2]) for e in entries) < 9000:
    raise RuntimeError(f"Index incomplet : {len(entries)} spécialités, "
                       f"{sum(bool(e[2]) for e in entries)} compositions")

now = datetime.now(timezone.utc).isoformat(timespec="seconds")
data = {
    "source": "Base de données publique des médicaments (BDPM) — Ministère chargé de la santé / ANSM",
    "sourceUrl": "https://base-donnees-publique.medicaments.gouv.fr/telechargement",
    "downloadedAt": now,
    "sourceFiles": [source_specialties, source_compositions],
    "count": len(entries),
    "entries": entries,
}
out = ROOT / "medicaments-officiels.js"
out.write_text("window.IFSI_BDPM_INDEX=" + json.dumps(data, ensure_ascii=False, separators=(",", ":")) + ";\n", encoding="utf-8")
print(f"Index BDPM généré : {len(entries)} spécialités, {out.stat().st_size} octets, extrait le {now}")
