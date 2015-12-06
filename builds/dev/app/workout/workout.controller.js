(function(){
    "use strict";

    angular.module('kpStr.workout')
        .controller('WorkoutCtrl', WorkoutController);

    // @ngInject
    function WorkoutController($rootScope, $log, workouts) {
        var wc = this;

        $log.debug('WorkoutController');

        //wc.workouts = workouts.getWorkouts();
    }

})();