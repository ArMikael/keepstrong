;(function() {
    'use strict';

    angular.module('kpStr', [
            'ui.router',
            'ui.bootstrap',
            'kpStr.stats',
            'kpStr.users',
            'kpStr.exercises',
            'kpStr.registration',
            'kpStr.profile'
    ])
        .constant('FURL', 'https://keepstrong.firebaseio.com/')
        .config(MainConfig)
        .run(MainRun)
        .controller('MainCtrl', MainController)
        .controller('AboutCtrl', AboutController);


    // @ngInject
    function MainConfig($urlRouterProvider, $stateProvider, $logProvider) {
        $logProvider.debugEnabled(true);

        $stateProvider
            .state('workout', {
                url: '/workout',
                controller: 'MainCtrl',
                controllerAs: 'mc',
                templateUrl: 'app/workout/workout.html',
                authenticate: true
            })

            .state('about', {
                url: '/about',
                controller: 'AboutCtrl',
                controllerAs: 'ac',
                templateUrl: 'app/about/about.html',
                authenticate: false
            });

        $urlRouterProvider
            .otherwise('/workout');
    }
    MainConfig.$inject = ["$urlRouterProvider", "$stateProvider", "$logProvider"];


    // @ngInject
    function MainRun($log, $rootScope, $state, $stateParams, dbc) {
        $log.debug('MainRun');


        $rootScope.$on('$stateChangeStart',
            function(event, toState, toParams, fromState, fromParams){
                console.log('StateChangeStart');
                console.log('isLoggedIn: ', dbc.isLoggedIn());

                if (toState.authenticate && !dbc.isLoggedIn()) {
                    $state.transitionTo('signin');
                    event.preventDefault();
                } else if (!toState.authenticate && dbc.isLoggedIn()) {
                    //$state.transitionTo('home');
                    //event.preventDefault();
                }

            });

        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
    }
    MainRun.$inject = ["$log", "$rootScope", "$state", "$stateParams", "dbc"];


    // @ngInject
    function MainController($scope, $rootScope, $log) {
        var s = this;

        $log.debug('MainCTRL');

        s.message = 'Welcome to the KeepStrong App!';
        s.run = 'Go fast, lets run';
    }
    MainController.$inject = ["$scope", "$rootScope", "$log"];


    // @ngInject
    function AboutController($rootScope, $interval) {
        var ac = this;

        ac.usersCount = 9;

        // Angular аналог setInterval(), который включает в себя встроенный $scope.$apply() для отслеживания изменений
        // и их передачи между View и Model.
        $interval(function () {
            ac.usersCount += 3;
        }, 1000);
    }
    AboutController.$inject = ["$rootScope", "$interval"];

})();
(function () {
    'use strict';

    // Data Base Connection to Firebase
    angular.module('kpStr.dbc', [
        'firebase'
    ])
        .factory('dbc', dbcFactory);

    // @ngInject
    function dbcFactory(FURL, $firebaseAuth) {
        var ref = new Firebase(FURL);
        var auth = $firebaseAuth(ref);

        var service = {
            getRef: getRef,
            getAuth: getAuth,
            get$Auth: get$Auth,
            isLoggedIn: isLoggedIn
        };


        // Return reference to the firebase db
        function getRef() {
            return ref;
        }

        // Native method from Firebase (faster then Angular-fire method)
        function getAuth() {
            return ref.getAuth();
        }

        // Method from Angular-Fire
        function get$Auth() {
            return auth;
        }

        // Checks if user is logged in. Returns true or false. Add variables to Local Storage.
        function isLoggedIn() {
            return auth.$getAuth();
        }

        // service.getRef = function(){
        //     return ref;
        // };

        return service;
    }
    dbcFactory.$inject = ["FURL", "$firebaseAuth"];

})();
(function() {
    'use strict';

    angular.module('kpStr.exercises', [])
        .config(ExercisesConfig)
        .controller('ExercisesCtrl', ExercisesController);


    // @ngInject
    function ExercisesController($rootScope) {
        var ec = this;

        $rootScope.currentPage = 'exercises';

        ec.message = "Let's start with some exercises!";
    }
    ExercisesController.$inject = ["$rootScope"];


    // @ngInject
    function ExercisesConfig($stateProvider) {
        $stateProvider
            .state('exercises', {
                    url: '/exercises',
                    controller: 'ExercisesCtrl',
                    controllerAs: 'ec',
                    templateUrl: 'app/exercises/exercises.html',
                    authenticate: false
                })

            .state('exercises.stretching', {
                url: '/stretching',
                templateUrl: 'app/exercises/exercises.stretching.html',
                authenticate: true
            })

            .state('exercises.endurance', {
                url: '/endurance',
                templateUrl: 'app/exercises/exercises.endurance.html',
                authenticate: true
            })

            .state('exercises.strength', {
                url: '/strength',
                templateUrl: 'app/exercises/exercises.strength.html',
                authenticate: true
            })
    }
    ExercisesConfig.$inject = ["$stateProvider"];

})();


