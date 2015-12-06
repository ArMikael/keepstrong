(function(){
    "use strict";

    angular.module('kpStr.workouts')
        .controller('WorkoutsCtrl', WorkoutsController);

    // @ngInject
    function WorkoutsController($rootScope, $log, workouts) {
        var wc = this;

        wc.message = "Workouts messsssage";


        wc.editWorkout = function(_workout) {
            console.log(_workout);

            wc.editFormShow = true;
            wc.editableWorkout = {
                //id: _user.$id,
                title: _workout.title,
                type: _workout.type
            }
        };

        wc.createWorkout = function(_workout) {
            console.log('wrkOUT', _workout);
            workouts.createWorkout(_workout);
        };

        $log.debug('WorkoutsController');

        //wc.workouts = workouts.getWorkouts();
    }

})();