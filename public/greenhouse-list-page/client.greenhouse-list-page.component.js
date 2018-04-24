angular.module('phytotronGreenhouseManagementApp')
    .component('greenhouseListPage',{
        templateUrl: 'greenhouse-list-page/client.greenhouse-list-page.template.html',
        controller: function GreenhouseListPageController(GreenhouseService, Flash){
            let ctrl = this;

            // Parameters for table pagination
            ctrl.tableQuery = {
                order: 'greenhouse_name',
                limit: 10,
                page: 1
            };

            // Function auto called when page is initialized
            ctrl.$onInit = function(){
                ctrl.getGreenhouseList();
            };

            // Fetch a list of all current greenhouses.
            ctrl.getGreenhouseList = function () {
                GreenhouseService.getGreenhouseList()
                    .then(function success(res) {
                        ctrl.greenhouseList = res.data;
                        Flash.create('success', ctrl.greenhouseList.length+' Greenhouses currently found');
                    },function failure(res) {
                        Flash.create('danger',res.data);
                    });
            };
        }
    });