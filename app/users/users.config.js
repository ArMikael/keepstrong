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
					templateUrl: 'app/users/users.html',
					authenticate: false,
					resolve: {
						auth: /* @ngInject */ function(dbc, $q, $state) {
							var deferred = $q.defer();
							setTimeout(function(){
								console.log('Resolve auth.', dbc.get$Auth().$getAuth());
								if (dbc.get$Auth().$getAuth() !== null) {
									console.log('Resolve!');
									deferred.resolve();
								} else {
									console.log('Reject!');
									$state.go('signin');
									deferred.reject();
								}
							}, 50);

							return deferred.promise;
						}
					}
				})
		}

})();