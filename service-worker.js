/* Service worker — Tarjeta digital FRC · Alianza Legal
   Estrategia: precache del shell + red con respaldo de caché para el resto.
   Al activarse limpia versiones anteriores de la caché. */

const CACHE_NAME = 'frc-tarjeta-v1';
const PRECACHE_URLS = [
  './',
  './index.html',
  './manifest.json',
  './data/configuracion.json',
  './data/servicios.json',
  './assets/logo/frc.jpg',
  './assets/logo/icon-192.png',
  './assets/logo/icon-512.png',
  './assets/perfil/foto-perfil.svg',
  './assets/galeria/foto1.svg',
  './assets/galeria/foto2.svg',
  './assets/galeria/foto3.svg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .catch(() => {})
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  const esLocal = url.origin === self.location.origin;

  if (esLocal && url.pathname.includes('/assets/')) {
    // Assets locales: caché primero, luego red.
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) return cached;
        return fetch(request).then((response) => {
          const copia = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copia));
          return response;
        }).catch(() => cached);
      })
    );
  } else {
    // Navegación y demás: red primero, respaldo de caché sin conexión.
    event.respondWith(
      fetch(request).then((response) => {
        if (esLocal) {
          const copia = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copia));
        }
        return response;
      }).catch(() => caches.match(request))
    );
  }
});
