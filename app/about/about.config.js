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

})();