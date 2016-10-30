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

})();