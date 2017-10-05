'use strict';
var app = angular.module('happy');
app.controller('passController', ['$scope','passService', function($scope,passService) {
        passService.getAllPasses(function(response) {
            $scope.passes = response;
            // console.log($scope.passes);
            
        });
}]);