const CACHE_NAME = 'hikayemiz-site-V14-page-card-removed';
const CORE_ASSETS = [
  './', './index.html', './oyun.html', './manifest.webmanifest', './manifest.json', './pwa.css',
  './icons/favicon.svg', './icons/icon-192.png', './icons/icon-512.png', './icons/apple-touch-icon.png',
  './assets/smooth-mobile.css', './assets/smooth-mobile.js', './assets/premium-v2.css', './assets/premium-v2.js', './assets/index-v6.css', './assets/index-v6.js', './assets/index-v7.css', './assets/index-v7.js', './assets/site-mobile-v13.css', './assets/site-mobile-v13.js',
  './assets/media/photo-01-d36c0449ff95.webp'
];
self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(CORE_ASSETS).catch(() => undefined)));
});
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});
function isHtmlRequest(request){ return request.mode === 'navigate' || (request.headers.get('accept') || '').includes('text/html'); }
function isStaticAsset(url){ return /\.(css|js|png|jpg|jpeg|webp|svg|woff2?)$/i.test(url.pathname); }
self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== location.origin) return;
  if (isHtmlRequest(request)) {
    event.respondWith(fetch(request).then(response => {
      const copy = response.clone(); caches.open(CACHE_NAME).then(cache => cache.put(request, copy)); return response;
    }).catch(() => caches.match(request).then(res => res || caches.match('./index.html'))));
    return;
  }
  if (isStaticAsset(url)) {
    event.respondWith(caches.match(request).then(cached => cached || fetch(request).then(response => {
      const copy = response.clone(); caches.open(CACHE_NAME).then(cache => cache.put(request, copy)); return response;
    })));
  }
});
