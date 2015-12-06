(function(){
    "use strict";

    angular.module('kpStr.workout', [

    ])
        .config(WorkoutConfig);

    // @ngInject
    function WorkoutConfig($stateProvider) {
        $stateProvider
            .state('workout', {
                url: '/workout',
                controller: 'WorkoutCtrl',
                controllerAs: 'wc',
                templateUrl: 'app/workout/workout.html',
                authenticate: true
            })
    }

})();