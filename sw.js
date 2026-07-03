/* PWA Service Worker - link, site kökü ve PWA açılışı index.html */
const CACHE_VERSION = 'sumeyye-index-pwa-20260704-v3';
const APP_SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/maskable-192.png',
  './icons/maskable-512.png',
  './icons/apple-touch-icon.png'
];
const OLD_CACHE_PREFIXES = [
  'sumeyye', 'hikayemiz', 'nightfall', 'pwa-cache', 'app-cache', 'oyun', 'game'
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_VERSION).then(cache => cache.addAll(APP_SHELL).catch(() => undefined))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map(key => {
      if (key !== CACHE_VERSION && OLD_CACHE_PREFIXES.some(prefix => key.toLowerCase().includes(prefix))) {
        return caches.delete(key);
      }
      if (key !== CACHE_VERSION && key.startsWith('sumeyye-index-pwa-')) {
        return caches.delete(key);
      }
    }));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // Aynı domainde sayfa/navigasyon istekleri her zaman index.html'e düşsün.
  if (req.mode === 'navigate' && url.origin === self.location.origin) {
    event.respondWith(
      fetch('./index.html', { cache: 'no-store' })
        .catch(() => caches.match('./index.html'))
    );
    return;
  }

  // Eski oyun.html isteği gelirse index.html ver.
  if (url.origin === self.location.origin && /\/oyun\.html$/i.test(url.pathname)) {
    event.respondWith(
      fetch('./index.html', { cache: 'no-store' })
        .catch(() => caches.match('./index.html'))
    );
    return;
  }

  // Assetlerde önce ağ, olmazsa cache.
  event.respondWith(
    fetch(req).then(res => {
      const copy = res.clone();
      if (url.origin === self.location.origin) {
        caches.open(CACHE_VERSION).then(cache => cache.put(req, copy)).catch(() => undefined);
      }
      return res;
    }).catch(() => caches.match(req))
  );
});
