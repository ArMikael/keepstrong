/**
 * Created by michaeltreser on 11/14/15.
 */

;(function() {
    'use strict';

    angular.module('kpStr.stats', [
        'ngRoute'
    ])
        .config(StatsConfig)
        .factory('StatsFactory', StatsFactory)
        .controller('StatsCtrl', StatsController)
        .filter('toLowerCase', toLowerCase);


    //function StatsFactory($http) {
    //    var dataFactory = {};
    //
    //    dataFactory.getData = function() {
    //        return $http.get('app/statistics/persons.json');
    //    }
    //
    //    return dataFactory;
    //}
    //

    function StatsFactory($http) {
        var dataFactory = {};

        dataFactory.getData = function() {
            $http.get('app/statistics/persons.json')
                .success(function(data) {
                    return data;
            });
        }

        return dataFactory;

    }



    /**
     * Stats Controller
     */

    // @ngInject
    function StatsController($rootScope, StatsFactory) {
        var sc = this;

        $rootScope.currentPage = 'statistics';
        sc.message = 'Statistics page!';

        //sc.persons = StatsFactory;

        sc.persons = StatsFactory.getData();

        console.log(sc.persons);


        //StatsFactory.getData()
        //    .success(function(data){
        //        sc.persons = data;
        //    })
        //    .error(function (error) {
        //        sc.status = 'Unable to load customer data: ' + error.message;
        //    });
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



    /* Custom Filter */

    // @ngInject
    function toLowerCase() {
        return function(text) {
            var filtered = text.toLowerCase();

            return filtered;
        }
    }

})();