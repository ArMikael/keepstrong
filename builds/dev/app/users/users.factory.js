(function(){
	'use strict';

	angular.module('kpStr.users')
		.factory('usersFactory', usersFactory);


	// @ngInject
	function usersFactory($q, $http, dbc, $firebaseArray, $firebaseObject) {
		var ref = dbc.getRef();
		var usersRef = ref.child('users');
		var users = null;

		var service = {
			getAllUsers: getAllUsers,
			getUser: getUser,
			saveUser: saveUser,
			deleteUser: deleteUser,
			createNewUser: createNewUser
		};


		function getAllUsers() {
			return $firebaseArray(ref).$loaded(function(_data){
				console.log('All Users from Firebase', _data);

				return _data;
			});
		}


		function getUser(id) {
			console.log('ID', id);
			return $firebaseArray(ref.child(id)).$loaded(function(_data){
				console.log('User from Firebase', _data);

				return _data;
			});
		}

		function saveUser(_user) {
			console.log('Saving user in factory');

			var user = $firebaseObject(ref.child(_user.id));
			user.name = _user.name;
			user.email = _user.email;
			return user.$save();
		}

		function deleteUser (_id) {
			return $firebaseObject(ref.child(_id)).$remove();
		}

		function createNewUser() {
			return $firebaseArray(ref).$add({
				name: '',
				email: '',
				registered: ''
			}).then(function(_ref){
				return $firebaseObject(_ref).$loaded();
			});
		}


			//var deferred = $q.defer();
			//return deferred.promise;

		return service;
	}
	
})();