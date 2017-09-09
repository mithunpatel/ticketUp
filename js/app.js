

 var app=angular.module('happy', ['ui.router','angular.filter','updateMeta']);

 	// 	app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

  //       $routeProvider
  //       .when("/", {
  //               templateUrl: "/js/views/home.html",
  //               controller: "happyhour"
  //           })
  //           .when("/pubs/:name", {
  //               templateUrl: "/js/views/pubdetail.html",
  //               controller: "RepoDetailController"
  //           })
  //           .when("/signin", {
  //               templateUrl: "/js/views/signin.html",
  //               controller: "signInController"
  //           })
  //           .when("/signup", {
  //               templateUrl: "/js/views/signup.html",
  //               controller: "signUpController"
  //           })
  //           .when("/pass", {
  //               templateUrl: "/js/views/pass.html",
  //               controller: "passController"
  //           })
            
  //           .otherwise("/");

  // //       $locationProvider.html5Mode({
		// //   enabled: true,
		// //   requireBase: false
		// // });
  //   }])

app.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider

        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/',
            templateUrl: "/js/views/home.html",
                controller: "happyhour"
        })

        .state("pubs", {
          url: '/pubs/:name',
                templateUrl: "/js/views/pubdetail.html",
                controller: "RepoDetailController"
            })
            .state("signin", {
              url: '/signin',
                templateUrl: "/js/views/signin.html",
                controller: "signInController"
            })
            .state("signup", {
              url: '/signup',
                templateUrl: "/js/views/signup.html",
                controller: "signUpController"
            })
            .state("pass", {
              url: '/pass',
                templateUrl: "/js/views/pass.html",
                controller: "passController"
            })
            .state("brewpass", {
              url: '/brewpass',
                templateUrl: "/js/views/brewpass.html",
                controller: "brewPassController"
            });


});

  app.directive('popup', function() {
  return {
    templateUrl: '/js/views/popupForm.html'
  };
});

    app.controller('happyhour', ['$scope', 'SheetFacotry', function($scope, SheetFacotry) {
        SheetFacotry.getAllRepo(function(response) {
            $scope.pubs = response.data.happyHour;
            // console.log($scope.pubs);
        });
    }]);

    app.controller('RepoDetailController', ['$scope','$stateParams','SheetFacotry','$location',function($scope,$stateParams,SheetFacotry,$location) {
       //$scope.y= x;
       //console.log($scope.y);
       // debugger;
       SheetFacotry.getAllRepo(function(response) {

            var pubs = response.data.happyHour;
            console.log($stateParams.name);
            for(var i=0;i<pubs.length;i++){
              if(pubs[i].Pub_Name==$stateParams.name){
                $scope.y = pubs[i];
                // console.log($scope.y);
                break;
              }
            };
            $scope.currenturl=$location.absUrl();
            
             // $('head').append(' <meta property="og:url" content="" /><meta property="og:type" content="website" /><meta property="og:title" content="Your Website Title" /><meta property="og:description"   content="Your description" /><meta property="og:image" content="'$scope.y.Image'" />');
        });
       // console.log($routeParams);
    }]);

    app.controller('signInController', ['$scope', function($scope) {
        $scope.signin=function () {
          console.log($scope.username);
          console.log($scope.userpassword);
          $scope.username='';
          $scope.userpassword='';
        }

    }]);

    app.controller('signUpController', ['$scope', function($scope) {
        $scope.signup=function () {
          console.log($scope.username);
          if ($scope.userpassword==$scope.cnfUserpassword) { 
                console.log($scope.userpassword);
                console.log($scope.userEmail);
                console.log($scope.check);
            }
          
          
          $scope.username='';
          $scope.userEmail='';
        }
    }]);

    app.controller('passController', ['$scope', function($scope) {
        
    }]);
    app.controller('brewPassController', ['$scope', function($scope) {
        
    }]);

    // app.controller('rootCtrl', ['$scope', function($scope) {
    //     $scope.happyUrl = '/images/Happy_hour_selected.svg';
    //     $scope.passUrl = '/images/Gift_card_selected.svg';
    //     $scope.happyClick = function () {
    //       $scope.happyUrl = '/images/Happy_hour_selected.svg';
    //       $scope.passUrl = '/images/Gift_card_selected.svg';
    //     };
    //     $scope.passClick = function () {
    //         $scope.happyUrl = '/images/Happy_hour_unselected.svg';
    //         $scope.passUrl = '/images/Gift_card_unselected.svg';
    //     }
    // }])

   
   // app.controller('happyhour',function($scope, $http) {
   //     $http.get('https://script.google.com/macros/s/AKfycbygukdW3tt8sCPcFDlkMnMuNu9bH5fpt7bKV50p2bM/exec?id=1_GTIZgDTLY5_MXwSiszk0iAnhkS4ektSvRQKszHW8YI&sheet=happyHour')
   //     .then(function(res){
   //        $scope.pubs = res.data.happyHour; 
   //        // console.log($scope.pubs);
   //      });
        
   // })
// const publicKey='BCETN9G4DMt-s2MMCwuqMvIyH_RP6THHMN2S8AHYmDSIOFPkdIA5z4RcCDkJEGgsENZIv2wvvgFDRO0jta7hldQ';

//    navigator.serviceWorker && navigator.serviceWorker.register('./sw.js').then(function(registration) {
//   // console.log('Excellent, registered with scope: ', registration.scope);
// });

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