(function(){
    'use strict';

    angular.module('kpStr.profile', [
        'kpStr.users'
    ])
        .config(ProfileConfig)
        .controller('ProfileCtrl', ProfileController);

    // @ngInject
    function ProfileConfig($stateProvider) {
        console.log('Profile Config');

        $stateProvider
            .state('profile', {
                url: '/profile/:uid',
                templateUrl: 'app/profile/profile.html',
                controller: 'ProfileCtrl',
                controllerAs: 'pc',
                authenticate: true
            })
    }
    ProfileConfig.$inject = ["$stateProvider"];


    // @ngInject
    function ProfileController(usersFactory, $stateParams) {
        var pc = this;

        usersFactory.getUser($stateParams.uid)
            .then(function(_user){
                pc.profile = _user;
            });

    }
    ProfileController.$inject = ["usersFactory", "$stateParams"];

})();
(function(){
    'use strict';

    angular.module('kpStr.registration', [
        'kpStr.dbc'
    ])
        .config(registrationConfig);



    // @ngInject
    function registrationConfig($stateProvider) {
        $stateProvider
            .state('signin', {
                url: '/signin',
                controller: 'RegCtrl',
                controllerAs: 'rc',
                templateUrl: 'app/registration/signin.html',
                authenticate: false
            })

            .state('registration', {
                url: '/registration',
                controller: 'RegCtrl',
                controllerAs: 'rc',
                templateUrl: 'app/registration/registration.html',
                authenticate: false
            })
    }
    registrationConfig.$inject = ["$stateProvider"];

})();



