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

		factoryUsers.getUsers().then(_response) {
			uc.users = _response;
		}
	}

})();