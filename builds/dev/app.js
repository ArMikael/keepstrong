/**
 * Created by michaeltreser on 11/11/15.
 */

console.log('Main.js');

;(function() {
    'use strict';

    angular.module('keepStr', ['ngRoute'])
        .controller('MainCtrl', MainController)
        .controller('ExerCtrl', ExerciseController)
        .controller('StatsCtrl', StatsController)
        .controller('AboutCtrl', AboutController)
        .config(MainConfig);

    function MainConfig($routeProvider) {
        $routeProvider
            .when('/workout', {
                controller: 'MainCtrl',
                templateUrl: 'app/workout/workout.html'
            })

            //.when('/workout', {
            //    controller: 'WorkoutCtrl',
            //    templateUrl: 'app/workout/workout.html'
            //})

            .when('/exercises', {
                controller: 'ExerCtrl',
                templateUrl: 'app/exercises/exercises.html'
            })

            .when('/statistics', {
                controller: 'StatsCtrl',
                templateUrl: 'app/statistics/statistics.html'
            })

            .when('/about', {
                controller: 'AboutCtrl',
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

angular.module('keepStrong')
    .controller('ExerCtrl', ExercisesController);

function ExercisesController() {
    console.log('Exercises');
    var e = this;
    e.message = "Let's start with some expertis!";
};