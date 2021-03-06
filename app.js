;(function() {
    'use strict';

    angular.module('kpStr', [
            'ngAnimate',
            'ui.router',
            'ui.bootstrap',
            'kpStr.home',
            'kpStr.workouts',
            'kpStr.stats',
            'kpStr.users',
            'kpStr.exercises',
            'kpStr.registration',
            'kpStr.about',
            'kpStr.profile',
            'kpStr.progress'
    ])
        .constant('FURL', 'https://keepstrong.firebaseio.com/')
        .config(MainConfig)
        .run(MainRun)
        .controller('MainCtrl', MainController);


    // @ngInject
    function MainConfig($urlRouterProvider, $logProvider) {
        $logProvider.debugEnabled(true);

        $urlRouterProvider
            .otherwise('/');
    }
    MainConfig.$inject = ["$urlRouterProvider", "$logProvider"];


    // @ngInject
    function MainRun($log, $rootScope, $state, $stateParams, dbc) {
        $log.debug('MainRun');

        $rootScope.$on('$stateChangeStart',
            function(event, toState, toParams, fromState, fromParams){
                //console.log('toState:',toState, 'toParams:',toParams, 'fromState:',fromState, 'fromParams:',fromParams);
                if (toState.authenticate && !dbc.isLoggedIn()) {
                    $state.transitionTo('signin');
                    $rootScope.isLoggedIn = false;
                    event.preventDefault();
                } else if (!toState.authenticate && dbc.isLoggedIn()) {
                    $rootScope.isLoggedIn = true;
                    //event.preventDefault();
                }
            });

        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
    }
    MainRun.$inject = ["$log", "$rootScope", "$state", "$stateParams", "dbc"];


    // @ngInject
    function MainController($rootScope, $log) {
        var mc = this;

        $log.debug('MainCTRL');

        mc.message = 'Welcome to the KeepStrong App!';
    }
    MainController.$inject = ["$rootScope", "$log"];

})();
(function(){
    "use strict";

    angular.module('kpStr.about', [])
        .config(AboutConfig);

    // @ngInject
    function AboutConfig($stateProvider) {
        $stateProvider
            .state('about', {
                url: '/about',
                controller: 'AboutCtrl',
                controllerAs: 'ac',
                templateUrl: 'app/about/about.html',
                authenticate: false
            });

    }
    AboutConfig.$inject = ["$stateProvider"];

})();
(function(){
    "use strict";

    angular.module('kpStr.about')
        .controller('AboutCtrl', AboutController);

    // @ngInject
    function AboutController($scope, $rootScope, $interval) {
        console.log('AboutController');
        var ac = this;

        ac.usersCount = 9;

        $scope.$on('UsersBroadcast', function(event, msg){
            console.log('GetAllUsersBroadcast $on catch event in AboutCtrl: ', event, msg);
        });

        // Angular аналог setInterval(), который включает в себя встроенный $scope.$apply() для отслеживания изменений
        // и их передачи между View и Model.
        $interval(function () {
            ac.usersCount += 3;
        }, 1000);
    }
    AboutController.$inject = ["$scope", "$rootScope", "$interval"];

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

    angular.module('kpStr.exercises', [
        'kpStr.dbc'
    ])
        .config(ExercisesConfig);


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
    "use strict";

    angular.module('kpStr.exercises')
        .controller('ExercisesCtrl', ExercisesController);


    // @ngInject
    function ExercisesController($rootScope, exercises, $log) {
        var ec = this;
        $rootScope.currentPage = 'exercises';

        var counter = {};
        counter.count = 0;
        console.log(counter.count);

        exercises.getAllExercises().then(function(_response){
            $log.debug('response', _response)
            ec.exercises = _response;
        });


        ec.editExercise = function(_exercise) {
            $log.debug(_exercise);

            ec.editFormShow = true;
            ec.editableExercise = {
                id: _exercise.$id,
                title: _exercise.title,
                type: _exercise.type,
                count: _exercise.count
            }
        };

        ec.createExercise = function(_exercise) {
            $log.debug('creatingExercise CTRL', _exercise);
            exercises.createExercise(_exercise);
        };


        ec.saveExercise = function() {
            exercises.saveExercise(ec.editableExercise)
                .then(function(){
                    ec.cancelEditExercise();
                });
        };


        ec.cancelEditExercise = function() {
            ec.editFormShow = false;

            ec.editableExercise = {
                id: null,
                title: null,
                type: null,
                count: null
            };
        };


        ec.removeExercise = function(_exercise) {
            $log.debug('removeExercise', _exercise);
            exercises.deleteExercise(_exercise);
        };

        $log.debug('ExercisesController');

    }
    ExercisesController.$inject = ["$rootScope", "exercises", "$log"];

})();
(function(){
    "use strict";

    angular.module('kpStr.exercises')
        .component('counter', {
            bindings: {
                count: '='
            },
            controller: function () {
                function increment() {
                    this.count++;
                }
                function decrement() {
                    this.count--;
                }
                this.increment = increment;
                this.decrement = decrement;
            },
            template: [
                '<div class="todo">',
                '<input type="text" ng-model="counter.count">',
                '<button type="button" ng-click="counter.decrement();">-</button>',
                '<button type="button" ng-click="counter.increment();">+</button>',
                '</div>'
            ].join('')
        });
})();
(function(){
    "use strict";

    angular.module('kpStr.exercises')
        .factory('exercises', exercisesFactory);

    // @ngInject
    function exercisesFactory(dbc, $log, $firebaseArray, $firebaseObject) {
        $log.debug('exercisesFactory');

        var ref = dbc.getRef();
        var exercisesRef = ref.child('exercises');


        var exercises = {
            getAllExercises: getAllExercises,
            saveExercise: saveExercise,
            createExercise: createExercise,
            deleteExercise: deleteExercise
        };


        function getAllExercises() {
            return $firebaseArray(exercisesRef).$loaded(function(_data) {
                $log.debug('Getting exercises from firebase to factory', _data);
                return _data;
            });
        }


        function saveExercise(_exercises) {
            var exRef = $firebaseObject(exercisesRef.child(_exercises.id));

            return exRef.$loaded(function(_exercisesDB) {
                _exercisesDB.title = _exercise.title;
                _exercisesDB.type = _exercise.type;
                return exRef.$save();
            });
        }


        function createExercise(_exercise) {
            $log.debug('createExercise exercises: ',_exercise);
            return $firebaseArray(exercisesRef).$add({
                title: _exercise.title,
                type: _exercise.type
            }).then(function(_ref) {
                $log.debug(exercises);
                return $firebaseObject(_ref).$loaded();
            });
        }


        function deleteExercise(_exercise) {
            return $firebaseObject(exercisesRef.child(_exercise.id)).$remove();
        }


        return exercises;
    }
    exercisesFactory.$inject = ["dbc", "$log", "$firebaseArray", "$firebaseObject"];

})();
(function(){
    "use strict";

    angular.module('kpStr.home', [])
        .config(HomeConfig);

    // @ngInject
    function HomeConfig($stateProvider) {
        $stateProvider
            .state('home', {
                url: '/',
                controller: 'HomeCtrl',
                controllerAs: 'hc',
                templateUrl: 'app/home/home.html',
                authenticate: false

            })
    }
    HomeConfig.$inject = ["$stateProvider"];

})();
(function(){
    "use strict";
    
    angular.module('kpStr.home')
        .controller('HomeCtrl', HomeController);
    
    // @ngInject
    function HomeController() {
        var hc = this;

        console.log('HomeController');
    }
    
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
    "use strict";

    angular.module('kpStr.progress', [])
        .directive('kpstrProgress', kpstrProgress);


    // @ngInject
    function kpstrProgress() {
        var directive = {
            restrict: 'EAC',
            // scope: false, // Shared scope (default)
            // scope: true, // Inherited scope
            // scope: {}, // Isolated scope
            scope: { //
                max: '@'
            },
            link: link,
            // replace: true,
            templateUrl: 'app/progress/progress.html'
        };

        return directive;

        function link(scope, elem, attrs) {
            console.log("DIRECTIVE", scope, elem, attrs)
            scope.workout.type = "another";

            scope.max = 200;
            //console.log('value', attrs.val);
            //attrs.value = 60;

            //var parent = elem.parent();
            //console.log('parent', elem.parent());
            //console.log('HA', parent.find('p'));
            //console.log('val', parent.find('p').html());
            ////scope.exercisesCount = scope.max.split(',').length;
            ////scope.exercisesCount = 20;
            ////console.log('exs length', scope.exercisesCount.length);
            ////console.log('MAX: ', scope.exercisesCount);
            //
            //console.log('exerciseProgress directive link', attrs);


        }
    }

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
                    $state.transitionTo('workouts');
                });
        };


        rc.signinGoogle = function() {
            regFactory.signInGoogle()
                .then(function(){
                    console.log('Signed In with Google');
                    // For example after authorisation forward user to specific page with $location.path()
                    $state.transitionTo('workouts');
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
                    console.log("Authenticated successfully:", authData);
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
				.then(function() {
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

		//usersFactory.getUser(0).then(function(_response){
		//	console.log('getUser response', _response);
        //
		//	uc.user = _response;
		//})
	}
	UsersController.$inject = ["$rootScope", "usersFactory"];

})();
(function(){
	'use strict';

	angular.module('kpStr.users')
		.factory('usersFactory', usersFactory);


	// @ngInject
	function usersFactory($rootScope, dbc, $firebaseArray, $firebaseObject) {
		var ref = dbc.getRef();
		var usersRef = ref.child('users');

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
	usersFactory.$inject = ["$rootScope", "dbc", "$firebaseArray", "$firebaseObject"];
	
})();
(function(){
    "use strict";

    angular.module('kpStr.workouts', [
        'kpStr.dbc'
    ])
        .config(WorkoutsConfig);

    // @ngInject
    function WorkoutsConfig($stateProvider) {
        $stateProvider
            .state('workouts', {
                url: '/workouts',
                controller: 'WorkoutsCtrl',
                controllerAs: 'wc',
                templateUrl: 'app/workouts/workouts.html',
                authenticate: true
            })
    }
    WorkoutsConfig.$inject = ["$stateProvider"];


})();
(function(){
    "use strict";

    angular.module('kpStr.workouts')
        .controller('WorkoutsCtrl', WorkoutsController);

    // @ngInject
    function WorkoutsController($rootScope, $log, workouts) {
        var wc = this;

        workouts.getAllWorkouts().then(function(_response){
            console.log('response', _response)
            wc.workouts = _response;
        });


        wc.editWorkout = function(_workout) {
            console.log(_workout);

            wc.editFormShow = true;
            wc.editableWorkout = {
                id: _workout.$id,
                title: _workout.title,
                type: _workout.type,
                exercises: _workout.exercises
            }
        };

        wc.createWorkout = function(_workout) {
            console.log('wrkOUT', _workout);
            workouts.createWorkout(_workout);
        };


        wc.saveWorkout = function() {
            workouts.saveWorkout(wc.editableWorkout)
                .then(function(){
                     wc.cancelEditWorkout();
                });
        };


        wc.cancelEditWorkout = function() {
            wc.editFormShow = false;

            wc.editableWorkout = {
                id: null,
                title: null,
                type: null,
                exercises: null
            };
        };


        wc.removeWorkout = function(_workout) {
            console.log('removeWorkout', _workout);
            workouts.deleteWorkout(_workout);
        };

        $log.debug('WorkoutsController');

        //wc.workouts = workouts.getWorkouts();
    }
    WorkoutsController.$inject = ["$rootScope", "$log", "workouts"];

})();
(function(){
    "use strict";

    angular.module('kpStr.workouts')
        .factory('workouts', WorkoutsFactory);

    // @ngInject
    function WorkoutsFactory($rootScope, $log, $firebaseArray, $firebaseObject, dbc) {
        $log.debug('WorkoutsFactory');

        var ref = dbc.getRef();
        var workoutsRef = ref.child('workouts');
        
        console.log('ref', ref, workoutsRef);

        var service = {
            getAllWorkouts: getAllWorkouts,
            saveWorkout: saveWorkout,
            createWorkout: createWorkout,
            deleteWorkout: deleteWorkout
        };

        function getAllWorkouts() {
            return $firebaseArray(workoutsRef).$loaded(function(_data) {
                console.log('Getting workouts from firebase to factory', _data);
                return _data;
            });
        }


        function saveWorkout(_workout) {
            var wrkRef = $firebaseObject(workoutsRef.child(_workout.id));

            return wrkRef.$loaded(function(_workoutDB) {
                _workoutDB.title = _workout.title;
                _workoutDB.type = _workout.type;
                _workoutDB.exercises = _workout.exercises.split(',');
                return wrkRef.$save();
            });
        }


         function createWorkout(_workout) {
            console.log('createWorkout workout: ',_workout);
            return $firebaseArray(workoutsRef).$add({
                title: _workout.title,
                type: _workout.type,
                exercises: _workout.exercises.split(',')
            }).then(function(_ref) {
                console.log(exercises);
                return $firebaseObject(_ref).$loaded();
            });
        }


        function deleteWorkout(_workout) {
            return $firebaseObject(workoutsRef.child(_workout.id)).$remove();
        }


        return service;
    }
    WorkoutsFactory.$inject = ["$rootScope", "$log", "$firebaseArray", "$firebaseObject", "dbc"];

})();