(function(){
    "use strict";

    angular.module('kpStr.workouts')
        .controller('WorkoutsCtrl', WorkoutsController);

    // @ngInject
    function WorkoutsController($rootScope, $log, workouts) {
        var wc = this;

        workouts.getAllWorkouts().then(function(_response){
            console.log('response', _response)
            wc.workouts = _response;
        });


        wc.editWorkout = function(_workout) {
            console.log(_workout);

            wc.editFormShow = true;
            wc.editableWorkout = {
                id: _workout.$id,
                title: _workout.title,
                type: _workout.type
            }
        };

        wc.createWorkout = function(_workout) {
            console.log('wrkOUT', _workout);
            workouts.createWorkout(_workout);
        };


        wc.saveWorkout = function() {
            workouts.saveWorkout(wc.editableWorkout)
                .then(function(){
                    // wc.cancelWorkout();
                });
        };


        wc.removeWorkout = function(_workout) {
            console.log('removeWorkout', _workout);
            workouts.deleteWorkout(_workout);
        };

        $log.debug('WorkoutsController');

        //wc.workouts = workouts.getWorkouts();
    }

})();