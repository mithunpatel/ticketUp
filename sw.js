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

'use strict';

var cacheVersion=12;
var cacheName = 'ticketup-pwa-v'+ cacheVersion;

const OFFLINE_URL = [
    
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

    './js/all.js',
    // './js/app.js',
    // // './js/factory.js',
    // './js/form.js',
    // './js/indexScript.js',
    // // './js/update-meta.js',
    // './js/views/home.html',
    // './js/views/checkout.html',
    // './js/views/pass.html',
    // './js/views/notification.html',
    // './js/views/brewpass.html',
    // './js/views/ourStory.html',
    // './js/views/popupForm.html',
    // './js/views/signin.html',
    // './js/views/signup.html',
    // './js/views/profile.html',
    // './js/views/passFaq.html',
    // './staticpages/logout.html',
    // './staticpages/privacypolicy.html',
    // './staticpages/termCondition.html',

    // './js/services/authentication.js',
    // './js/services/merchantFactory.js',
    // './js/services/passesService.js',
    // './js/services/paymentService.js',
    // './js/services/sheetFactory.js',

    // './js/controllers/brewPassController.js',
    // './js/controllers/checkoutController.js',
    // './js/controllers/happyhourCtrl.js',
    // './js/controllers/passController.js',
    // './js/controllers/profileController.js',
    // './js/controllers/signInController.js',
    // './js/controllers/signUpController.js',
    // './js/controllers/thankyouController.js',


    './bower_components/bootstrap/dist/css/bootstrap.min.css',
    './bower_components/font-awesome/css/font-awesome.min.css',
    './bower_components/jquery/dist/jquery.min.js',
    './bower_components/bootstrap/dist/js/bootstrap.min.js',
    './bower_components/angular/angular.min.js',
    './bower_components/angular-ui-router/release/angular-ui-router.min.js',
    './bower_components/angular-filter/dist/angular-filter.min.js',
    './bower_components/ngstorage/ngStorage.min.js',
    'https://script.google.com/macros/s/AKfycbygukdW3tt8sCPcFDlkMnMuNu9bH5fpt7bKV50p2bM/exec?id=1_GTIZgDTLY5_MXwSiszk0iAnhkS4ektSvRQKszHW8YI&sheet=happyHour'
    // 'https://www.receptio.in/TicketUp/passes?page=0&count=10'
    // 'https://www.receptio.in/ticketup/initiatePayment'
];

// Install Service Worker
// self.addEventListener('install', function(event) {

//     // console.log('Service Worker: Installing....');

//     event.waitUntil(

//         // Open the Cache
//         caches.open(cacheName).then(function(cache) {
//             // console.log('Service Worker: Caching App Shell at the moment......');

//             // Add Files to the Cache
//             return cache.addAll(filesToCache);
//         })
//     )
//     .catch(function(err) {
//                         console.log('[ServiceWorker] Error Installing & Caching New Data', err);
//                     });
// });


// // Fired when the Service Worker starts up
// self.addEventListener('activate', function(event) {

//     // console.log('Service Worker: Activating....');

//     event.waitUntil(
//         caches.keys().then(function(cacheNames) {
//             return Promise.all(cacheNames.map(function(key) {
//                 if( key !== cacheName) {
//                     // console.log('Service Worker: Removing Old Cache', key);
//                     return caches.delete(key);
//                 }
//             }));
//         })
//     );
//     return self.clients.claim();
// });


// // self.addEventListener('fetch', function(event) {

// //     console.log('Service Worker: Fetch', event.request.url);

// //     console.log("Url", event.request.url);

// //     event.respondWith(
// //         caches.match(event.request).then(function(response) {
// //             // return response || fetch(event.request);
// //             if (response) {
// //           		return response;
// //         	}
// //         return fetch(event.request);
// //         })
// //     );
// // });

// self.addEventListener('fetch', function(e) {
// 	// console.log('[ServiceWorker] Fetch', e.request.url);

// 	// e.respondWidth Responds to the fetch event
// 	e.respondWith(

