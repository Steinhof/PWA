const VERSION = '1.07';
const CACHE_NAME = `PreCache-${VERSION}`;

const CACHED_URLS = [
    '/',
    'css/main.css',
    'img/cat.webp'
];


/*  Add files to site cache */
self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(CACHED_URLS);
            })
            .catch(error => console.error(error)));
    console.log('service worker installed');
});


/*  Remove old files from cache */
self.addEventListener('activate', function (event) {
    event.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames.map((item) => {
                        if (CACHE_NAME !== item) {
                            return caches.delete(item);
                        }
                    })
                ).catch(error => console.error(error));
            })
    );
    console.log('service worker activated');
});


self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request)
            .then(function (response) {
                return response || fetch(event.request);
            })
            .catch(error => console.error(error))
    );
    console.log('fetch complete');
});
