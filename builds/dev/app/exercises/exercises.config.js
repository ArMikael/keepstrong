(function() {
    'use strict';

    angular.module('kpStr.exercises', [
        'dbc'
    ])
        .config(ExercisesConfig);


    // @ngInject
    function ExercisesConfig($stateProvider) {
        $stateProvider
            .state('exercises', {
                    url: '/exercises',
                    controller: 'ExercisesCtrl',
                    controllerAs: 'ec',
                    templateUrl: 'app/exercises/exercises.html',
                    authenticate: false
                })

            .state('exercises.stretching', {
                url: '/stretching',
                templateUrl: 'app/exercises/exercises.stretching.html',
                authenticate: true
            })

            .state('exercises.endurance', {
                url: '/endurance',
                templateUrl: 'app/exercises/exercises.endurance.html',
                authenticate: true
            })

            .state('exercises.strength', {
                url: '/strength',
                templateUrl: 'app/exercises/exercises.strength.html',
                authenticate: true
            })
    }

})();

