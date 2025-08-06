// Basic service worker for caching static assets
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('sachiva-static-v1').then(function(cache) {
      return cache.addAll([
        '/',
        '/index.html',
        '/about.html',
        '/service.html',
        '/contributors.html',
        '/contact.html',
        '/css/style.min.css',
        '/css/bootstrap.min.css',
        '/js/custom.min.js',
        '/images/logo_blue.png'
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
