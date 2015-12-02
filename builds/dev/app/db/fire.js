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

})();