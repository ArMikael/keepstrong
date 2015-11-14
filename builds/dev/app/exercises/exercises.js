/**
 * Created by michaeltreser on 11/11/15.
 */

angular.module('kpStr.exer', ['ngRoute'])
    .controller('ExerCtrl', ExercisesController);

function ExercisesController() {
    var s = this;

    s.message = "Let's start with some exercises!";
};