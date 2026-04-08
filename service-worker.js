const CACHE_NAME = 'gngcc-v2';
const APP_SHELL = [
    './',
    './index.html',
    './about.html',
    './team.html',
    './contact.html',
    './membership.html',
    './sponsorship.html',
    './terms-and-conditions.html',
    './privacy-policy.html',
    './cookie-policy.html',
    './offline.html',
    './manifest.webmanifest',
    './assets/css/style.css',
    './assets/js/main.js',
    './assets/images/gng-logo.png',
    './assets/images/favicon-16.png',
    './assets/images/favicon-32.png',
    './assets/images/apple-touch-icon.png',
    './assets/images/icon-192.png',
    './assets/images/icon-512.png',
];

function resolveAppUrl(path) {
    return new URL(path, self.registration.scope).toString();
}

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.addAll(APP_SHELL.map(resolveAppUrl));
        })
    );
    self.skipWaiting();
});

self.addEventListener('activate', function (event) {
    event.waitUntil(
        caches.keys().then(function (keys) {
            return Promise.all(
                keys.filter(function (key) {
                    return key !== CACHE_NAME;
                }).map(function (key) {
                    return caches.delete(key);
                })
            );
        })
    );
    self.clients.claim();
});

self.addEventListener('fetch', function (event) {
    if (event.request.method !== 'GET') return;

    if (event.request.mode === 'navigate') {
        event.respondWith(
            fetch(event.request)
                .then(function (response) {
                    const responseClone = response.clone();
                    caches.open(CACHE_NAME).then(function (cache) {
                        cache.put(event.request, responseClone);
                    });
                    return response;
                })
                .catch(function () {
                    return caches.match(event.request).then(function (cachedResponse) {
                        return cachedResponse || caches.match(resolveAppUrl('./offline.html'));
                    });
                })
        );
        return;
    }

    event.respondWith(
        caches.match(event.request).then(function (cachedResponse) {
            if (cachedResponse) return cachedResponse;

            return fetch(event.request).then(function (response) {
                const responseClone = response.clone();
                caches.open(CACHE_NAME).then(function (cache) {
                    cache.put(event.request, responseClone);
                });
                return response;
            }).catch(function () {
                return caches.match(event.request);
            });
        })
    );
});
