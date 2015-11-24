(function(){
	'use strict';

	angular.module('kpStr.usersFactory', [
		'kpStr.dbc'
	])
		.factory('usersFactory', usersFactory)


	// @ngInject
	function usersFactory($q, $http, dbc, $firebaseArray, $firebaseObject) {
		var obj = {};
		var ref = dbc.getRef();
		var usersRef = ref.child('users');

		var users = null;

		obj.getAllUsers = function() {
			return $firebaseArray(usersRef).$loaded(function(_data){
				console.log('Data from Firebase', _data);

				return _data;
			});




			//var deferred = $q.defer();
			//return deferred.promise;
		};

		return obj;
	}
	
})();