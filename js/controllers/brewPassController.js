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

app.controller('brewPassController', ['$scope','$location','passService','$localStorage','$window','passPayment',
 function($scope,$location,passService,$localStorage,$window,passPayment) {
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


        $scope.checkout = function (arg) {
          // body...
          passPayment.checkout(arg);
          $location.path("checkout");
          
        };
        
        // console.log($scope.currenturl)
}]);