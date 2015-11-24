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
        //.filter('timeFromNow', timeFromNow);


    function StatsFactory($http) {
        var dataFactory = {};

        console.log('factory');
        dataFactory.getData = function(url) {
            return $http.get(url);
        };

        return dataFactory;
    }
    StatsFactory.$inject = ["$http"];


    //function StatsFactory($http) {
    //    var dataFactory = {
    //        data: {}
    //    };
    //
    //    dataFactory.getData = function() {
    //        return $http.get('app/statistics/persons.json')
    //            .then(function(response) {
    //                console.log('Factory data: ', response.data);
    //                dataFactory.data = response.data;
    //            });
    //    };
    //
    //    return dataFactory;
    //
    //}


    /**
     * Stats Controller
     */

    // @ngInject
    function StatsController($rootScope, StatsFactory) {
        var sc = this;

        $rootScope.currentPage = 'statistics';
        sc.message = 'Statistics page!';

        //StatsFactory.getData();
        //console.log('dada', StatsFactory.data);
        //sc.persons = StatsFactory.data;

        //sc.persons = StatsFactory.getData();

        StatsFactory.getData('app/statistics/persons.json')
            .then(function(response) {
                console.log(response.data);
                sc.persons = response.data;
        });

        console.log('sc.persons', sc.persons);
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



    /* Custom Filters */

    // @ngInject
    function toLowerCase() {
        return function(text) {
            var filtered = text.toLowerCase();

            return filtered;
        }
    }


    // @ngInject
    function timeFromNow() {
        return function(date) {
            var currentTime = Date.now(),
                timeDiff = currentTime - Date.parse(date),
                filteredDate;

            // Time variables
            var seconds = Math.round(timeDiff) / 1000,
                minutes = Math.round(seconds) / 60,
                hours = Math.round(minutes) / 60,
                days = Math.round(hours) / 24,
                months = Math.round(days) / 30,
                years = Math.round(days) / 365;

            console.log('registered', date);
            console.log('currentTime', currentTime);
            console.log('timeDiff', timeDiff);

            var timeStrings = {
                seconds: 'Less Than a Minute Ago',
                minute: 'About a Minute Ago',
                minutes: ' Minutes Ago',
                hour: 'About an Hour Ago',
                hours: ' Hours Ago',
                day: ' a Day Ago',
                days: ' Days Ago',
                month: ' About a Month Ago',
                months: ' Months Ago',
                year: ' About a Year Ago',
                years: ' Years Ago'
            };


            //filteredDate = timeStrings.seconds ||
            //    minutes == 1 ? timeStrings.minute : timeStrings.seconds ||
            //    minutes > 1 ? minutes + timeStrings.minutes : timeStrings.minute ||
            //    hours == 1 ? timeStrings.hour : minutes + timeStrings.minutes ||
            //    hours > 1 ? hours + timeStrings.hours : timeStrings.hour ||
            //    days == 1 ? timeStrings.day : hours + timeStrings.hours ||
            //    days > 1 ? days + timeStrings.days : timeStrings.day ||
            //    months == 1 ? timeStrings.month : days + timeStrings.days ||
            //    months > 1 ? months + timeStrings.months : timeStrings.month;

            filteredDate =
                months > 1 ? months + timeStrings.months : timeStrings.month ||
                months == 1 ? timeStrings.month : days + timeStrings.days ||
                days > 1 ? days + timeStrings.days : timeStrings.day ||
                days == 1 ? timeStrings.day : hours + timeStrings.hours ||
                hours > 1 ? hours + timeStrings.hours : timeStrings.hour ||
                hours == 1 ? timeStrings.hour : minutes + timeStrings.minutes ||
                minutes > 1 ? minutes + timeStrings.minutes : timeStrings.minute ||
                minutes == 1 ? timeStrings.minute : timeStrings.seconds ||
                timeStrings.seconds;

            return filteredDate;
        }
    }


})();
(function(){
	'use strict';

	angular.module('kpStr.users')
		.controller('UsersCtrl', UsersController)

    /**
     * Users Controller
     */

	// @ngInject
	function UsersController($rootScope, factoryUsers) {
		var uc = this;
		$rootScope.currentPage = 'users';

		uc.users = [];

		//factoryUsers.getUsers().then(_response){
		//	uc.users = _response;
		//}
	}
	UsersController.$inject = ["$rootScope", "factoryUsers"];

})();
(function(){
	'use strict';

	angular.module('kpStr')
		.factory('factoryUsers', factoryUsers)


	function factoryUsers() {

	}
	
})();