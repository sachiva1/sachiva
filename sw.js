// Enhanced Service Worker for Sachiva Website
// Implements advanced caching strategy for optimal performance

const CACHE_NAME = 'sachiva-v2';
const STATIC_CACHE = 'sachiva-static-v2';
const DYNAMIC_CACHE = 'sachiva-dynamic-v2';

const staticAssets = [
  '/',
  '/index.html',
  '/about.html',
  '/service.html',
  '/contributors.html',
  '/contact.html',
  '/css/style.css',
  '/css/bootstrap.css',
  '/css/responsive.css',
  '/css/dark-mode-fixes.css',
  '/css/font-awesome.min.css',
  '/js/jquery-3.4.1.min.js',
  '/js/bootstrap.js',
  '/js/custom.js',
  '/images/logo_blue.png',
  '/images/maintenance.gif',
  '/images/about_us.gif',
  '/images/Expert_Solutions.gif'
];

// Install event - cache static resources
self.addEventListener('install', function(event) {
  console.log('[ServiceWorker] Install');
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(function(cache) {
        console.log('[ServiceWorker] Caching static assets');
        return cache.addAll(staticAssets);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', function(event) {
  console.log('[ServiceWorker] Activate');
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
            console.log('[ServiceWorker] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event - implement cache-first strategy with network fallback
self.addEventListener('fetch', function(event) {
  const { request } = event;
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  event.respondWith(
    caches.match(request)
      .then(function(cachedResponse) {
        if (cachedResponse) {
          console.log('[ServiceWorker] Serving from cache:', request.url);
          return cachedResponse;
        }

        console.log('[ServiceWorker] Fetching from network:', request.url);
        return fetch(request)
          .then(function(response) {
            // Check if we received a valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response as it can only be consumed once
            const responseToCache = response.clone();

            // Cache dynamic content
            caches.open(DYNAMIC_CACHE)
              .then(function(cache) {
                cache.put(request, responseToCache);
              });

            return response;
          })
          .catch(function() {
            // Network failed, try to serve a fallback
            if (request.destination === 'document') {
              return caches.match('/index.html');
            }
          });
      })
  );
});

// Background sync for offline functionality
self.addEventListener('sync', function(event) {
  if (event.tag === 'background-sync') {
    console.log('[ServiceWorker] Background sync triggered');
    event.waitUntil(doBackgroundSync());
  }
});

function doBackgroundSync() {
  // Implement background sync logic here
  return Promise.resolve();
}
