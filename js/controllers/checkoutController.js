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
          form.append("id", objPay.id);
          form.append("pid", objPay.pid);
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
            if (res.success == true) {
              // console.log(res.data.url);
              $window.location.href = res.data.url ;

            } else {

              // angular.element( document.querySelector( '#forgot_warning' ) ).removeClass('ng-hide');
              // document.getElementById("pass").style.display = 'none';
              console.log("something wrong in checkout with payid");
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
            console.log("something wrong in checkout without payid redirect to pass");
            $location.path("pass");
          } ,5000)
        }

    }

init();
}]);