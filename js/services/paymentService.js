'use strict';
var app = angular.module('happy');
   app.factory('passPayment', ['$http', function($http) {
        var pay;

return{
    checkout : function(aUser){
        pay = aUser;
        console.log(pay);
    },
    check : function () {
        // body...
        return(pay);
    }
  }
        
    }]);

