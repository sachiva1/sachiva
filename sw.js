// Basic service worker for caching static assets
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('sachiva-static-v2').then(function(cache) {
      return cache.addAll([
        '/',
        '/index.html',
        '/html/about.html',
        '/html/service.html',
        '/html/contributors.html',
        '/html/contact.html',
        '/css/style.min.css',
        '/css/bootstrap.min.css',
        '/css/font-awesome.min.css',
        '/js/custom.min.js',
        '/js/jquery-3.4.1.min.js',
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
