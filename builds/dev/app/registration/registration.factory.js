(function(){
    'use strict';

    angular.module('kpStr.registration')
        .factory('regFactory', registrationFactory);


    // @ngInject
    function registrationFactory(dbc, $rootScope) {
        var auth = dbc.get$Auth();

        console.log('regFactory');

        var service = {
            signUp: signUp,
            signIn: signIn
        };


        auth.$onAuth(function(authData){

            if (authData) { // Logged in
                console.log('onAuth: Logged in!', authData);

                usersFactory.getUser(authData.uid).then(function(_user) {
                    $rootScope.currenUser = {
                        loggedIn: true,
                        fullname: _user.name
                    };
                });

            } else { // Logged out
                console.log('onAuth: Logged out!', authData);

                $rootScope.currenUser = {
                    loggedIn: false,
                    fullname: null
                };
            }
        });

        function signIn(_user) {
            return auth.$authWithPassword(_user);
        }


        function signUp(_user) {
            console.log('FACTORY-   SIGNUP')
            return auth.$createUser({
                email: _user.email,
                password: _user.password
            }).then(function(userData){
                console.log('User ' + userData.uid + ' created successfuly!');
                var userRef = dbc.getRef().child('users').child(userData.uid);

                userRef.set({
                    name: _user.name,
                    email: _user.email,
                    registered: Firebase.ServerValue.TIMESTAMP,
                    last_visit: Firebase.ServerValue.TIMESTAMP
                });

                return auth.$authWithPassword({
                    email: _user.email,
                    password: _user.password
                })
            });
        }

        return service;
    }

})();