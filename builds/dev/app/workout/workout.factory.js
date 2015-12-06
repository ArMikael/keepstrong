(function(){
    "use strict";

    angular.module('kpStr.workout')
        .factory('workouts', WorkoutsFactory);

    // @ngInject
    function WorkoutsFactory($rootScope, $log) {

        var service = {

        };

        $log.debug('WorkoutFactory');


        return service;
    }

})();