// 		// Check in cache for the request being made
// 		caches.match(e.request)
// 			.then(function(response) {

// 				// If the request is in the cache
// 				if ( response ) {
// 					// console.log("[ServiceWorker] Found in Cache", e.request.url, response);
// 					// Return the cached version
// 					return response;
// 				}
// 				// If the request is NOT in the cache, fetch and cache
// 				var requestClone = e.request.clone();
// 				fetch(requestClone)
// 					.then(function(response) {

// 						// if ( !response ) {
// 						// 	// console.log("[ServiceWorker] No response from fetch ")
// 						// 	return response;
// 						// }
//                         // if ( !navigator.onLine) {
//                         //     console.log("You are offline")
//                         // }

//                 return response || fetch(event.request);
          

// 						var responseClone = response.clone();

// 						//  Open the cache
// 						// caches.open(cacheName).then(function(cache) {

// 						// 	// Put the fetched response in the cache
// 						// 	cache.put(e.request, responseClone);
// 						// 	// console.log('[ServiceWorker] New Data Cached', e.request.url);

// 						// 	// Return the response
// 						// 	return response;
			
// 				  //       }); // end caches.open

// 					})
// 					.catch(function(err) {
// 						console.log('[ServiceWorker] Error Fetching & Caching New Data', err);
// 					});


// 			}) // end caches.match(e.request)
// 	); // end e.respondWith
// });



// // Cache signature post request
//     //This retrieves all the information about the POST request including the formdata body, 
//     // where the URL contains updateSignature.
// // Resubmit offline signature requests
//     //This resubmits all cached POST results and then empties the array.

// // self.addEventListener('fetch', function(event) {
// //     // Intercept all fetch requests from the parent page
// //     event.respondWith(
// //         caches.match(event.request)
// //         .then(function(response) {
// //             // Cache signature post request
// //             if (event.request.url.includes('updateSignature') && !navigator.onLine) {
// //                 var request = event.request;
// //                 var headers = {};
// //                 for (var entry of request.headers.entries()) {
// //                     headers[entry[0]] = entry[1];
// //                 }
// //                 var serialized = {
// //                     url: request.url,
// //                     headers: headers,
// //                     method: request.method,
// //                     mode: request.mode,
// //                     credentials: request.credentials,
// //                     cache: request.cache,
// //                     redirect: request.redirect,
// //                     referrer: request.referrer
// //                 };
// //                 request.clone().text().then(function(body) {
// //                     serialized.body = body;
// //                     callsToCache.push(serialized);
// //                     console.log(callsToCache);
// //                 });     
// //             }
// //             // Immediately respond if request exists in the cache and user is offline
// //             if (response && !navigator.onLine) {
// //                 return response;
// //             }
// //             // Resubmit offline signature requests
// //             if(navigator.onLine && callsToCache.length > 0) {
// //                 callsToCache.forEach(function(signatureRequest) {
// //                     fetch(signatureRequest.url, {
// //                         method: signatureRequest.method,
// //                         body: signatureRequest.body
// //                     })
// //                 });
// //                 callsToCache = [];
// //             }


// //             // IMPORTANT: Clone the request. A request is a stream and
// //             // can only be consumed once. Since we are consuming this
// //             // once by cache and once by the browser for fetch, we need
// //             // to clone the response
// //             var fetchRequest = event.request.clone();

// //             // Make the external resource request
// //             return fetch(fetchRequest).then(
// //                 function(response) {
// //                 // If we do not have a valid response, immediately return the error response
// //                 // so that we do not put the bad response into cache
// //                 if (!response || response.status !== 200 || response.type !== 'basic') {
// //                     return response;
// //                 }

// //                 // IMPORTANT: Clone the response. A response is a stream
// //                 // and because we want the browser to consume the response
// //                 // as well as the cache consuming the response, we need
// //                 // to clone it so we have 2 stream.
// //                 var responseToCache = response.clone();

// //                 // Place the request response within the cache
// //                 caches.open(CACHE_NAME)
// //                 .then(function(cache) {
// //                     if(event.request.method !== "POST")
// //                     {
// //                         cache.put(event.request, responseToCache);
// //                     }
// //                 });

