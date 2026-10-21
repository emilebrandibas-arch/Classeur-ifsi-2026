/* Mise à jour automatique du classeur public : vérifie la version réellement déployée. */
(() => {
  "use strict";
  const current = window.__IFSI_RELEASE;
  if (!current || !current.sha) return;

  const script = document.currentScript;
  const manifestUrl = new URL("version.json", script ? script.src : document.baseURI);
  const currentTime = Date.parse(current.builtAt || "") || 0;
  let checking = false;

  async function checkForPublishedUpdate() {
    if (checking || document.visibilityState === "hidden") return;
    checking = true;
    try {
      const url = new URL(manifestUrl.href);
      url.searchParams.set("nocache", String(Date.now()));
      const response = await fetch(url.href, {cache: "no-store"});
      if (!response.ok) return;
      const latest = await response.json();
      if (!latest.sha || latest.sha === current.sha) return;
      const latestTime = Date.parse(latest.builtAt || "") || 0;
      if (latestTime < currentTime) return;

      // Évite des rechargements en boucle pendant la propagation du CDN.
      const storageKey = "ifsi-autorefresh-" + latest.sha;
      try {
        const last = Number(sessionStorage.getItem(storageKey) || "0");
        if (Date.now() - last < 120000) return;
        sessionStorage.setItem(storageKey, String(Date.now()));
      } catch (_) {}

      // Le paramètre versionné permet d'éviter une page HTML ancienne en cache.
      const next = new URL(window.location.href);
      next.searchParams.set("ifsi_version", latest.sha.slice(0, 12));
      next.searchParams.set("ifsi_refresh", String(Date.now()));
      window.location.replace(next.href);
    } catch (_) {
      // Hors connexion : la version déjà affichée reste lisible.
    } finally {
      checking = false;
    }
  }

  setTimeout(checkForPublishedUpdate, 2000);
  setInterval(checkForPublishedUpdate, 30000);
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") checkForPublishedUpdate();
  });
  window.addEventListener("focus", checkForPublishedUpdate);
})();
