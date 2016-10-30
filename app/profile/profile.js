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


    // @ngInject
    function ProfileController(usersFactory, $stateParams) {
        var pc = this;

        usersFactory.getUser($stateParams.uid)
            .then(function(_user){
                pc.profile = _user;
            });

    }

})();