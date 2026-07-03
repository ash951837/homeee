// Hİkayemiz / Bizim PWA Service Worker - sağlam sürüm
const CACHE_NAME = "hikayemiz-bizim-pwa-v3";

const APP_SHELL = [
  "./",
  "./index.html",
  "./oyun.html",
  "./offline.html",
  "./404.html",
  "./manifest.json",
  "./manifest.webmanifest",
  "./pwa.css",
  "./pwa.js",
  "./icons/favicon.svg",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/apple-touch-icon.png"
];

function sameOrigin(request) {
  try { return new URL(request.url).origin === self.location.origin; }
  catch (_) { return false; }
}

self.addEventListener("install", (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    // Bir dosya eksik olursa bütün PWA kurulumu bozulmasın diye allSettled kullanıyoruz.
    await Promise.allSettled(APP_SHELL.map((url) => cache.add(new Request(url, { cache: "reload" }))));
    await self.skipWaiting();
  })());
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map((key) => key === CACHE_NAME ? null : caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET" || !sameOrigin(request)) return;

  // Sayfa gezintilerinde önce internetten dene, olmazsa cache/offline göster.
  if (request.mode === "navigate") {
    event.respondWith((async () => {
      try {
        const fresh = await fetch(request);
        const cache = await caches.open(CACHE_NAME);
        cache.put(request, fresh.clone());
        return fresh;
      } catch (_) {
        const cached = await caches.match(request);
        if (cached) return cached;
        const home = await caches.match("./index.html");
        if (home) return home;
        return caches.match("./offline.html");
      }
    })());
    return;
  }

  // Diğer dosyalarda cache-first + arkada güncelleme.
  event.respondWith((async () => {
    const cached = await caches.match(request);
    const networkPromise = fetch(request).then(async (response) => {
      if (response && response.ok) {
        const cache = await caches.open(CACHE_NAME);
        cache.put(request, response.clone());
      }
      return response;
    }).catch(() => null);

    return cached || await networkPromise || Response.error();
  })());
});
