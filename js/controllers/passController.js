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