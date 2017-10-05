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