#!/usr/bin/env python3
"""Contrôles statiques du classeur partagé avant déploiement GitHub Pages."""
import base64
import json
import re
import subprocess
import sys
import tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
errors = []


def problem(message):
    errors.append(message)


def check_pdf(path, label):
    path = path.removeprefix("./")
    if not path.startswith("documents/") or "/../" in path or "\\" in path:
        problem(f"{label}: chemin PDF non autorisé : {path}")
        return
    target = (ROOT / path).resolve()
    if not target.is_relative_to(ROOT):
        problem(f"{label}: chemin hors dépôt : {path}")
    elif not target.is_file():
        problem(f"{label}: PDF introuvable : {path}")
    elif target.stat().st_size < 100 or target.open("rb").read(5) != b"%PDF-":
        problem(f"{label}: fichier vide ou non PDF : {path}")


try:
    html = (ROOT / "index.html").read_text(encoding="utf-8")
    planning = (ROOT / "planning.html").read_text(encoding="utf-8")
except OSError as exc:
    sys.exit(f"ERREUR : fichier du site manquant : {exc}")

starter = re.search(
    r'<script\s+id="starter"\s+type="application/json">([\s\S]*?)</script>',
    html,
)
if not starter:
    sys.exit("ERREUR : inventaire JSON #starter absent du site")

try:
    records = json.loads(starter.group(1))
except (ValueError, TypeError) as exc:
    sys.exit(f"ERREUR : inventaire JSON invalide : {exc}")

if not isinstance(records, list) or not records:
    problem("inventaire vide ou incorrect")
    records = []

ids = set()
pdf_count = 0
embedded_count = 0
for item in records:
    if not isinstance(item, dict):
        problem("entrée de l'inventaire non structurée")
        continue
    doc_id = item.get("id")
    if not isinstance(doc_id, str) or not doc_id:
        problem("document sans identifiant")
        continue
    if doc_id in ids:
        problem(f"identifiant dupliqué : {doc_id}")
    ids.add(doc_id)
    if item.get("sem") not in [f"S{x}" for x in range(1, 7)]:
        problem(f"{doc_id}: semestre incorrect")
    if not re.fullmatch(r"(?:[A-E][1-9]|AUTRE)", str(item.get("ue", ""))):
        problem(f"{doc_id}: UE incorrecte")
    if item.get("type") not in {"CM", "TD", "TP", "COURS", "QCM", "FICHE", "ANNEXE"}:
        problem(f"{doc_id}: type incorrect")
    if not item.get("title") or not item.get("topic"):
        problem(f"{doc_id}: titre ou thème manquant")
    if re.search(r"retranscription\s*brute", str(item.get("title", "")), re.I):
        problem(f"{doc_id}: retranscription brute interdite")
    if item.get("filePath"):
        check_pdf(item["filePath"], doc_id)
        pdf_count += 1
        if doc_id.startswith("drive-") and Path(item["filePath"]).name != doc_id[6:] + ".pdf":
            problem(f"{doc_id}: ID Drive et nom du PDF ne correspondent pas")
    elif item.get("embeddedPdf"):
        try:
            pdf = base64.b64decode(item["embeddedPdf"], validate=True)
            if not pdf.startswith(b"%PDF-"):
                problem(f"{doc_id}: PDF intégré invalide")
            embedded_count += 1
        except ValueError:
            problem(f"{doc_id}: PDF intégré mal encodé")
    elif not item.get("images"):
        problem(f"{doc_id}: pas de source PDF")

references = re.findall(r'href=["\'](\.?/?documents/[^"\']+\.pdf)["\']', planning)
for path in references:
    check_pdf(path, "planning.html")

for src in re.findall(r'<script\b[^>]*\bsrc=["\'](\.?/[^"\']+\.js)["\']', html):
    name = src.removeprefix("./")
    if not (ROOT / name).is_file():
        problem(f"script JavaScript manquant : {src}")

inline = re.search(r"<script>\s*('use strict';[\s\S]*?)</script>", html)
if not inline:
    problem("script principal absent")
else:
    with tempfile.TemporaryDirectory() as td:
        inline_path = Path(td) / "classeur-inline.js"
        inline_path.write_text(inline.group(1), encoding="utf-8")
        for script in [inline_path, ROOT / "modules.js"]:
            if script.exists():
                try:
                    check = subprocess.run(
                        ["node", "--check", str(script)],
                        text=True, capture_output=True, timeout=30,
                    )
                except (OSError, subprocess.TimeoutExpired) as exc:
                    problem(f"vérification JavaScript indisponible : {exc}")
                    continue
                if check.returncode:
                    problem(f"JavaScript invalide ({script.name}): {check.stderr.strip()}")

if errors:
    print("ERREURS — publication bloquée :")
    for message in errors:
        print(" -", message)
    sys.exit(1)

print(
    f"OK : {len(records)} supports ; {pdf_count} PDF externes ; "
    f"{embedded_count} PDF intégrés ; {len(references)} liens PDF du planning ; "
    "inventaire, chemins et JavaScript vérifiés."
)
