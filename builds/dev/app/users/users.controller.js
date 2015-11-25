(function(){
	'use strict';

	angular.module('kpStr.users', [
		'kpStr.usersFactory'
		])
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

		//factoryUsers.getUsers().then(_response){
		//	uc.users = _response;
		//}
	}

})();