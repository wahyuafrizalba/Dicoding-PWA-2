const CACHE_NAME = 'balbalan-v1';
let urlsToCache = [
  "/",
  "/nav.html",
  "/index.html",
  "/kelasemen.html",
  "/detailklub.html",
  "/pages/beranda.html",
  "/pages/liga.html",
  "/pages/klubtersimpan.html",

  "/css/materialize.min.css",
  "/css/style.css",
  "/css/stylehp.css",

  "/js/api.js",
  "/js/db.js",
  "/js/idb.js",
  "/js/materialize.min.js",
  "/js/nav.js",
  "/push.js",

  "/image/putihapple.png",
  "/image/putihgoogleplay.png",
  "/image/Utama.png",
  "/image/16x16.png",
  "/image/32x32.png",
  "/image/57x57.png",
  "/image/60x60.png",
  "/image/72x72.png",
  "/image/76x76.png",
  "/image/96x96.png",
  "/image/114x114.png",
  "/image/120x120.png",
  "/image/144x144.png",
  "/image/152x152.png",
  "/image/180x180.png",
  "/image/192x192.png",
  "/image/512x512.png",
  "/image/EPL.png",
  "/image/Bundesliga.png",
  "/image/LaLiga.png",
  "/image/Ligue1.png",
  "/image/Eredivise.png",

  "/image/giphy.gif",

  "/manifest.json",

  "https://fonts.googleapis.com/icon?family=Material+Icons",
  "https://fonts.googleapis.com/css2?family=Quicksand:wght@400;700&display=swap"

];
 
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener("fetch", (event) => {
    let base_url = "http://api.football-data.org/";
    if (event.request.url.indexOf(base_url) > -1) {
        event.respondWith(
            caches.open(CACHE_NAME).then((cache) => {
                return fetch(event.request).then((response) => {
                    cache.put(event.request.url, response.clone());
                    return response;
                })
            })
        );
    } else {
        event.respondWith(
            caches.match(event.request, {'ignoreSearch': true}).then((response) => {
                return response || fetch (event.request);
            })
        )
    }
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName != CACHE_NAME) {
                        console.log("ServiceWorker: cache " + cacheName + " dihapus");
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener('push', (event) => {
    let body;
    if (event.data) {
        body = event.data.text();
    } else {
        body = 'Push message no payload';
    }
    let options = {
        body: body,
        icon: 'img/notification.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };
    event.waitUntil(
    self.registration.showNotification('Push Notification', options)
    );
});