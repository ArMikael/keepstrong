(function() {
    'use strict';

    angular.module('kpStr.exercises', [])
        .config(ExercisesConfig)
        .controller('ExercisesCtrl', ExercisesController);


    // @ngInject
    function ExercisesController() {
        var ec = this;

        $rootScope.currentPage = 'exercises';

        ec.message = "Let's start with some exercises!";
    }


    // @ngInject
    function ExercisesConfig($stateProvider) {
        $stateProvider
            .state('exercises', {
                    url: '/exercises',
                    controller: 'ExercisesCtrl',
                    controllerAs: 'ec',
                    templateUrl: 'app/exercises/exercises.html'
                })
    }

})();

