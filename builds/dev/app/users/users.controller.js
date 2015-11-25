(function(){
	'use strict';

	angular.module('kpStr.users')
		.controller('UsersCtrl', UsersController);

    /**
     * Users Controller
     */

	// @ngInject
	function UsersController($rootScope, usersFactory) {
		var uc = this;
		$rootScope.currentPage = 'users';

		console.log('$rootScope.currentPage', $rootScope.currentPage);

		uc.users = [];

		usersFactory.getAllUsers().then(function(_response){
			console.log('response', _response)
			uc.users = _response;
		});
	}

})();