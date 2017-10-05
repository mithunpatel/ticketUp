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
				$scope.userPasses[i].selectQty = 1; 
			}
		}

		$scope.addRemoveValue = function (e,obj) {
			// body...
			
			for (var i = 0; i < $scope.userPasses.length; i++) {
				if ( ($scope.userPasses[i] == obj)  && ($scope.userPasses[i].selectQty < $scope.userPasses[i].available)) {
					// if ( $scope.userPasses[i].selectQty > 0 ) {
						// console.log($scope.userPasses[i].selectQty)
						if ($scope.userPasses[i].selectQty > 0) {
							$scope.userPasses[i].selectQty += e;
						} else {
							$scope.userPasses[i].selectQty = 1;
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
					$scope.redemmedPass = $scope.userPasses[i].description;
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