;(function(){
	'use strict';

	angular.module('kpStr.users', [
				'kpStr.dbc'
			])
		.config(usersConfig);

		console.log('.users');

		// @ngInject
		function usersConfig($stateProvider) {
			console.log('kpStr.users');

			$stateProvider
				.state('users', {
					url: '/users',
					controller: 'UsersCtrl',
					controllerAs: 'uc',
					templateUrl: 'app/users/users.html'
				})
		}

})();