(function(){
    'use strict';

    angular.module('kpStr.registration', [
        'ngRoute',
        'kpStr.dbc',
        'kpStr.users'
    ])
        .config(registrationConfig);



    // @ngInject
    function registrationConfig($routeProvider) {
        $routeProvider
            .when('/signin', {
                controller: 'RegCtrl',
                controllerAs: 'rc',
                templateUrl: 'app/registration/signin.html'
            })

            .when('/registration', {
                controller: 'RegCtrl',
                controllerAs: 'rc',
                templateUrl: 'app/registration/registration.html'
            })
    }

})();


