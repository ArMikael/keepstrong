(function(){
    "use strict";

    angular.module('kpStr.exercises')
        .factory('exercisesFactory', exercisesFactory);

    // @ngInject
    function exercisesFactory(dbc, $log, $firebaseArray, $firebaseObject) {
        $log.debug('exercisesFactory');

        var ref = dbc.getRef();
        var exercisesRef = ref.child('exercises');


        var exercises = {
            getAllExercises: getAllExercises,
            saveExercise: saveExercise,
            createExercise: createExercise,
            deleteExercise: deleteExercise
        };


        function getAllExercises() {
            return $firebaseArray(exercisesRef).$loaded(function(_data) {
                $log.debug('Getting exercises from firebase to factory', _data);
                return _data;
            });
        }


        function saveExercise(_exercises) {
            var exRef = $firebaseObject(workoutsRef.child(_exercises.id));

            return exRef.$loaded(function(_exercisesDB) {
                _exercisesDB.title = _exercise.title;
                _exercisesDB.type = _exercise.type;
                return exRef.$save();
            });
        }


        function createExercise(_exercise) {
            $log.debug('createExercise exercises: ',_exercise);
            return $firebaseArray(exercisesRef).$add({
                title: _exercise.title,
                type: _exercise.type
            }).then(function(_ref) {
                $log.debug(exercises);
                return $firebaseObject(_ref).$loaded();
            });
        }


        function deleteExercise(_exercise) {
            return $firebaseObject(exercisesRef.child(_exercise.id)).$remove();
        }


        return exercises;
    }

})();