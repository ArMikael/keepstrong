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
            getAllWorkouts: getAllWorkouts,
            saveWorkout: saveWorkout,
            createWorkout: createWorkout,
            deleteWorkout: deleteWorkout
        };

        function getAllWorkouts() {
            return $firebaseArray(workoutsRef).$loaded(function(_data) {
                console.log('Getting workouts from firebase to factory', _data);
                return _data;
            });
        }


        function saveWorkout(_workout) {
            var wrkRef = $firebaseObject(workoutsRef.child(_workout.id));

            return wrkRef.$loaded(function(_workoutDB) {
                _workoutDB.title = _workout.title;
                _workoutDB.type = _workout.type;
                _workoutDB.exercises = _workout.exercises.split(',');
                return wrkRef.$save();
            });
        }


         function createWorkout(_workout) {
            console.log('createWorkout workout: ',_workout);
            return $firebaseArray(workoutsRef).$add({
                title: _workout.title,
                type: _workout.type,
                exercises: _workout.exercises.split(',')
            }).then(function(_ref) {
                console.log(exercises);
                return $firebaseObject(_ref).$loaded();
            });
        }


        function deleteWorkout(_workout) {
            return $firebaseObject(workoutsRef.child(_workout.id)).$remove();
        }


        return service;
    }

})();