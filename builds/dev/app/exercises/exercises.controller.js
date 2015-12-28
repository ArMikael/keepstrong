(function(){
    "use strict";

    angular.module('kpStr.exercises')
        .controller('ExercisesCtrl', ExercisesController);


    // @ngInject
    function ExercisesController($rootScope, exercises, $log) {
        var ec = this;
        $rootScope.currentPage = 'exercises';

        var counter = {};
        counter.count = 0;
        console.log(counter.count);

        exercises.getAllExercises().then(function(_response){
            $log.debug('response', _response)
            ec.exercises = _response;
        });


        ec.editExercise = function(_exercise) {
            $log.debug(_exercise);

            ec.editFormShow = true;
            ec.editableExercise = {
                id: _exercise.$id,
                title: _exercise.title,
                type: _exercise.type,
                count: _exercise.count
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
                count: null
            };
        };


        ec.removeExercise = function(_exercise) {
            $log.debug('removeExercise', _exercise);
            exercises.deleteExercise(_exercise);
        };

        $log.debug('ExercisesController');

    }

})();