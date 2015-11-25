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

		uc.editFormShow = false;

		uc.editUser = function() {
			uc.editFormShow = true;
		};

		uc.saveUser = function() {

		};

		uc.editableUser = {
			name: null,
			surname: null
		};



		uc.users = [];

		usersFactory.getAllUsers().then(function(_response){
			console.log('response', _response)
			uc.users = _response;
		});

		usersFactory.getUser(2).then(function(_response){
			console.log('getUser response', _response);

			uc.user = _response;
		})
	}

})();