(function(){
	'use strict';

	angular.module('kpStr.users', [
		'kpStr.usersFactory'
	])
		.controller('UsersCtrl', UsersController)

    /**
     * Users Controller
     */

	// @ngInject
	function UsersController($rootScope, usersFactory) {
		var uc = this;
		$rootScope.currentPage = 'users';

		uc.users = [];

		//factoryUsers.getUsers().then(_response){
		//	uc.users = _response;
		//}
	}

})();