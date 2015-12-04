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
                templateUrl: 'app/workout/workout.html',
                authenticate: true
            })

            .state('about', {
                url: '/about',
                controller: 'AboutCtrl',
                controllerAs: 'ac',
                templateUrl: 'app/about/about.html',
                authenticate: false
            });

        $urlRouterProvider
            .otherwise('/workout');
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
                    //$state.transitionTo('home');
                    //event.preventDefault();
                }

            });

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
    function AboutController($rootScope, $interval) {
        var ac = this;

        ac.usersCount = 9;

        // Angular аналог setInterval(), который включает в себя встроенный $scope.$apply() для отслеживания изменений
        // и их передачи между View и Model.
        $interval(function () {
            ac.usersCount += 3;
            console.log('Users count: ', ac.usersCount);
        }, 1000);
    }

})();