(function(){
    'use strict';

    angular.module('kpStr.registration')
        .controller('RegCtrl', RegistrationController);


    // @ngInject
    function RegistrationController(regFactory, $state) {
        console.log('controller reg');

        var rc = this;

        rc.signinUser = {
            email: null,
            password: null
        };

        rc.signin = function() {
            regFactory.signIn(rc.signinUser)
                .then(function(){
                    // For example after authorisation forward user to specific page with $location.path()
                    $state.transitionTo('workout');
                });
        };


        rc.signinGoogle = function() {
            regFactory.signInGoogle()
                .then(function(){
                    console.log('Signed In with Google');
                    // For example after authorisation forward user to specific page with $location.path()
                    $state.transitionTo('workout');
                });
        };


        rc.regUser = {
            email: null,
            password: null,
            name: null
        };

        rc.signup = function() {
            console.log('signup');
            regFactory.signUp(rc.regUser)
                .then(function(){

                });
        };
    }
    RegistrationController.$inject = ["regFactory", "$state"];


})();
(function(){
    'use strict';

    angular.module('kpStr.registration')
        .factory('regFactory', registrationFactory);


    // @ngInject
    function registrationFactory(dbc, $rootScope, usersFactory, $firebaseObject) {
        var auth = dbc.get$Auth();

        console.log('regFactory');

        var service = {
            signIn: signIn,
            signInGoogle: signInGoogle,
            signUp: signUp
        };


        $rootScope.logOut = function() {
            auth.$unauth();
        };


        auth.$onAuth(function(authData){
            if (authData) { // Logged in
                console.log('onAuth: Logged in!', authData);

                usersFactory.getUser(authData.uid)
                    .then(function(_user) {
                        console.log('_USER: ', _user);

                        $rootScope.currentUser = {
                            uid: authData.uid,
                            loggedIn: true,
                            fullname: _user.name
                        };

                        _user.$watch(function(){
                            $rootScope.currentUser = {
                                uid: authData.uid,
                                loggedIn: true,
                                fullname: _user.name
                            };
                        });

                    });

            } else { // Logged out
                console.log('onAuth: Logged out!', authData);

                $rootScope.currentUser = {
                    uid: null,
                    loggedIn: false,
                    fullname: null
                };
            }
        });

        function signIn(_user) {
            return auth.$authWithPassword(_user);
        }


        function signInGoogle () {
            return auth.$authWithOAuthPopup("google", function(error, authData) {
                if (error) {
                    console.log("Login Failed!", error);
                } else {
                    console.log("Authenticated successfully with payload:", authData);
                    var userRef = dbc.getRef().child('users').child(authData.uid);
                    var userObj = $firebaseObject(userRef);
                    userObj.$loaded(function(_data) {
                        console.log('User object from firebase for Google UID', _data);

                        if (_data.registered) {
                            userObj.last_visit = Firebase.ServerValue.TIMESTAMP;
                        } else {
                            userObj.name = authData.google.cachedUserProfile.given_name || '';
                            userObj.surname = authData.google.cachedUserProfile.family_name || '';
                            userObj.google_id = authData.google.id;
                            userObj.registered = userObj.registered ? userObj.registered : Firebase.ServerValue.TIMESTAMP;
                        }

                        userObj.save();
                    });
                }
            });
        }


        function signUp(_user) {
            console.log('registrationFactory.signUp');

            return auth.$createUser({
                email: _user.email,
                password: _user.password
            })
                .then(function(userData){
                console.log('User ' + userData.uid + ' created successfully!');
                var userRef = dbc.getRef().child('users').child(userData.uid);

                    console.log('promise from dbc', userData);

                // set() method will redefine object from the reference
                userRef.set({
                    name: _user.name,
                    email: _user.email,
                    registered: Firebase.ServerValue.TIMESTAMP,
                    last_visit: Firebase.ServerValue.TIMESTAMP
                });

                return auth.$authWithPassword({
                    email: _user.email,
                    password: _user.password
                });
            })
                .catch(function(_status){
                    console.log('CreateUser response status: ', _status);
                });
        }

        return service;
    }
    registrationFactory.$inject = ["dbc", "$rootScope", "usersFactory", "$firebaseObject"];

})();
/**
 * Created by michaeltreser on 11/14/15.
 */

