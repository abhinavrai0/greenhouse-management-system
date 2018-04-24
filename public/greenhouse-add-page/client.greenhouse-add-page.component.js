'use strict';
angular.module('phytotronGreenhouseManagementApp')
    .component('greenhouseAddPage',{
        templateUrl: 'greenhouse-add-page/client.greenhouse-add-page.template.html',
        controller: function GreenhouseAddPageController($routeParams,GreenhouseService,Flash){
            let ctrl = this;

            ctrl.$onInit = function(){
                ctrl.greenhouse = {
                    greenhouse_id: '',
                    greenhouse_name: '',
                    greenhouse_controllers: []
                };
            };

            // create a new greenhouse
            ctrl.createGreenhouse = function(){
                GreenhouseService.createGreenhouse(ctrl.greenhouse)
                    .then(function success(res){
                        Flash.create('success',res.data);
                    }, function failure(res){
                        Flash.create('danger',res.data);
                    })
            };
        }
    });