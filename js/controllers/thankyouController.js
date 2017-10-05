'use strict';
var app = angular.module('happy');
app.controller('logoutController',['$location', '$scope', '$window','Auth',function($location, $scope, $window,Auth){
    
    window.localStorage.removeItem('ngStorage-tktup_user');
    Auth.setUser();
    // $location.go("/signin");
}]);