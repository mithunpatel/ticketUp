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
  console.log(res);
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
