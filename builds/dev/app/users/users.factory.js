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
			getAllUsers: getAllUsers
		};


		function getAllUsers() {
			return $firebaseArray(ref).$loaded(function(_data){
				console.log('Data from Firebase', _data);

				return _data;
			});
		}

			// service.getAllUsers = function() {
			// 	return $firebaseArray(usersRef).$loaded(function(_data){
			// 		console.log('Data from Firebase', _data);

			// 		return _data;
			// 	});


			//var deferred = $q.defer();
			//return deferred.promise;

		return service;
	}
	
})();