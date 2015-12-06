;(function() {
    'use strict';

    angular.module('kpStr', [
            'ui.router',
            'ui.bootstrap',
            'kpStr.home',
            'kpStr.workouts',
            'kpStr.stats',
            'kpStr.users',
            'kpStr.exercises',
            'kpStr.registration',
            'kpStr.about',
            'kpStr.profile'
    ])
        .constant('FURL', 'https://keepstrong.firebaseio.com/')
        .config(MainConfig)
        .run(MainRun)
        .controller('MainCtrl', MainController);


    // @ngInject
    function MainConfig($urlRouterProvider, $logProvider) {
        $logProvider.debugEnabled(true);

        $urlRouterProvider
            .otherwise('/');
    }


    // @ngInject
    function MainRun($log, $rootScope, $state, $stateParams, dbc) {
        $log.debug('MainRun');

        $rootScope.$on('$stateChangeStart',
            function(event, toState, toParams, fromState, fromParams){
                console.log('StateChangeStart');
                console.log('isLoggedIn: ', dbc.isLoggedIn());

                if (toState.authenticate && !dbc.isLoggedIn()) {
                    $state.transitionTo('signin');
                    event.preventDefault();
                } else if (!toState.authenticate && dbc.isLoggedIn()) {
                    $state.transitionTo('home');
                    //event.preventDefault();
                }

            });

        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
    }


    // @ngInject
    function MainController($rootScope, $log) {
        var mc = this;

        $log.debug('MainCTRL');

        mc.message = 'Welcome to the KeepStrong App!';
    }

})();