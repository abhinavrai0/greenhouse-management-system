'use strict';
angular.module('phytotronGreenhouseManagementApp')
    .component('greenhouseUpdatePage',{
        templateUrl: 'greenhouse-update-page/client.greenhouse-update-page.template.html',
        controller: function GreenhouseUpdatePageController($routeParams,GreenhouseService,Flash){
            let ctrl = this;

            ctrl.$onInit = function(){
                ctrl.getGreenhouseById($routeParams.id)
            };

            // get greenhouse details by Id
            ctrl.getGreenhouseById = function(greenhouseId){
                GreenhouseService.getGreenhouseById(greenhouseId)
                    .then(function success(res){
                        ctrl.greenhouse = res.data;
                    }, function failure(res){
                        Flash.create('danger',res.data);
                    });
            };

            // update the set greenhouse details
            ctrl.updateGreenhouse = function(){
                GreenhouseService.updateGreenhouse(ctrl.greenhouse)
                    .then(function success(res){
                        Flash.create('success',res.data);
                    }, function failure(res){
                        Flash.create('danger',res.data);
                    })
            };
        }
    });