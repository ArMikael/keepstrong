;(function() {
    'use strict';

    angular.module('kpStr', [
            'ui.router',
            'ui.bootstrap',
            'kpStr.stats',
            'kpStr.users',
            'kpStr.exercises',
            'kpStr.registration'
    ])
        .constant('FURL', 'https://keepstrong.firebaseio.com/')
        .config(MainConfig)
        .run(MainRun)
        .controller('MainCtrl', MainController)
        .controller('AboutCtrl', AboutController);


    // @ngInject
    function MainConfig($urlRouterProvider, $stateProvider, $logProvider) {
        $logProvider.debugEnabled(true);

        $stateProvider
            .state('workout', {
                url: '/workout',
                controller: 'MainCtrl',
                controllerAs: 'mc',
                templateUrl: 'app/workout/workout.html'
            })

            .state('about', {
                url: '/about',
                controller: 'AboutCtrl',
                controllerAs: 'ac',
                templateUrl: 'app/about/about.html'
            });

        $urlRouterProvider
            .otherwise('/workout');
    }


    // @ngInject
    function MainRun($log, $rootScope, $state, $stateParams) {
        $log.debug('MainRun');

        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
    }


    // @ngInject
    function MainController($scope, $rootScope, $log) {
        var s = this;

        $log.debug('MainCTRL');

        s.message = 'Welcome to the KeepStrong App!';
        s.run = 'Go fast, lets run';
    }


    // @ngInject
    function AboutController($rootScope) {
        var s = this;

        s.message = 'About page!';
    }

})();