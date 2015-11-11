;(function() {
	'use strict';

	angular.module('keepStr', ['ngRoute'])
		.controller('MainCtrl', MainController)
		.controller('WorkoutCtrl', WorkoutController)
		.controller('ExerCtrl', ExerciseController)
		.config(MainConfig);

		function MainConfig($routeProvider) {
			$routeProvider
				.when('/', {
					controller: 'MainCtrl',
					templateUrl: 'app/workout/workout.html'
				})

				.when('/workout', {
					controller: 'WorkoutCtrl',
					templateUrl: 'app/workout/workout.html'
				})

				.when('/exercises', {
					controller: 'ExerCtrl',
					templateUrl: 'app/exercises/exercises.html'
				})

				.when('/statistics', {
					controller: 'StatCtrl',
					templateUrl: 'app/statistics/statistics.html'
				})

				.when('/about', {
					controller: 'AboutCtrl',
					templateUrl: 'app/about/about.html'
				})

				.otherwise({ redirectTo: '/' });
		}

		// @ngInject
		function MainController($scope, $rootScope) {
			var m = this;

			$rootScope.currentPage = 'home';
			m.message = 'Welcome to the KeepStrong App!';
		}
		MainController.$inject = ["$scope", "$rootScope"];

		// @ngInject
		function WorkoutController($rootScope) {
			var t = this;

			$rootScope.currentPage = 'workout';
			t.message = 'Let\'s plan and save new training.';
		}
		WorkoutController.$inject = ["$rootScope"];

		// @ngInject
		function ExerciseController($rootScope) {
			var e = this;
			e.message = 'Exercises page!';
			$rootScope.currentPage = 'exercises';
		}
		ExerciseController.$inject = ["$rootScope"];

})();
