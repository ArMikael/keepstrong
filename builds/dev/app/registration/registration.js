(function(){
    'use strict';

    angular.module('kpStr.registration', [
        'ngRoute',
        'kpStr.dbc'
    ])
        .config(registrationConfig)
        .controller('RegCtrl', RegistrationController)
        .factory('regFactory', registrationFactory);


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

    // @ngInject
    function RegistrationController(regFactory) {
        var rc = this;

        rc.singinUser = {
            email: null,
            password: null
        };

        rc.singin = function() {
            regFactory.signin(s.signinUser);
        };

        rc.signupUser = {
            email: null,
            password: null,
            name: null
        }
    }

    // @ngInject
    function registrationFactory(dbc) {

    }

})();