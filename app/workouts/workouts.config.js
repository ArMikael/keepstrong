(function(){
    "use strict";

    angular.module('kpStr.workouts', [
        'kpStr.dbc'
    ])
        .config(WorkoutsConfig);

    // @ngInject
    function WorkoutsConfig($stateProvider) {
        $stateProvider
            .state('workouts', {
                url: '/workouts',
                controller: 'WorkoutsCtrl',
                controllerAs: 'wc',
                templateUrl: 'app/workouts/workouts.html',
                authenticate: true
            })
    }


})();