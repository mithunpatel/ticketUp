'use strict';
var app=angular.module('happy', ['ui.router','angular.filter','ngStorage']);
/*app.run(['$rootScope', '$location', 'Auth', function ($rootScope, $location, Auth) {
  var publicStates = ["home","pass"];
    $rootScope.$on('$locationChangeStart', function (event, newUrl, oldUrl) {
        if (!Auth.isLoggedIn()) {
            console.log('DENY');
            event.preventDefault();
            $location.path('/signin');
        }

    });
}]);*/
app.run(['$rootScope', '$location', '$state', 'Auth',function($rootScope, $location, $state, Auth) {
    var publicStates = ["signin","signup"];
    var secrteState =["profile"];
    $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
      // console.log(toState);
    if (toState.authenticate && !Auth.isLoggedIn() ){
      // User isn’t authenticated
      console.log("not isLoggedIn");
      $state.go("signin");
      event.preventDefault(); 
    };
    if (Auth.isLoggedIn() && publicStates.includes(toState.name)) {
       $state.go(toState.name);
       console.log("isLoggedIn");
      event.preventDefault(); 
    }
  });
}]);
app.config(function($stateProvider, $urlRouterProvider,$locationProvider) {
    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode({
  enabled: true,
  requireBase: false
});
    $stateProvider

        // HOME STATES AND NESTED VIEWS 
        .state('home', {
            url: '/',
            templateUrl: "/js/views/home.html",
                controller: "happyhourCtrl",
                authenticate: false
            })
            .state("signin", {
              url: '/signin',
                templateUrl: "/js/views/signin.html",
                controller: "signInController",
                authenticate: false
            })
            .state("signup", {
              url: '/signup',
                templateUrl: "/js/views/signup.html",
                controller: "signUpController",
                authenticate: false
            })
            .state("pass", {
              url: '/pass',
                templateUrl: "/js/views/pass.html",
                controller: "passController",
                authenticate: false
            })
            .state("brewpass", {
              url: '/brewpass/:id',
                templateUrl: "/js/views/brewpass.html",
                controller: "brewPassController",
                authenticate: false
            })
            .state("privacypolicy", {
              url: '/privacypolicy',
                templateUrl: "./staticpages/privacypolicy.html"
                // controller: "brewPassController"
            })
            .state("termscondition", {
              url: '/termscondition',
                templateUrl: "./staticpages/termCondition.html"
                // controller: "brewPassController"
            })
            .state("thankyou", {
              url: '/thankyou',
                templateUrl: "./staticpages/thankyou.html",
                // controller: "thankyouController",
                authenticate: false
            })
            .state("logout", {
              url: '/logout',
                templateUrl: "./staticpages/logout.html",
                controller: "logoutController",
                authenticate: true
            })
            .state("profile", {
              url: '/profile',
                templateUrl: "./js/views/profile.html",
                authenticate: true,
                controller: "profileController"
            })
            .state("checkout", {
              url: '/checkout',
                templateUrl: "./js/views/checkout.html",
                authenticate: true,
                controller: "checkoutController"
            })
            .state("notification", {
              url: '/notification',
                templateUrl: "./js/views/notification.html"
                // controller: "brewPassController"
            })
            .state("merchant", {
              url: '/merchant/:id',
                templateUrl: "/js/views/merchant.html",
                controller: "merchantCtrl",
                authenticate: false
            });
            
});

 app.directive('passFaq', function() {
  return {
    templateUrl: '/js/views/passFaq.html'
  };
});

  app.directive('popupForm', function() {
  return {
    templateUrl: '/js/views/popupForm.html'
  };
});


  app.directive('ourStory', function() {
  return {
    templateUrl: '/js/views/ourStory.html'
  }
});

// const publicKey='BCETN9G4DMt-s2MMCwuqMvIyH_RP6THHMN2S8AHYmDSIOFPkdIA5z4RcCDkJEGgsENZIv2wvvgFDRO0jta7hldQ';

   navigator.serviceWorker && navigator.serviceWorker.register('/sw.js').then(function(registration) {
  console.log('Excellent, registered with scope: ', registration.scope);
});

// navigator.serviceWorker && navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {  
//   serviceWorkerRegistration.pushManager.getSubscription()  
//     .then(function(subscription) {  
//       // subscription will be null or a PushSubscription
//       if (subscription) {
//         console.info('Got existing', subscription);
//         window.subscription = subscription;
//         return;  // got one, yay
//       }

//       const applicationServerKey = urlB64ToUint8Array(publicKey);
//       serviceWorkerRegistration.pushManager.subscribe({
//           userVisibleOnly: true,
//           applicationServerKey,
//       })
//         .then(function(subscription) { 
//           console.info('Newly subscribed to push!', subscription);
//           window.subscription = subscription;
//         });

//     });
// });


// var config = {
//     apiKey: "AIzaSyC7KQ-8sMaSrV9ZB_b3JeUtS-w4r6Nt0e4",
//     authDomain: "ticketup-abf91.firebaseapp.com",
//     databaseURL: "https://ticketup-abf91.firebaseio.com",
//     projectId: "ticketup-abf91",
//     storageBucket: "ticketup-abf91.appspot.com",
//     messagingSenderId: "703017651375"
//   };

// firebase.initializeApp(config);

// if('serviceWorker' in navigator) {
//   navigator.serviceWorker.register('/sw.js', { scope: '/' }).then(function() {
//       return navigator.serviceWorker.ready;
//     }).then(function(registration) {
//       registration.pushManager.subscribe({userVisibleOnly: true}).then(function(sub) {
//         var endpointSections = sub.endpoint.split('/');
//         var subscriptionId = endpointSections[endpointSections.length - 1];
//         var newKey = firebase.database().ref().child('token').push().key;
//         firebase.database().ref('token/' + newKey).set({subscriptionId: subscriptionId});
//         console.log('endpoint:', subscriptionId);
//       });
//     });
//   navigator.serviceWorker.ready.then(function(registration) {
//      console.log('Service Worker Ready');
//   });
// }