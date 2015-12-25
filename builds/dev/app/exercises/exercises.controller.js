(function(){
    "use strict";

    angular.module('kpStr.exercises')
        .controller('ExercisesCtrl', ExercisesController);


    // @ngInject
    function ExercisesController($rootScope) {
        var ec = this;

        $rootScope.currentPage = 'exercises';

        ec.message = "Let's start with some exercises!";

    }

})();