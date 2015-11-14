/**
 * Created by michaeltreser on 11/11/15.
 */

console.log('Main.js');

;(function() {
    'use strict';

    angular.module('kpStr', [
            'ngRoute',
            'ui.bootstrap',
            'kpStr.stats'
    ])
        .controller('MainCtrl', MainController)
        .controller('LoginCtrl', LoginController)
        .controller('RegCtrl', RegistrationController)
        .controller('ExerCtrl', ExerciseController)
        .controller('AboutCtrl', AboutController)
        .config(MainConfig);

    function MainConfig($routeProvider) {
        $routeProvider
            .when('/workout', {
                controller: 'MainCtrl',
                controllerAs: 'mc',
                templateUrl: 'app/workout/workout.html'
            })

            .when('/login', {
                controller: 'LoginCtrl',
                controllerAs: 'lc',
                templateUrl: 'app/login/login.html'
            })

            .when('/registration', {
                controller: 'RegCtrl',
                controllerAs: 'rc',
                templateUrl: 'app/login/registration.html'
            })

            .when('/exercises', {
                controller: 'ExerCtrl',
                controllerAs: 'ec',
                templateUrl: 'app/exercises/exercises.html'
            })

            .when('/about', {
                controller: 'AboutCtrl',
                controllerAs: 'ac',
                templateUrl: 'app/about/about.html'
            })

            .otherwise({ redirectTo: '/workout' });
    }

    // @ngInject
    function MainController($scope, $rootScope) {
        var s = this;

        $rootScope.currentPage = 'workout';
        s.message = 'Welcome to the KeepStrong App!';
        s.run = 'Go fast, lets run';
    }

    // $ngInject
    function LoginController($rootScope) {
        var s = this;

        $rootScope.currentPage = 'login';
        s.message = 'Please, login.';
    }

    // $ngInject
    function RegistrationController($rootScope) {
        var s = this;

        $rootScope.currentPage = 'registration';
        s.message = 'Please, register';
    }


    // @ngInject
    function ExerciseController($rootScope) {
        var s = this;

        s.message = 'Exercises page!';
        $rootScope.currentPage = 'exercises';
    }


    // @ngInject
    function AboutController($rootScope) {
        var s = this;

        s.message = 'Exercises page!';
        $rootScope.currentPage = 'about';
    }

})();