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
var cacheVersion=11;
var cacheName = 'ticketup-pwa-v'+ cacheVersion;

var filesToCache = [
    
    './index.html',
    './style.css',
    './Comfortaa-Regular.ttf',

    './images/001-pint.svg',
    './images/001-questions-button.svg',
    './images/001-signs.svg',
    './images/002-add.svg',
    './images/002-menu.svg',
    './images/002-music.svg',
    './images/003-women.svg',
    './images/004-placeholder.svg',
    './images/add.svg',
    './images/Avatar.png',
    './images/Bad Bucket.svg',
    './images/Beer.svg',
    './images/BG_PC.png',
    './images/BGcopy.svg',
    './images/cancel (blue).svg',
    './images/cancel.svg',
    './images/Craft Brew.svg',
    './images/Draught Pitcher.svg',
    './images/facebook-share.svg',
    './images/Gift_card_selected.svg',
    './images/Gift_card_unselected.svg',
    './images/hands.svg',
    './images/Happy_hour_selected.svg',
    './images/Happy_hour_unselected.svg',
    './images/HappyHour.png',
    './images/ladies.png',
    './images/Login Background.png',
    './images/logo.png',
    './images/Mug.svg',
    './images/music.png',
    './images/notification_selected.svg',
    './images/notification_unselected.svg',
    './images/OurStory.png',
    './images/Passes(selected).svg',
    './images/Passes(unselected).svg',
    './images/pitcher.png',
    './images/Profile_Selected.svg',
    './images/Profile_unselected.svg',
    './images/remove.svg',
    './images/round-help-button.png',
    './images/Scotch.svg',
    './images/Shooting Stars.svg',
    './images/TicketUp.png',
    './images/Vodka.svg',
    './images/banners/Prost.png',
    './images/banners/Hoot Banner.png',
    './images/banners/Watsons Chennai.png',

    './js/app.js',
    // './js/factory.js',
    './js/form.js',
    './js/indexScript.js',
    // './js/update-meta.js',
    './js/views/home.html',
    './js/views/checkout.html',
    './js/views/pass.html',
    './js/views/notification.html',
    './js/views/brewpass.html',
    './js/views/ourStory.html',
    './js/views/popupForm.html',
    './js/views/signin.html',
    './js/views/signup.html',
    './js/views/profile.html',
    './js/views/passFaq.html',
    './staticpages/logout.html',
    './staticpages/privacypolicy.html',
    './staticpages/termCondition.html',

    './js/services/authentication.js',
    './js/services/merchantFactory.js',
    './js/services/passesService.js',
    './js/services/paymentService.js',
    './js/services/sheetFactory.js',

    './js/controllers/brewPassController.js',
    './js/controllers/checkoutController.js',
    './js/controllers/happyhourCtrl.js',
    './js/controllers/passController.js',
    './js/controllers/profileController.js',
    './js/controllers/signInController.js',
    './js/controllers/signUpController.js',
    './js/controllers/thankyouController.js',


    './bower_components/bootstrap/dist/css/bootstrap.min.css',
    './bower_components/font-awesome/css/font-awesome.min.css',
    './bower_components/jquery/dist/jquery.min.js',
    './bower_components/bootstrap/dist/js/bootstrap.min.js',
    './bower_components/angular/angular.min.js',
    './bower_components/angular-ui-router/release/angular-ui-router.min.js',
    './bower_components/angular-filter/dist/angular-filter.min.js',
    './bower_components/ngstorage/ngStorage.min.js',
    'https://script.google.com/macros/s/AKfycbygukdW3tt8sCPcFDlkMnMuNu9bH5fpt7bKV50p2bM/exec?id=1_GTIZgDTLY5_MXwSiszk0iAnhkS4ektSvRQKszHW8YI&sheet=happyHour',
    'https://www.receptio.in/TicketUp/passes?page=0&count=10'
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

// console.log('Started', self);
// self.addEventListener('install', function(event) {
//   self.skipWaiting();
//   console.log('Installed', event);
// });
// self.addEventListener('activate', function(event) {
//   console.log('Activated', event);
// });
// self.addEventListener('push', function(event) {
//   console.log('Push message', event);
//   var title = 'Le push de test :)';
//   event.waitUntil(
//     self.registration.showNotification(title, {
//      body: 'Bravo tu l\'as reçu',
//      icon: 'images/icon.png',
//      tag: 'my-tag'
//    }));
// });