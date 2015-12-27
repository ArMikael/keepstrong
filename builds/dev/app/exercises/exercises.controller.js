(function(){
    "use strict";

    angular.module('kpStr.exercises')
        .controller('ExercisesCtrl', ExercisesController);


    // @ngInject
    function ExercisesController($rootScope, exercises, $log) {
        var ec = this;

        $rootScope.currentPage = 'exercises';

        exercises.getAllExercises().then(function(_response){
            console.log('response', _response)
            ec.exercises = _response;
        });


        ec.editExercise = function(_exercise) {
            console.log(_exercise);

            ec.editFormShow = true;
            ec.editableExercise = {
                id: _exercise.$id,
                title: _exercise.title,
                type: _exercise.type,
                exercises: _exercise.exercises
            }
        };

        ec.createExercise = function(_exercise) {
            $log.debug('creatingExercise CTRL', _exercise);
            exercises.createExercise(_exercise);
        };


        ec.saveExercise = function() {
            exercises.saveExercise(ec.editableExercise)
                .then(function(){
                    ec.cancelEditExercise();
                });
        };


        ec.cancelEditExercise = function() {
            ec.editFormShow = false;

            ec.editableExercise = {
                id: null,
                title: null,
                type: null,
                exercises: null
            };
        };


        ec.removeExercise = function(_exercise) {
            $log.debug('removeExercise', _exercise);
            exercises.deleteExercise(_exercise);
        };

        $log.debug('ExercisesController');

    }

})();