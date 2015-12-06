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

})();