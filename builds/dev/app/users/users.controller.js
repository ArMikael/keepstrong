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

		uc.editUser = function(_user) {
			console.log(_user);
			uc.editFormShow = true;
			uc.editableUser = {
				id: _user.$id,
				name: _user.name,
				email: _user.email
			}
		};

		uc.saveUser = function() {
			usersFactory.saveUser(uc.editableUser)
				.then(function () {
					uc.editFormShow = false;

					uc.editableUser = {
						id: null,
						name: null,
						email: null
					};
				});
		};

		uc.editableUser = {
			id: null,
			name: null,
			email: null
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