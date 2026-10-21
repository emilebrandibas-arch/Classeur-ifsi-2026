#!/usr/bin/env python3
"""Préparer la copie du site destinée à GitHub Pages (sans changer les sources)."""
import json
import os
import re
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sha = os.environ.get("GITHUB_SHA", "").strip()
if not re.fullmatch(r"[a-f0-9]{40}", sha):
    raise SystemExit("GITHUB_SHA absent ou invalide : publication bloquée.")

built_at = datetime.now(timezone.utc).isoformat(timespec="seconds")
manifest = {"sha": sha, "builtAt": built_at, "source": "github-pages"}
(ROOT / "version.json").write_text(
    json.dumps(manifest, ensure_ascii=False, separators=(",", ":")) + "\n",
    encoding="utf-8",
)

injection = (
    '<script>window.__IFSI_RELEASE__='
    + json.dumps({"sha": sha, "builtAt": built_at}, ensure_ascii=False)
    + ';</script><script defer src="./site-sync.js?v='
    + sha[:12]
    + '"></script>'
)

for page in ROOT.glob("*.html"):
    html = page.read_text(encoding="utf-8")
    if "</head>" not in html:
        raise SystemExit(f"{page.name} : balise </head> absente")
    # Casse le cache pour les scripts et les PDF quand une publication les modifie.
    html = re.sub(
        r'(src=["\']\./(?:lexique-ifsi|modules)\.js)(?:\?[^"\']*)?(["\'])',
        lambda m: m.group(1) + "?v=" + sha[:12] + m.group(2),
        html,
    )
    html = re.sub(
        r'("filePath"\s*:\s*"\./documents/[^"?]+\.pdf)(?:\?[^"]*)?(")',
        lambda m: m.group(1) + "?v=" + sha[:12] + m.group(2),
        html,
    )
    html = re.sub(
        r'(href=["\'](?:\./)?documents/[^"\']+\.pdf)(?:\?[^"\']*)?(["\'])',
        lambda m: m.group(1) + "?v=" + sha[:12] + m.group(2),
        html,
    )
    page.write_text(html.replace("</head>", injection + "</head>", 1), encoding="utf-8")
    print("Version intégrée :", page.name, sha[:12])

print("Manifest publié :", json.dumps(manifest, ensure_ascii=False))
