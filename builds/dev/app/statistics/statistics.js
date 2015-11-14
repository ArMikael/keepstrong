/**
 * Created by michaeltreser on 11/14/15.
 */

;(function() {
    'use strict';

    angular.module('kpStr.stats', [
        'ngRoute'
    ])
        .controller('StatsCtrl', StatsController)
        .config(StatsConfig)
        .filter('toLowerCase', toLowerCase);

    /**
     * Stats Controller
     */

    // @ngInject
    function StatsController($rootScope, $http) {
        var s = this;

        $rootScope.currentPage = 'statistics';
        s.message = 'Statistics page!';

        $http.get('app/statistics/persons.json')
            .success(function(data) {
                s.persons = data;
                console.log(data);
            })

            .error(function (reason) {
                console.log(reason);
            });


    }


    // @ngInject
    function StatsConfig($routeProvider) {
        $routeProvider
            .when('/statistics', {
                controller: 'StatsCtrl',
                controllerAs: 'sc',
                templateUrl: 'app/statistics/statistics.html'
            });
    }

    // @ngInject
    function toLowerCase() {
        return function(text) {
            var filtered = text.toLocaleLowerCase();

            return filtered;
        }
    }



})();