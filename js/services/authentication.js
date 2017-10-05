'use strict';
var app = angular.module('happy');

app.factory('Auth', ['$rootScope','$localStorage',function($rootScope,$localStorage){
var user;
// console.log($localStorage.tktup_user);
if ($localStorage.tktup_user) {
    // console.log("rootscope user");
    user=$localStorage.tktup_user.user;
    // console.log(user);
    // $rootscope.user_info=user;
}

return{
    setUser : function(aUser){
        user = aUser;
        // console.log(user);
    },
    isLoggedIn : function(){
        // console.log(user);
        return(user? user : false);
    }
  }
}]);