'use strict';
var app=angular.module('happy', ['ui.router','angular.filter','ngStorage','ngCookies']);
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
            .state("notes", {
              url: '/notes',
                templateUrl: "./js/views/notes.html"
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
            })
            .state("applyCoupon", {
              url: '/applyCoupon',
                templateUrl: "/js/views/applyCoupon.html",
                controller: "applyCouponController",
                authenticate: true
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



	// Add business form data submission
		function submitAddbusinessdata(){
		 var bname=document.getElementById( "business_Name" ).value;
		 var email=document.getElementById( "businessUser_email" ).value;
		 var mobile=document.getElementById( "businessUser_mobile" ).value;
		 var name=document.getElementById( "businessUser_name" ).value;
		 var submitData={
		 	value:1,
		   businessname:bname,
		   email:email,
		   mobile:mobile,
		   name:name
		  };
		  // console.log(submitData);
		 $.post({
		  type: 'post',
		  crossDomain: true,
		  url: 'https://www.receptio.in/ticketup',
		  // contentType: "application/json; charset=utf-8",
		  data:submitData,
		  success: function (response) {

		   $('#postAddSubmit').html("Thank You! We will contact you shortly.");
		   // document.getElementById('addBusinessform').reset();
		   document.getElementById("addBusinessform").style.display = 'none';
		   // console.log(response);
		   // console.log(JSON.stringify(submitData));
		  }
		 }); 
		};
// Get business name after clicking claim business button and autofill businessName fild
		function display(argument) {
			// body...
			// debugger;
			var c=argument.parentNode.id;
			// console.log(c);
			document.getElementById("businessName").value=c;
		};
// Claim business form data submission
		function submitbusinessdata(){
		 var bname=document.getElementById( "businessName" ).value;
		 var email=document.getElementById( "businessUseremail" ).value;
		 var mobile=document.getElementById( "businessUsermobile" ).value;
		 var name=document.getElementById( "businessUsername" ).value;
		 var submitData={
		 	value:2,
		   businessname:bname,
		   email:email,
		   mobile:mobile,
		   name:name
		  };
		  // console.log(submitData);
		 $.post({
		  type: 'post',
		  crossDomain: true,
		  // contentType: "application/json; charset=utf-8",
		  // headers: {
    //         'Access-Control-Allow-Origin': '*',
    //         'Access-Control-Allow-Methods': 'DELETE, HEAD, GET, OPTIONS, POST, PUT',
    //         'Content-Type': 'application/json;charset=UTF-8',
    //         'access-control-allow-credentials' :true
			
    //     },
		  url: 'https://www.receptio.in/ticketup',
		  data:submitData,
		  success: function (response) {

		   $('#postClaimSubmit').html("Thank You! We will contact you shortly.");
		   // document.getElementById('clainBusinessform').reset();
		   document.getElementById("clainBusinessform").style.display = 'none';
		   // console.log(response);
		   // console.log(JSON.stringify(submitData));
		  }
		 }); 
		}
	
    

function closePop() {
      // body...
      // console.log("shit again")
      // document.getElementById('#fadeformodal').css({opacity:none});
          angular.element('#ourstoryModal').removeClass('in');
          angular.element('#ourstoryModal').modal('hide');
    }
    function openNav() {
        document.getElementById("mySidenav").style.width = "260px";
        // document.getElementById("header").style.opacity = "0";
        // document.getElementById("main").style.marginLeft = "200px";
        document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
    }

    function closeNav() {
        document.getElementById("mySidenav").style.width = "0";
         // document.getElementById("header").style.opacity = "1";
         // document.getElementById("main").style.marginLeft = "0";
         document.body.style.backgroundColor = "#fff";
    }

    function goBack() {
    window.history.back();
}
'use strict';
var app = angular.module('happy');

app.controller('applyCouponController', ['$scope','$http','$location','passService','$localStorage','$window','passPayment','$cookieStore',
 function($scope,$http,$location,passService,$localStorage,$window,passPayment,$cookieStore) {
	$scope.user=$localStorage.tktup_user.user;
	// console.log($scope.user);
	// $scope.objFrom = passPayment.check();
	$scope.selectedPass = $cookieStore.get('selectedPass');
	console.log($scope.selectedPass);
	$scope.selectedPass.discount = 0;
	$scope.selectedPass.total = $scope.selectedPass.price;
    $scope.selectedPass.coupon = '';
	 $scope.promotion = function () {
          
			var url = 'https://www.receptio.in/TicketUp/discount?code='+$scope.promotionCode;
			$http.get(url).then(function(response) {
        		console.log(response);
        	if (response.data.success) {
        		$scope.err = null;
        		console.log(response.data.data.discount.value);
        		$scope.selectedPass.discount = ($scope.selectedPass.price / response.data.data.discount.value);
        		$scope.selectedPass.total = $scope.selectedPass.price - $scope.selectedPass.discount;
        		$scope.selectedPass.coupon = $scope.promotionCode;
        	} 
        	if (!response.data.errors.success) {
        		console.log(response.data.errors.discount);
        		$scope.err = response.data.errors.discount;
        	}
    });
        };
        $scope.checkout = function (arg) {
        	// body...
        	$scope.checkoutObj = arg;
        	$scope.checkoutObj.mobile = $scope.user.mobile;
        	passPayment.checkout($scope.checkoutObj);
            $location.path("checkout");
        	console.log($scope.checkoutObj);
        }
        
	
}])
'use strict';
var app = angular.module('happy');
// app.controller('brewPassController', ['$scope','passFacotry', function($scope,passFacotry) {
//         passFacotry.getAllPasses(function(response) {

//             var passes = response.data;
//             // console.log(passes);
//             $scope.ticket = passes.pass[0];
//             $scope.radioclick = function (arg) {
//               // console.log(arg);
//               if (arg==2) {
//                  $scope.ticket = passes.pass[1];
//                  // console.log($scope.ticket);
//               }
//               else if(arg==3) {
//                 $scope.ticket = passes.pass[2];
//                 // console.log($scope.ticket);
//               }
//               else {
//                 $scope.ticket = passes.pass[0];
//                 // console.log($scope.ticket);
//               }
//             };


//             // $scope.currenturl=$location.absUrl();
            
//         });
//     }]);

app.controller('brewPassController', ['$scope','$location','passService','$localStorage','$window','passPayment','$cookieStore',
 function($scope,$location,passService,$localStorage,$window,passPayment,$cookieStore) {
        $scope.currentObjId=$location.path().replace("/brewpass/","");
        
        passService.getAllPasses(function(response) {
          $scope.image = response.image;
          // console.log(response)
            $scope.passes = response;
            // console.log($scope.passes);
            for (var i = 0; i < $scope.passes.length; i++) {
                    if ($scope.passes[i].id == $scope.currentObjId) {
                      // console.log($scope.passes[i]);
                          $scope.brewPass = $scope.passes[i];
                          $scope.brewPassPkg = $scope.passes[i].packages;

                          // angular.element( document.querySelector('#radio31') ).attr('checked');
                      // console.log($scope.brewPass)
                        // console.log($scope.brewPass)
                       switch ($scope.brewPass.header) {
                              case 'The Craft Brew Pass':
                                  $scope.offerImg = 'Craft Brew.svg';
                                  break;
                              case 'Draught Pitcher Pass':
                                  $scope.offerImg = 'Draught Pitcher.svg';
                                  break;
                              case 'Shooting Stars Pass':
                                  $scope.offerImg = 'Shooting Stars.svg';
                                  break;
                              case 'Sultry Cocktail Pass':
                                  $scope.offerImg = 'Scotch.svg';
                                  break;
                              default:
                                    $scope.offerImg = '';
                          }
                    }
            };
            $scope.ticket = $scope.brewPassPkg[0];
            // console.log($scope.ticket)

            $scope.radioclick = function (arg) {
                          // console.log(arg);
                          // if (arg==2) {
                          //    $scope.ticket = $scope.brewPassPkg[1];
                          //    console.log($scope.ticket);
                          // }
                          // else if(arg==3) {
                          //   $scope.ticket = $scope.brewPassPkg[2];
                          //   console.log($scope.ticket);
                          // }
                          // else {
                          //   $scope.ticket = $scope.brewPassPkg[0];
                          //   console.log($scope.ticket);
                          // }
                          for (var i = 0; i < $scope.brewPassPkg.length; i++) {
                            if ($scope.brewPassPkg[i].id == arg) {
                                $scope.ticket = $scope.brewPassPkg[i];
                                // console.log($scope.ticket)

                            }
                            
                          }
                        }
            $scope.terms = $scope.brewPass.terms.split(',');
        });

        $scope.checkout = function (arg,passName) {
          // body...
          var forCookieObj = arg;
          forCookieObj.passName = passName;
          // $location.path("checkout");
          $cookieStore.put('selectedPass',forCookieObj);
          $location.path("applyCoupon");
          
        };
        
        // console.log($scope.currenturl)
}]);
'use strict';
var app = angular.module('happy');
app.controller('checkoutController',['$location', '$scope', '$window','Auth','passPayment','$localStorage','$timeout',
	function($location, $scope, $window,Auth,passPayment,$localStorage,$timeout){
    
    var objPay = passPayment.check();
    // console.log(passPayment.check())
    // window.localStorage.removeItem('ngStorage-tktup_user');
    // Auth.setUser();
    // $location.go("/signin");
    var init = function () {
    	// body...
      if (objPay) {
    	// console.log(objPay.id,objPay.pid);
          var form = new FormData();
          // form.append("id", objPay.id);
          // form.append("pid", objPay.pid);
          form.append("mobile", objPay.mobile);
          // data.append("sid", "12");
          form.append("id", objPay.id);
          form.append("pid", objPay.pid);
          form.append("discount", objPay.coupon);
         var user_token = $localStorage.tktup_user.token;
          // console.log(user_token);
          var settings = {
            
            "crossDomain": true,
            "url": "https://www.receptio.in/ticketup/initiatePayment",
            "method": "POST",
            "headers": {
              "token": user_token,
              "cache-control": "no-cache"
            },
            "processData": false,
            "contentType": false,
            "mimeType": "multipart/form-data",
            "data": form
          }

          $.ajax(settings).done(function (response) {
            var res = JSON.parse(response);
            console.log(res);
            if (res.success == true) {
              console.log(res.data.url);
              $window.location.href = res.data.url ;

            } else {

              // angular.element( document.querySelector( '#forgot_warning' ) ).removeClass('ng-hide');
              // document.getElementById("pass").style.display = 'none';
              // console.log("something wrong");
              $scope.err = 'Something Went Wrong :( Payment Server Not Responding.';
              $timeout(function () {
            // body...
            $location.path("pass");
          } ,5000)

              // $location.path("/signin");
              // $scope.username = $scope.userpassword ="";
            }
          });
        }
        else{
          // console.log("something went wrong... you clicked refresh or back button.")
          $scope.err = 'Something Went Wrong :( You Clicked Refresh or Back Button.';
          $timeout(function () {
            // body...
            $location.path("pass");
          } ,5000)
        }

    }

init();
}]);
'use strict';
var app = angular.module('happy');

app.controller('happyhourCtrl', ['$rootScope','$scope','$localStorage', 'SheetFacotry', function($rootScope,$scope,$localStorage, SheetFacotry) {
        SheetFacotry.getAllRepo(function(response) {
            $scope.pubs = response.data.happyHour;
            // console.log($scope.pubs);
            
        });
        
        angular.element('#ourstoryModal').modal('show');
        // angular.element('#fadeformodal').css({opacity:0.3});
        


    }]);
'use strict';
var app = angular.module('happy');
app.directive('merchantThank', function() {
  return {
    templateUrl: '/js/views/thankyouMerchant.html'
  };
});

app.controller('merchantCtrl', ['$scope','$http','$location', function($scope,$http,$location){
	var sid = $location.path().replace("/merchant/","")
	$scope.mobileSubmit = function () {
		// body...
		// console.log($scope.mobile);

		var form = new FormData();
		form.append("mobile", $scope.mobile);
		form.append("sid", sid);
		// console.log($scope.mobile);
		var settings = {
		  "async": false,
		  "crossDomain": true,
		  "url": "https://www.receptio.in/TicketUp/storeUserEnquiry",
		  "method": "POST",
		  
		  "processData": false,
		  "contentType": false,
		  "mimeType": "multipart/form-data",
		  "data": form
		}
		// console.log(sid);
		$.ajax(settings).done(function (response) {
			// console.log(response);
			var res =JSON.parse(response);
		  if (res.success == true) {
		  	$scope.userPasses = res.data.passes;
		  	// console.log($scope.userPasses);
		  	// console.log(res);
		  	// $scope.quantity = $scope.userPasses;
		  	setQty();
		  	$scope.err=null;
		  } else {
		  	// console.log(response);
		  	$scope.err = JSON.parse(response);
		  }
		});
			}

		function setQty() {
			// body...
			for (var i = 0; i < $scope.userPasses.length; i++) {
				$scope.userPasses[i].selectQty = 0; 
			}
		}

		$scope.addRemoveValue = function (e,obj) {
			
			for (var i = 0; i < $scope.userPasses.length; i++) {
				if ( $scope.userPasses[i] == obj) {
					// if ( $scope.userPasses[i].selectQty > 0 ) {
						// console.log($scope.userPasses[i].selectQty)
						// if ($scope.userPasses[i].selectQty < $scope.userPasses[i].available) {
							
						// 	if ($scope.userPasses[i].selectQty > 0) {
						// 		console.log("working");
						// 		$scope.userPasses[i].selectQty += e;
						// 	}
							
						// } else {
						// 	$scope.userPasses[i].selectQty = 1;
						// }
						if (e === 1 && ($scope.userPasses[i].selectQty < $scope.userPasses[i].available)) {
							if ($scope.userPasses[i].selectQty <= $scope.userPasses[i].available) {
								$scope.userPasses[i].selectQty += e;
							}
						}
						else if (e === -1 && ($scope.userPasses[i].selectQty > 0)) {
							$scope.userPasses[i].selectQty += e;
						}
					// }
					}
			}
			// if ( ($scope.quantity > 0 || e != -1 )&& $scope.quantity <= obj.available) {
			// 	for (var i = 0; i < $scope.userPasses.length; i++) {
			// 	// if ($scope.quantity<$scope.userPasses[i].available) {
			// 		if ($scope.userPasses[i] == obj) {
			// 		var qty = "#qty"+$scope.userPasses[i].type+$scope.userPasses[i].rid;
					
			// 		// console.log(qty);
			// 		angular.element( document.querySelector( qty ) ).addClass('ng-hide');
					
			// 		console.log($scope.userPasses[i]);
			// 		$scope.quantity = $scope.quantity+e;
			// 	}
			// 	// }
				
			// }
				
			// }
			
		}
		// $scope.redemmed = false;
		$scope.otpSubmit = function (obj) {
			// body...
			
			$scope.otpInput = obj;
			var form = new FormData();
			// var otp = document.getElementById( "otpInput" ).value;
			form.append("sid", sid);
			form.append("vid", $scope.redeem);
			form.append("otp", $scope.otpInput);
			// console.log($scope.redeem);
			// console.log($scope.otpInput);
			var settings = {
			  "async": false,
			  "crossDomain": true,
			  "url": "https://www.receptio.in/TicketUp/checkkOTP",
			  "method": "POST",
			  "processData": false,
			  "contentType": false,
			  "mimeType": "multipart/form-data",
			  "data": form
			}

			$.ajax(settings).done(function (res) {
				// console.log("form data for otp"+ JSON.stringify(form));
				var afterOtpData = JSON.parse(res);
				$scope.redemmedThankErr = '';
			  if (afterOtpData.success == true) {
			  	// angular.element( document.getElementById( 'modalshow' ) ).removeClass('ng-hide');
			  	
			  	angular.element('#thankyouModal').modal('show');
			  	// angular.element('#fademerchantpage').css({opacity:0.4});
			  	$scope.redemmedThank = afterOtpData;
			  	$scope.otpInput = '';
			  } else {
			  	$scope.redemmedThankErr = afterOtpData.errors.otp;
			  	console.log($scope.redemmedThankErr);
			  	$scope.otpInput = '';
			  }
			  // console.log(redemmedThank);
			 

			});

		}

		$scope.closeThank = function () {
			// body...
			$scope.mobileSubmit();
			// angular.element('#fademerchantpage').css({opacity:none});
			  	angular.element('#thankyouModal').modal('hide');
		}

		$scope.varify = function (arg) {
			// body...
			// console.log(arg);
			for (var i = 0; i < $scope.userPasses.length; i++) {
				if ($scope.userPasses[i] == arg) {
					$scope.unit = $scope.userPasses[i].selectQty;

					$scope.redemmedPass = $scope.userPasses[i].header;
					var form = new FormData();
					form.append("sid", sid);
					form.append("qty", $scope.userPasses[i].selectQty);
					form.append("rid", $scope.userPasses[i].rid);

					var settings = {
					  "async": false,
					  "crossDomain": true,
					  "url": "https://www.receptio.in/TicketUp/redeemPass",
					  "method": "POST",
					  "processData": false,
					  "contentType": false,
					  "mimeType": "multipart/form-data",
					  "data": form
					}

					$.ajax(settings).done(function (res) {
					  
					  var response = JSON.parse(res);
					  if (response.success == true) {
					  	$scope.redeem = response.data.vid;
					  } else {
					  	$scope.redeemErr = response.data.vid;
					  }
					  
					  console.log(response);
					});

					var varify = "#varify"+$scope.userPasses[i].type+$scope.userPasses[i].rid;
					var otp = "#otp"+$scope.userPasses[i].type+$scope.userPasses[i].rid;
					// console.log(varify);
					angular.element( document.querySelector( varify ) ).addClass('ng-hide');
					angular.element( document.querySelector( otp ) ).removeClass('ng-hide');
					// console.log($scope.userPasses[i]);

				}
				
			}

		}
}])
'use strict';
var app = angular.module('happy');
app.controller('passController', ['$scope','passService','$location', function($scope,passService,$location) {
        passService.getAllPasses(function(response) {
            $scope.passes = response;
            // console.log($scope.passes);
            
        })

        $scope.brewpass = function (obj) {
        	// body...
        	
        	var id = obj.id;
        	if (obj.coming_soon == 0) {
        		$location.path('brewpass/'+id)
        	}


        	
        }
}]);
'use strict';
var app = angular.module('happy');
app.controller('profileController',['$location','$localStorage', '$scope',function($location,$localStorage, $scope){
    $scope.user_profile=$localStorage.tktup_user.user;
    // $location.go("/signin");
    $scope.userPassDetail = function () {
		// body...
		// console.log($scope.mobile);
		var form = new FormData();
		form.append("mobile", $scope.user_profile.mobile);
		form.append("sid", '16');
		// console.log($scope.mobile);
		var settings = {
		  "async": false,
		  "crossDomain": true,
		  "url": "https://www.receptio.in/TicketUp/storeUserEnquiry",
		  "method": "POST",
		  
		  "processData": false,
		  "contentType": false,
		  "mimeType": "multipart/form-data",
		  "data": form
		}
		// console.log(sid);
		$.ajax(settings).done(function (response) {
			// console.log(response);
			var res =JSON.parse(response);
		  if (res.success == true) {
		  	// console.log(res);
		  	// $scope.passesAvail = res.data.passes;
		  	$scope.userDetail = res.data.passes;
		  	// console.log($scope.userPasses);
		  	// console.log(res);
		  	// $scope.quantity = $scope.userPasses;
		  	// setQty();
		  	$scope.err=null;
		  } else {
		  	// console.log(response);
		  	$scope.userDetailErr = JSON.parse(response);
		  }
		});
			};
			$scope.userPassDetail();
}]);
'use strict'

var app = angular.module('happy');
app.controller('signInController', [ '$scope','$rootScope','$location', 'Auth','$localStorage','$http', 
  function ($scope,$rootScope,$location, Auth, $localStorage,$http) {
  // $rootScope.$storage = $localStorage;
  //submit
  $scope.submitMobileNo = function () {
    var form = new FormData();
      form.append("username", $scope.mobile);

      var settings = {
        "async": false,
        "crossDomain": true,
        "url": "https://www.receptio.in//TicketUp/forgotpassword",
        "method": "POST",
        // "headers": {
        //   "cache-control": "no-cache",
        //   "postman-token": "eb95ad71-f2cf-58ed-90e2-cad025709899"
        // },
        "processData": false,
        "contentType": false,
        "mimeType": "multipart/form-data",
        "data": form
      }

      $.ajax(settings).done(function (res) {
        var response = JSON.parse(res);
        console.log(response);
        if (response.success == true) {
          // console.log("true");
          // $location.path("/signin");
          angular.element( document.querySelector( '#forgotPassword' ) ).addClass('ng-hide');
        } else {
          console.log(response.errors.account);
          $scope.errormobile = response.errors.account;
          angular.element( document.querySelector( '#forgot_warning' ) ).removeClass('ng-hide');
          // document.getElementById("pass").style.display = 'none';

          // $location.path("/signin");
          // $scope.username = $scope.userpassword ="";
        }
      });
  };
  $scope.signin = function () {
    console.log('clicked....')
    // Ask to the server, do your job and THEN set the user
    var form = new FormData();
    form.append("username", $scope.username);
    form.append("password", $scope.userpassword);

    var settings = {
      "async": false,
      "crossDomain": true,
      "url": "https://www.receptio.in/ticketup/userlogin",
      "method": "POST",
      "processData": false,
      "contentType": false,
      "mimeType": "multipart/form-data",
      "data": form
    }

$.post(settings).done(function (res) {
  // console.log(res);
  var response=JSON.parse(res);
  
       if (response.success==true) {
          // console.log("true");
          $localStorage.tktup_user=response.data;
          Auth.setUser($localStorage.tktup_user);
          $location.path("/pass");

        } else {

          angular.element( document.querySelector( '#signin_warning' ) ).removeClass('ng-hide');
          // document.getElementById("pass").style.display = 'none';

          // $location.path("/signin");
          // $scope.username = $scope.userpassword ="";
        }

});

    // Auth.setUser(user); //Update the state of the user in the app
  };
}])

'use strict';
var app = angular.module('happy');
app.controller('signUpController', ['$scope','$location','$localStorage', function($scope,$location,$localStorage) {
        $scope.$storage=$localStorage;
        $scope.signup=function () {
          // console.log($scope.username);
          
          if (($scope.userpassword !=undefined)&&($scope.userpassword==$scope.cnfUserpassword)) { 
                // console.log($scope.userpassword);
                // console.log($scope.userEmail);
                // console.log($scope.check);
                if (($('#check').is(":checked"))) {
                var form = new FormData();
                form.append("name", $scope.username);
                form.append("email", $scope.userEmail);
                form.append("mobile", $scope.usermobile);
                form.append("password", $scope.userpassword);

                var settings = {
                  "async": false,
                  "crossDomain": true,
                  "url": "https://www.receptio.in/ticketup/createUser",
                  "method": "POST",
                  "processData": false,
                  "contentType": false,
                  "mimeType": "multipart/form-data",
                  "data": form
                }

                $.ajax(settings).done(function (res) {
                  var response =JSON.parse(res);
                    if (response.success==true) {
                      // console.log("true");
                      $location.path("/signin");
                      alert("Congratulation..You are registered with us, Please login.");

                    } else {
                      $location.path("/signin");
                      alert("Username already registered, Please login.");
                      
                    }
                });
            }else{
              angular.element( document.querySelector( '#warningCheck' ) ).removeClass('ng-hide');
              
            }
            
          } else {
            angular.element( document.querySelector( '#warning' ) ).removeClass('ng-hide');
          }
          
          // $scope.username='';
          // $scope.userEmail='';
        }
        // if ($scope.$storage.user==undefined) {
        //             $location.path("/signup");
        //   } else {
        //     $location.path("/brewpass");
            
        //   } 
    }]);
'use strict';
var app = angular.module('happy');
app.controller('logoutController',['$location', '$scope', '$window','Auth',function($location, $scope, $window,Auth){
    
    window.localStorage.removeItem('ngStorage-tktup_user');
    Auth.setUser();
    // $location.go("/signin");
}]);
'use strict';
var app = angular.module('happy');

app.factory('Auth', ['$rootScope','$localStorage',function($rootScope,$localStorage){
var user;
// console.log($localStorage.tktup_user);
if ($localStorage.tktup_user) {
    // console.log("rootscope user");
    user=$localStorage.tktup_user.user;
    // console.log(user);
    // $rootscope.user_info=user;
}

return{
    setUser : function(aUser){
        user = aUser;
        // console.log(user);
    },
    isLoggedIn : function(){
        // console.log(user);
        return(user? user : false);
    }
  }
}]);

'use strict';
var app = angular.module('happy');
   app.service('passService', ['$http', function($http) {
        var data = "";
        this.getAllPasses = function(callback) {
            if(data){
                callback(data);
            }else{
                $http.get("https://www.receptio.in/TicketUp/passes?page=0&count=10").then(function(response){
                    data = response.data.data.passes;
                    // console.log(data);
                    callback(data);
                });
            }
        }
        
    }]);
'use strict';
var app = angular.module('happy');
   app.factory('passPayment', ['$http', function($http) {
        var pay;

return{
    checkout : function(aUser){
        pay = aUser;
        // console.log(pay);
    },
    check : function () {
        // body...
        return(pay);
    }
  }
        
    }]);


'use strict';
var app = angular.module('happy');

app.service('SheetFacotry', ['$http', function($http) {
        var data = "";
        this.getAllRepo = function(callback) {
        	if(data){
        		callback(data);
        	}else{
        		$http.get("https://script.google.com/macros/s/AKfycbygukdW3tt8sCPcFDlkMnMuNu9bH5fpt7bKV50p2bM/exec?id=1_GTIZgDTLY5_MXwSiszk0iAnhkS4ektSvRQKszHW8YI&sheet=happyHour").then(function(response){
        			data = response;
        			callback(data);
        		});
        	}
        }
        
    }]);