(function(){
    'use strict';

    angular.module('kpStr.registration')
        .controller('RegCtrl', RegistrationController);


    // @ngInject
    function RegistrationController(regFactory) {
        console.log('controller reg');

        var rc = this;

        rc.signinUser = {
            email: null,
            password: null
        };

        rc.signin = function() {
            regFactory.signIn(s.signinUser)
                .then(function(){

                });
        };

        rc.signupUser = {
            email: null,
            password: null,
            name: null
        };

        rc.signup = function() {
            console.log('signup');
            regFactory.signUp(s.signupUser)
                .then(function(){

                });
        };
    }


})();