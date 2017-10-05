/** An empty service worker! */
// self.addEventListener('fetch', function(event) {
//   /** An empty fetch handler! */
// });
// self.addEventListener('push', function(event) {
//   event.waitUntil(
//     self.registration.showNotification('Got Push?', {
//       body: 'Push Message received'
//    }));
// });
var cacheVersion=2;
var cacheName = 'ticketup-pwa-v'+ cacheVersion;

var filesToCache = [
    './',
    './index.html',
    './style.css',
    './images/TicketUp.png',
    './images/HappyHour.png',
    './images/header_bg.jpg',
    './images/ladies.png',
    './images/music.png',
    './images/pitcher.png',
    './js/app.js',
    './js/factory.js',
    './js/form.js',
    './js/indexScript.js',
    './js/update-meta.js',
    './js/views/home.html',
    './js/views/pass.html',
    './js/views/pubdetail.html',
    './js/views/brewpass.html',
    './js/views/passFaq.html',
    './js/views/popupForm.html',
    './js/views/signin.html',
    './js/views/signup.html',
    './bower_components/bootstrap/dist/css/bootstrap.min.css',
    './bower_components/font-awesome/css/font-awesome.min.css',
    './bower_components/jquery/dist/jquery.min.js',
    './bower_components/bootstrap/dist/js/bootstrap.min.js',
    './bower_components/angular/angular.min.js',
    './bower_components/angular-route/angular-route.min.js',
    './bower_components/angular-filter/dist/angular-filter.min.js',
    'https://script.google.com/macros/s/AKfycbygukdW3tt8sCPcFDlkMnMuNu9bH5fpt7bKV50p2bM/exec?id=1_GTIZgDTLY5_MXwSiszk0iAnhkS4ektSvRQKszHW8YI&sheet=happyHour'
];

// Install Service Worker
self.addEventListener('install', function(event) {

    // console.log('Service Worker: Installing....');

    event.waitUntil(

        // Open the Cache
        caches.open(cacheName).then(function(cache) {
            // console.log('Service Worker: Caching App Shell at the moment......');

            // Add Files to the Cache
            return cache.addAll(filesToCache);
        })
    );
});


// Fired when the Service Worker starts up
self.addEventListener('activate', function(event) {

    // console.log('Service Worker: Activating....');

    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(cacheNames.map(function(key) {
                if( key !== cacheName) {
                    // console.log('Service Worker: Removing Old Cache', key);
                    return caches.delete(key);
                }
            }));
        })
    );
    return self.clients.claim();
});


// self.addEventListener('fetch', function(event) {

//     console.log('Service Worker: Fetch', event.request.url);

//     console.log("Url", event.request.url);

//     event.respondWith(
//         caches.match(event.request).then(function(response) {
//             // return response || fetch(event.request);
//             if (response) {
//           		return response;
//         	}
//         return fetch(event.request);
//         })
//     );
// });

self.addEventListener('fetch', function(e) {
	// console.log('[ServiceWorker] Fetch', e.request.url);

	// e.respondWidth Responds to the fetch event
	e.respondWith(

		// Check in cache for the request being made
		caches.match(e.request)
			.then(function(response) {

				// If the request is in the cache
				if ( response ) {
					// console.log("[ServiceWorker] Found in Cache", e.request.url, response);
					// Return the cached version
					return response;
				}
				// If the request is NOT in the cache, fetch and cache
				var requestClone = e.request.clone();
				fetch(requestClone)
					.then(function(response) {

						if ( !response ) {
							// console.log("[ServiceWorker] No response from fetch ")
							return response;
						}

						var responseClone = response.clone();

						//  Open the cache
						caches.open(cacheName).then(function(cache) {

							// Put the fetched response in the cache
							cache.put(e.request, responseClone);
							// console.log('[ServiceWorker] New Data Cached', e.request.url);

							// Return the response
							return response;
			
				        }); // end caches.open

					})
					.catch(function(err) {
						// console.log('[ServiceWorker] Error Fetching & Caching New Data', err);
					});


			}) // end caches.match(e.request)
	); // end e.respondWith
});

console.log('Started', self);
self.addEventListener('install', function(event) {
  self.skipWaiting();
  console.log('Installed', event);
});
self.addEventListener('activate', function(event) {
  console.log('Activated', event);
});
self.addEventListener('push', function(event) {
  console.log('Push message', event);
  var title = 'Le push de test :)';
  event.waitUntil(
    self.registration.showNotification(title, {
     body: 'Bravo tu l\'as reçu',
     icon: 'images/icon.png',
     tag: 'my-tag'
   }));
});