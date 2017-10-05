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
                      alert("Username registered with us, Please login.");

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