;(function() {
    'use strict';

    angular.module('kpStr.stats', [])
        .config(StatsConfig)
        .factory('StatsFactory', StatsFactory)
        .controller('StatsCtrl', StatsController)
        .filter('toLowerCase', toLowerCase);
        //.filter('timeFromNow', timeFromNow);


    function StatsFactory($http) {
        var dataFactory = {};

        console.log('factory');
        dataFactory.getData = function(url) {
            return $http.get(url);
        };

        return dataFactory;
    }
    StatsFactory.$inject = ["$http"];


    //function StatsFactory($http) {
    //    var dataFactory = {
    //        data: {}
    //    };
    //
    //    dataFactory.getData = function() {
    //        return $http.get('app/statistics/persons.json')
    //            .then(function(response) {
    //                console.log('Factory data: ', response.data);
    //                dataFactory.data = response.data;
    //            });
    //    };
    //
    //    return dataFactory;
    //
    //}


    /**
     * Stats Controller
     */

    // @ngInject
    function StatsController($rootScope, StatsFactory) {
        var sc = this;

        $rootScope.currentPage = 'statistics';
        sc.message = 'Statistics page!';

        //StatsFactory.getData();
        //console.log('dada', StatsFactory.data);
        //sc.persons = StatsFactory.data;

        //sc.persons = StatsFactory.getData();

        StatsFactory.getData('app/statistics/persons.json')
            .then(function(response) {
                console.log(response.data);
                sc.persons = response.data;
        });

        console.log('sc.persons', sc.persons);
    }
    StatsController.$inject = ["$rootScope", "StatsFactory"];


    // @ngInject
    function StatsConfig($stateProvider) {
        $stateProvider
            .state('statistics', {
                url: '/statistics',
                controller: 'StatsCtrl',
                controllerAs: 'sc',
                templateUrl: 'app/statistics/statistics.html'
            });
    }
    StatsConfig.$inject = ["$stateProvider"];



    /* Custom Filters */

    // @ngInject
    function toLowerCase() {
        return function(text) {
            var filtered = text.toLowerCase();

            return filtered;
        }
    }


    // @ngInject
    function timeFromNow() {
        return function(date) {
            var currentTime = Date.now(),
                timeDiff = currentTime - Date.parse(date),
                filteredDate;

            // Time variables
            var seconds = Math.round(timeDiff) / 1000,
                minutes = Math.round(seconds) / 60,
                hours = Math.round(minutes) / 60,
                days = Math.round(hours) / 24,
                months = Math.round(days) / 30,
                years = Math.round(days) / 365;

            console.log('registered', date);
            console.log('currentTime', currentTime);
            console.log('timeDiff', timeDiff);

            var timeStrings = {
                seconds: 'Less Than a Minute Ago',
                minute: 'About a Minute Ago',
                minutes: ' Minutes Ago',
                hour: 'About an Hour Ago',
                hours: ' Hours Ago',
                day: ' a Day Ago',
                days: ' Days Ago',
                month: ' About a Month Ago',
                months: ' Months Ago',
                year: ' About a Year Ago',
                years: ' Years Ago'
            };


            //filteredDate = timeStrings.seconds ||
            //    minutes == 1 ? timeStrings.minute : timeStrings.seconds ||
            //    minutes > 1 ? minutes + timeStrings.minutes : timeStrings.minute ||
            //    hours == 1 ? timeStrings.hour : minutes + timeStrings.minutes ||
            //    hours > 1 ? hours + timeStrings.hours : timeStrings.hour ||
            //    days == 1 ? timeStrings.day : hours + timeStrings.hours ||
            //    days > 1 ? days + timeStrings.days : timeStrings.day ||
            //    months == 1 ? timeStrings.month : days + timeStrings.days ||
            //    months > 1 ? months + timeStrings.months : timeStrings.month;

            filteredDate =
                months > 1 ? months + timeStrings.months : timeStrings.month ||
                months == 1 ? timeStrings.month : days + timeStrings.days ||
                days > 1 ? days + timeStrings.days : timeStrings.day ||
                days == 1 ? timeStrings.day : hours + timeStrings.hours ||
                hours > 1 ? hours + timeStrings.hours : timeStrings.hour ||
                hours == 1 ? timeStrings.hour : minutes + timeStrings.minutes ||
                minutes > 1 ? minutes + timeStrings.minutes : timeStrings.minute ||
                minutes == 1 ? timeStrings.minute : timeStrings.seconds ||
                timeStrings.seconds;

            return filteredDate;
        }
    }


})();
;(function(){
	'use strict';

	angular.module('kpStr.users', [
				'kpStr.dbc'
			])
		.config(usersConfig);

		console.log('.users');

		// @ngInject
		function usersConfig($stateProvider) {
			console.log('kpStr.users');

			$stateProvider
				.state('users', {
					url: '/users',
					controller: 'UsersCtrl',
					controllerAs: 'uc',
					templateUrl: 'app/users/users.html',
					authenticate: false,
					resolve: {
						auth: /* @ngInject */ ["dbc", "$q", "$state", function(dbc, $q, $state) {
							var deferred = $q.defer();
							setTimeout(function(){
								console.log('Resolve auth.', dbc.get$Auth().$getAuth());
								if (dbc.get$Auth().$getAuth() !== null) {
									console.log('Resolve!');
									deferred.resolve();
								} else {
									console.log('Reject!');
									$state.go('signin');
									deferred.reject();
								}
							}, 50);

							return deferred.promise;
						}]
					}
				})
		}
		usersConfig.$inject = ["$stateProvider"];

})();
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
					uc.cancelEditUser();
				});
		};

		uc.removeUser = function() {
			usersFactory.deleteUser(uc.editableUser.id)
				.then(function(){
					uc.cancelEditUser();
				});
		};

		uc.cancelEditUser = function() {
			uc.editFormShow = false;

			uc.editableUser = {
				id: null,
				name: null,
				email: null
			};
		};

		uc.createUser = function() {
			usersFactory.createNewUser()
				.then(function(_d){
					uc.editUser(_d);
				});
		};

		uc.cancelEditUser();
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
	UsersController.$inject = ["$rootScope", "usersFactory"];

})();
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
			return $firebaseArray(usersRef).$loaded(function(_data){
				console.log('All Users from Firebase', _data);

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
	usersFactory.$inject = ["$q", "$http", "dbc", "$firebaseArray", "$firebaseObject"];
	
})();