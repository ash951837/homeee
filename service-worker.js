const CACHE_NAME = 'sumeyye-index-oyun-cache-2026-07-17-masal-studio-v8';
const CORE_ASSETS = [
  './',
  './index.html',
  './oyun.html',
  './manifest.webmanifest',
  './manifest.json',
  './pwa.css',
  './assets/memories/puzzle.webp',
  './icons/favicon.svg',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/apple-touch-icon.png'
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(CORE_ASSETS)));
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});

async function networkFirst(request, fallbackUrl) {
  const cache = await caches.open(CACHE_NAME);
  try {
    const fresh = await fetch(request);
    if (fresh && fresh.ok) cache.put(request, fresh.clone());
    return fresh;
  } catch (err) {
    return (await cache.match(request)) || (await cache.match(fallbackUrl));
  }
}

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === 'navigate') {
    const path = url.pathname.replace(/\/+$/, '/');
    if (path.endsWith('/oyun.html')) {
      event.respondWith(networkFirst(request, './oyun.html'));
      return;
    }
    if (path === '/' || path.endsWith('/index.html')) {
      event.respondWith(networkFirst(request, './index.html'));
      return;
    }
    event.respondWith(networkFirst(request, './index.html'));
    return;
  }

  event.respondWith(caches.match(request).then(cached => cached || fetch(request).then(response => {
    if (response && response.ok) {
      const copy = response.clone();
      caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
    }
    return response;
  })));
});
