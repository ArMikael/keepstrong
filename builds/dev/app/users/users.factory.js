(function(){
	'use strict';

	angular.module('kpStr.users')
		.factory('usersFactory', usersFactory);


	// @ngInject
	function usersFactory($rootScope, dbc, $firebaseArray, $firebaseObject) {
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

		$rootScope.$broadcast('UsersBroadcast', {msg: "Entered to the Users.Factory"});


		function getAllUsers() {
			return $firebaseArray(usersRef).$loaded(function(_data){
				console.log('Got all Users from Firebase');

				return _data;
			});
		}


		//function getUser(id) {
		//	console.log('ID', id);
		//	return $firebaseArray(ref.child(id)).$loaded(function(_data){
		//		console.log('User from Firebase', _data);
        //
		//		return _data;
		//	});
		//}

		function getUser(id) {
			console.log('ID', id);
			return $firebaseObject(usersRef.child(id)).$loaded(function(_data){
				console.log('User from Firebase', _data);

				$rootScope.$broadcast('UsersBroadcast', {msg: "Got specific user!"});

				return _data;
			});
		}

		function saveUser(_user) {
			console.log('Saving user in factory');

			var user = $firebaseObject(usersRef.child(_user.id));
			return user.$loaded(function(_dbuser){
				_dbuser.name = _user.name;
				_dbuser.email = _user.email;
				return _dbuser.$save();
			});
		}

		function deleteUser (_id) {
			return $firebaseObject(usersRef.child(_id)).$remove();
		}

		function createNewUser() {
			return $firebaseArray(usersRef).$add({
				name: '',
				email: '',
				registered: Firebase.ServerValue.TIMESTAMP,
				last_visit: Firebase.ServerValue.TIMESTAMP
			}).then(function(usersRef){
				return $firebaseObject(usersRef).$loaded();
			});
		}


			//var deferred = $q.defer();
			//return deferred.promise;

		return service;
	}
	
})();