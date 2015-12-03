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


})();