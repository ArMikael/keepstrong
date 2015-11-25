;(function(){
	'use strict';

	angular.module('kpStr.users', [
			'ngRoute',
			'kpStr.dbc'
		])
		.config(usersConfig);

		console.log('.users');

		// @ngInject
		function usersConfig($routeProvider) {
			console.log('kpStr.users');

			$routeProvider
				.when('/users', {
					controller: 'UsersCtrl',
					controllerAs: 'uc',
					templateUrl: 'app/users/users.html'
				})
		}

})();