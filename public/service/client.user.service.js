'use strict'

angular.module('phytotronGreenhouseManagementApp')
    .factory('UserService',['$http',function($http){
        return {

            loginUser: function(user){
                return $http.post('/login',user);
            },

            logoutUser: function(user){
                return $http.post('/logout',user);
            },

            getLoginStatus: function(){
                return $http.get('/getLoginStatus');
            }
        };
    }]);