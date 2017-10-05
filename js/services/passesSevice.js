'use strict';
var app = angular.module('happy');
   app.service('passService', ['$http', function($http) {
        var data = "";
        this.getAllPasses = function(callback) {
            if(data){
                callback(data);
            }else{
                $http.get("https://www.receptio.in/TicketUp/passes?page=0&count=10").then(function(response){
                    data = response.data.data.passes;
                    // console.log(data);
                    callback(data);
                });
            }
        }
        
    }]);