'use strict';

angular.module('phytotronGreenhouseManagementApp')
    .factory('GreenhouseService', ['$http', function($http){
        return {

            // Get all Greenhouses
            getGreenhouseList: function(){
                return $http.get('/greenhouses');
            },

            //Get Greenhouse by id
            getGreenhouseById: function(greenhouseId){
                return $http.get('/greenhouse/'+greenhouseId);
            },

            //create a Greenhouse
            createGreenhouse: function(greenhouse){
                return $http.post('/greenhouse/create',greenhouse);
            },

            //update a Greenhouse
            updateGreenhouse: function(greenhouse){
                return $http.post('/greenhouse/update',greenhouse);
            },
            
            //get Greenhouse Lights Schedule By Id
            getGreenhouseLightsScheduleById: function (greenhouseId) {
                return $http.get('/greenhouseLightsSchedule/'+greenhouseId);
            },

            //update a Greenhouse Lights Schedule By Id
            updateGreenhouseLightsScheduleById: function(greenhouseLightsScheduleReqObject){
                return $http.post('/greenhouseLightsSchedule/updateById',greenhouseLightsScheduleReqObject);
            }

        };

    }]);