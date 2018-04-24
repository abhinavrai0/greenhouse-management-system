'use strict';

// Configure the urls to respective components : using ngRoute
angular.module('phytotronGreenhouseManagementApp')
    .config(['$routeProvider', '$locationProvider',
    function config($routeProvider,$locationProvider){
        $locationProvider.hashPrefix('');

        // URL-Pages Mappings general application
        $routeProvider
            .when('/',{
                template: '<login-page></login-page>'
            })
            .when('/home',{
                template: '<home-page></home-page>'
            })
            .when('/application-settings',{
                template:'<application-settings-page></application-settings-page>'
            });

        // URL-Pages Mappings greenhouse
        $routeProvider
            .when('/greenhouse-list',{
                template: '<greenhouse-list-page></greenhouse-list-page>'
            })
            .when('/greenhouse-add',{
                template: '<greenhouse-add-page></greenhouse-add-page>'
            })
            .when('/greenhouse-update/:id',{
                template: '<greenhouse-update-page></greenhouse-update-page>'
            });
}]);

// Configure the theme of the application
angular.module('phytotronGreenhouseManagementApp')
    .config( function($mdThemingProvider){
        $mdThemingProvider.theme('default')
            .primaryPalette('red')
            .accentPalette('blue');
});

// Configure Flash Message
angular.module('phytotronGreenhouseManagementApp')
    .config( function(FlashProvider) {
        FlashProvider.setTimeout(Constants.FLASH_MESSAGES_TIMEOUT);
        FlashProvider.setShowClose(true);
});

/*
// Configure Global Values
angular.module('phytotronGreenhouseManagementApp')
    .value('user',{
        username:''
    });
*/

// Configure the HttpProvider by injecting with interceptor
angular.module('phytotronGreenhouseManagementApp')
    .config(['$httpProvider',function ($httpProvider) {
        $httpProvider.interceptors.push('AuthenticationInterceptor');
    }]);