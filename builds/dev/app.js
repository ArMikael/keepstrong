/**
 * Created by michaeltreser on 11/11/15.
 */

console.log('Main.js');

;(function() {
    'use strict';

    angular.module('kpStr', [
            'ngRoute',
            'ui.bootstrap',
            'kpStr.stats'
    ])
        .controller('MainCtrl', MainController)
        .controller('LoginCtrl', LoginController)
        .controller('RegCtrl', RegistrationController)
        .controller('ExerCtrl', ExerciseController)
        .controller('AboutCtrl', AboutController)
        .config(MainConfig);

    function MainConfig($routeProvider) {
        $routeProvider
            .when('/workout', {
                controller: 'MainCtrl',
                controllerAs: 'mc',
                templateUrl: 'app/workout/workout.html'
            })

            .when('/login', {
                controller: 'LoginCtrl',
                controllerAs: 'lc',
                templateUrl: 'app/login/login.html'
            })

            .when('/registration', {
                controller: 'RegCtrl',
                controllerAs: 'rc',
                templateUrl: 'app/login/registration.html'
            })

            .when('/exercises', {
                controller: 'ExerCtrl',
                controllerAs: 'ec',
                templateUrl: 'app/exercises/exercises.html'
            })

            .when('/about', {
                controller: 'AboutCtrl',
                controllerAs: 'ac',
                templateUrl: 'app/about/about.html'
            })

            .otherwise({ redirectTo: '/workout' });
    }
    MainConfig.$inject = ["$routeProvider"];

    // @ngInject
    function MainController($scope, $rootScope) {
        var s = this;

        $rootScope.currentPage = 'workout';
        s.message = 'Welcome to the KeepStrong App!';
        s.run = 'Go fast, lets run';
    }
    MainController.$inject = ["$scope", "$rootScope"];

    // $ngInject
    function LoginController($rootScope) {
        var s = this;

        $rootScope.currentPage = 'login';
        s.message = 'Please, login.';
    }
    LoginController.$inject = ["$rootScope"];

    // $ngInject
    function RegistrationController($rootScope) {
        var s = this;

        $rootScope.currentPage = 'registration';
        s.message = 'Please, register';
    }
    RegistrationController.$inject = ["$rootScope"];


    // @ngInject
    function ExerciseController($rootScope) {
        var s = this;

        s.message = 'Exercises page!';
        $rootScope.currentPage = 'exercises';
    }
    ExerciseController.$inject = ["$rootScope"];


    // @ngInject
    function AboutController($rootScope) {
        var s = this;

        s.message = 'Exercises page!';
        $rootScope.currentPage = 'about';
    }
    AboutController.$inject = ["$rootScope"];

})();
/**
 * Created by michaeltreser on 11/11/15.
 */

angular.module('kpStr.exer', ['ngRoute'])
    .controller('ExerCtrl', ExercisesController);

function ExercisesController() {
    var s = this;

    s.message = "Let's start with some exercises!";
};
/**
 * Created by michaeltreser on 11/14/15.
 */

;(function() {
    'use strict';

    angular.module('kpStr.stats', [
        'ngRoute'
    ])
        .config(StatsConfig)
        .factory('StatsFactory', StatsFactory)
        .controller('StatsCtrl', StatsController)
        .filter('toLowerCase', toLowerCase);


    //function StatsFactory($http) {
    //    var dataFactory = {};
    //
    //    dataFactory.getData = function() {
    //        return $http.get('app/statistics/persons.json');
    //    }
    //
    //    return dataFactory;
    //}
    //

    function StatsFactory($http) {
        var dataFactory = {};

        dataFactory.getData = function() {
            $http.get('app/statistics/persons.json')
                .success(function(data) {
                    return data;
            });
        }

        return dataFactory;

    }
    StatsFactory.$inject = ["$http"];



    /**
     * Stats Controller
     */

    // @ngInject
    function StatsController($rootScope, StatsFactory) {
        var sc = this;

        $rootScope.currentPage = 'statistics';
        sc.message = 'Statistics page!';

        //sc.persons = StatsFactory;

        sc.persons = StatsFactory.getData();

        console.log(sc.persons);


        //StatsFactory.getData()
        //    .success(function(data){
        //        sc.persons = data;
        //    })
        //    .error(function (error) {
        //        sc.status = 'Unable to load customer data: ' + error.message;
        //    });
    }
    StatsController.$inject = ["$rootScope", "StatsFactory"];


    // @ngInject
    function StatsConfig($routeProvider) {
        $routeProvider
            .when('/statistics', {
                controller: 'StatsCtrl',
                controllerAs: 'sc',
                templateUrl: 'app/statistics/statistics.html'
            });
    }
    StatsConfig.$inject = ["$routeProvider"];



    /* Custom Filter */

    // @ngInject
    function toLowerCase() {
        return function(text) {
            var filtered = text.toLowerCase();

            return filtered;
        }
    }

})();