'use strict';
var app = angular.module('happy');

app.service('SheetFacotry', ['$http', function($http) {
        var data = "";
        this.getAllRepo = function(callback) {
        	if(data){
        		callback(data);
        	}else{
        		$http.get("https://script.google.com/macros/s/AKfycbygukdW3tt8sCPcFDlkMnMuNu9bH5fpt7bKV50p2bM/exec?id=1_GTIZgDTLY5_MXwSiszk0iAnhkS4ektSvRQKszHW8YI&sheet=happyHour").then(function(response){
        			data = response;
        			callback(data);
        		});
        	}
        }
        
    }]);