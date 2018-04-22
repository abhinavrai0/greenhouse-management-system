angular.module('phytotronGreenhouseManagementApp')
    .component('applicationSettingsPage',{
        templateUrl: 'application-settings-page/client.application-settings-page.template.html',
        controller: function ApplicationSettingsPageController(
            ApplicationSettingsService,
            Flash){

            var ctrl = this;


            ctrl.$onInit = function(){
                ctrl.getApplicationSettings();
            };

            // Get current settings from the server
            ctrl.getApplicationSettings = function(){
                ApplicationSettingsService.getApplicationSettings()
                    .then(function success(res) {
                        var applicationSettings = res.data;

                    },function failure(res) {
                        Flash.create('danger',res.data);
                    });
            }


            // Save current set of settings on the server
            ctrl.setApplicationSettings = function () {
                var applicationSettings = {
                };
                ApplicationSettingsService.setApplicationSettings(applicationSettings)
                    .then(function success(res) {
                        Flash.create('success',res.data);
                    }, function failure(res) {
                        Flash.create('danger',res.data);
                    });
            }

        }
    });