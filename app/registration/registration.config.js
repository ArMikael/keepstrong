(function(){
    'use strict';

    angular.module('kpStr.registration', [
        'kpStr.dbc'
    ])
        .config(registrationConfig);



    // @ngInject
    function registrationConfig($stateProvider) {
        $stateProvider
            .state('signin', {
                url: '/signin',
                controller: 'RegCtrl',
                controllerAs: 'rc',
                templateUrl: 'app/registration/signin.html',
                authenticate: false
            })

            .state('registration', {
                url: '/registration',
                controller: 'RegCtrl',
                controllerAs: 'rc',
                templateUrl: 'app/registration/registration.html',
                authenticate: false
            })
    }

})();


