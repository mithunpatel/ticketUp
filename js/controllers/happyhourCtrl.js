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