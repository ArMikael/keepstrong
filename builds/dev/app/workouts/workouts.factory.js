(function(){
    "use strict";

    angular.module('kpStr.workouts')
        .factory('workouts', WorkoutsFactory);

    // @ngInject
    function WorkoutsFactory($rootScope, $log, $firebaseArray, $firebaseObject, dbc) {
        $log.debug('WorkoutsFactory');

        var ref = dbc.getRef();
        var workoutsRef = ref.child('workouts');
        
        console.log('ref', ref, workoutsRef);

        var service = {
            getWorkouts: getWorkouts,
            createWorkout: createWorkout
        };

        function getWorkouts() {
            return $firebaseArray(workotsRef).$loaded(function(_data){
                return _data;
            });
        }

         function createWorkout(_workout) {
             console.log('wokrout: ',_workout);
            return $firebaseArray(workoutsRef).$add({
                title: _workout.title,
                type: _workout.type
            }).then(function(_ref) {
                return $firebaseObject(_ref).$loaded();
            });
        }


        return service;
    }

})();