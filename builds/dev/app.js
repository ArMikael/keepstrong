/**
 * Created by michaeltreser on 11/11/15.
 */

console.log('Main.js');

;(function() {
    'use strict';

    angular.module('kpStr', [
            'ngRoute',
            'ui.bootstrap'])
        .controller('MainCtrl', MainController)
        .controller('LoginCtrl', LoginController)
        .controller('RegCtrl', RegistrationController)
        .controller('ExerCtrl', ExerciseController)
        .controller('StatsCtrl', StatsController)
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

            .when('/statistics', {
                controller: 'StatsCtrl',
                controllerAs: 'sc',
                templateUrl: 'app/statistics/statistics.html'
            })

            .when('/about', {
                controller: 'AboutCtrl',
                controllerAs: 'ac',
                templateUrl: 'app/about/about.html'
            })

            .otherwise({ redirectTo: '/workout' });
    }
    MainConfig.$inject = ["$routeProvider"];

    // @ngInject
    function MainController($scope, $rootScope) {
        var s = this;

        $rootScope.currentPage = 'workout';
        s.message = 'Welcome to the KeepStrong App!';
        s.run = 'Go fast, lets run';
    }
    MainController.$inject = ["$scope", "$rootScope"];

    // $ngInject
    function LoginController($rootScope) {
        var s = this;

        $rootScope.currentPage = 'login';
        s.message = 'Please, login.';
    }
    LoginController.$inject = ["$rootScope"];

    // $ngInject
    function RegistrationController($rootScope) {
        var s = this;

        $rootScope.currentPage = 'registration';
        s.message = 'Please, register';
    }
    RegistrationController.$inject = ["$rootScope"];


    // @ngInject
    function ExerciseController($rootScope) {
        var s = this;

        s.message = 'Exercises page!';
        $rootScope.currentPage = 'exercises';
    }
    ExerciseController.$inject = ["$rootScope"];

    // @ngInject
    function StatsController($rootScope) {
        var s = this;

        s.message = 'Exercises page!';
        $rootScope.currentPage = 'statistics';
    }
    StatsController.$inject = ["$rootScope"];

    // @ngInject
    function AboutController($rootScope) {
        var s = this;

        s.message = 'Exercises page!';
        $rootScope.currentPage = 'about';
    }
    AboutController.$inject = ["$rootScope"];

})();
/**
 * Created by michaeltreser on 11/11/15.
 */

angular.module('kpStr.exer', ['ngRoute'])
    .controller('ExerCtrl', ExercisesController);

function ExercisesController() {
    var s = this;

    s.message = "Let's start with some exercises!";
};