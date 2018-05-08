'use strict';
angular.module('phytotronGreenhouseManagementApp')
    .component('greenhouseManageLightsPage',{
        templateUrl: 'greenhouse-manage-lights-page/client.greenhouse-manage-lights-page.template.html',
        controller: function GreenhouseManageLightsPageController($routeParams,GreenhouseService,Flash){
            let ctrl = this;
            let greenhouseId;

            ctrl.$onInit = function(){
                greenhouseId = $routeParams.id;
                ctrl.getGreenhouseLightsScheduleById($routeParams.id)
            };

            // get greenhouse Lights Schedule details by Id
            ctrl.getGreenhouseLightsScheduleById = function(greenhouseId){
                GreenhouseService.getGreenhouseLightsScheduleById(greenhouseId)
                    .then(function success(res){
                        ctrl.greenhouseLightsSchedule = res.data;
                    }, function failure(res){
                        Flash.create('danger',res.data);
                    });
            };

            // update the set greenhouse Lights details
            ctrl.updateGreenhouseLightsSchedule = function(){
                let greenhouseLightsScheduleUpdateReqObject = {
                    greenhouse_id: greenhouseId,
                    greenhouseLightsSchedule: ctrl.greenhouseLightsSchedule
                };
                GreenhouseService.updateGreenhouseLightsScheduleById(greenhouseLightsScheduleUpdateReqObject)
                    .then(function success(res){
                        Flash.create('success',res.data);
                    }, function failure(res){
                        Flash.create('danger',res.data);
                    })
            };
        }
    });