// //                 return response;
// //             }
// //             );
// //         })
// //     );
// // });




// // console.log('Started', self);
// // self.addEventListener('install', function(event) {
// //   self.skipWaiting();
// //   console.log('Installed', event);
// // });
// // self.addEventListener('activate', function(event) {
// //   console.log('Activated', event);
// // });
// // self.addEventListener('push', function(event) {
// //   console.log('Push message', event);
// //   var title = 'Le push de test :)';
// //   event.waitUntil(
// //     self.registration.showNotification(title, {
// //      body: 'Bravo tu l\'as reçu',
// //      icon: 'images/icon.png',
// //      tag: 'my-tag'
// //    }));
// // });





// Incrementing CACHE_VERSION will kick off the install event and force previously cached
// resources to be cached again.
const CACHE_VERSION = 1;
let CURRENT_CACHES = {
  offline: 'offline-v' + CACHE_VERSION
};
// const OFFLINE_URL = 'offline.html';

function createCacheBustedRequest(url) {
  let request = new Request(url, {cache: 'reload'});
  // See https://fetch.spec.whatwg.org/#concept-request-mode
  // This is not yet supported in Chrome as of M48, so we need to explicitly check to see
  // if the cache: 'reload' option had any effect.
  if ('cache' in request) {
    return request;
  }

  // If {cache: 'reload'} didn't have any effect, append a cache-busting URL parameter instead.
  let bustedUrl = new URL(url, self.location.href);
  bustedUrl.search += (bustedUrl.search ? '&' : '') + 'cachebust=' + Date.now();
  return new Request(bustedUrl);
}

self.addEventListener('install', event => {
  event.waitUntil(
    // We can't use cache.add() here, since we want OFFLINE_URL to be the cache key, but
    // the actual URL we end up requesting might include a cache-busting parameter.
    fetch(createCacheBustedRequest(OFFLINE_URL)).then(function(response) {
      return caches.open(CURRENT_CACHES.offline).then(function(cache) {
        return cache.put(OFFLINE_URL, response);
      });
    })
  );
});

self.addEventListener('activate', event => {
  // Delete all caches that aren't named in CURRENT_CACHES.
  // While there is only one cache in this example, the same logic will handle the case where
  // there are multiple versioned caches.
  let expectedCacheNames = Object.keys(CURRENT_CACHES).map(function(key) {
    return CURRENT_CACHES[key];
  });

  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (expectedCacheNames.indexOf(cacheName) === -1) {
            // If this cache name isn't present in the array of "expected" cache names,
            // then delete it.
            console.log('Deleting out of date cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', event => {
  // We only want to call event.respondWith() if this is a navigation request
  // for an HTML page.
  // request.mode of 'navigate' is unfortunately not supported in Chrome
  // versions older than 49, so we need to include a less precise fallback,
  // which checks for a GET request with an Accept: text/html header.
  if (event.request.mode === 'navigate' ||
      (event.request.method === 'GET' &&
       event.request.headers.get('accept').includes('text/html'))) {
    console.log('Handling fetch event for', event.request.url);
    event.respondWith(
      fetch(event.request).catch(error => {
        // The catch is only triggered if fetch() throws an exception, which will most likely
        // happen due to the server being unreachable.
        // If fetch() returns a valid HTTP response with an response code in the 4xx or 5xx
        // range, the catch() will NOT be called. If you need custom handling for 4xx or 5xx
        // errors, see https://github.com/GoogleChrome/samples/tree/gh-pages/service-worker/fallback-response
        console.log('Fetch failed; returning offline page instead.', error);
        return caches.match(OFFLINE_URL);
      })
    );
  }

  // If our if() condition is false, then this fetch handler won't intercept the request.
  // If there are any other fetch handlers registered, they will get a chance to call
  // event.respondWith(). If no fetch handlers call event.respondWith(), the request will be
  // handled by the browser as if there were no service worker involvement.
});