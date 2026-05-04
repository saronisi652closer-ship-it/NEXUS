/* ============================================================
   My Apps – Service Worker  (cache-first / network-first)
   ============================================================ */
const CACHE_NAME = 'myapps-v1';

const PRECACHE = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(c => Promise.allSettled(PRECACHE.map(url => c.add(url).catch(() => {}))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);

  // 外部URL → Network First
  if (url.origin !== self.location.origin) {
    e.respondWith(
      fetch(e.request)
        .then(res => { caches.open(CACHE_NAME).then(c => c.put(e.request, res.clone())); return res; })
        .catch(() => caches.match(e.request)
          .then(r => r || new Response('オフライン中です', { status: 503, headers: { 'Content-Type': 'text/plain;charset=utf-8' } }))
        )
    );
    return;
  }

  // 同一オリジン → Cache First
  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(res => {
        caches.open(CACHE_NAME).then(c => c.put(e.request, res.clone()));
        return res;
      }).catch(() => caches.match('./index.html')
        .then(r => r || new Response('オフライン中です', { status: 503 }))
      );
    })
  );
});
