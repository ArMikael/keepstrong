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
        .filter('toLowerCase', toLowerCase)
        .filter('timeFromNow', timeFromNow);


    function StatsFactory($http) {
        var dataFactory = {};

        console.log('factory');
        dataFactory.getData = function(url) {
            return $http.get(url);
        };

        return dataFactory;
    }


    //function StatsFactory($http) {
    //    var dataFactory = {
    //        data: {}
    //    };
    //
    //    dataFactory.getData = function() {
    //        return $http.get('app/statistics/persons.json')
    //            .then(function(response) {
    //                console.log('Factory data: ', response.data);
    //                dataFactory.data = response.data;
    //            });
    //    };
    //
    //    return dataFactory;
    //
    //}


    /**
     * Stats Controller
     */

    // @ngInject
    function StatsController($rootScope, StatsFactory) {
        var sc = this;

        $rootScope.currentPage = 'statistics';
        sc.message = 'Statistics page!';

        //StatsFactory.getData();
        //console.log('dada', StatsFactory.data);
        //sc.persons = StatsFactory.data;

        //sc.persons = StatsFactory.getData();

        StatsFactory.getData('app/statistics/persons.json')
            .then(function(response) {
                console.log(response.data);
                sc.persons = response.data;
        });

        console.log('sc.persons', sc.persons);
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



    /* Custom Filters */

    // @ngInject
    function toLowerCase() {
        return function(text) {
            var filtered = text.toLowerCase();

            return filtered;
        }
    }


    // @ngInject
    function timeFromNow() {
        return function(date) {
            var currentTime = Date.now(),
                timeDiff = currentTime - Date.parse(date),
                filteredDate;

            // Time variables
            var seconds = Math.round(timeDiff) / 1000,
                minutes = Math.round(seconds) / 60,
                hours = Math.round(minutes) / 60,
                days = Math.round(hours) / 24,
                months = Math.round(days) / 30,
                years = Math.round(days) / 365;

            console.log('registered', date);
            console.log('currentTime', currentTime);
            console.log('timeDiff', timeDiff);

            var timeStrings = {
                seconds: 'Less Than a Minute Ago',
                minute: 'About a Minute Ago',
                minutes: ' Minutes Ago',
                hour: 'About an Hour Ago',
                hours: ' Hours Ago',
                day: ' a Day Ago',
                days: ' Days Ago',
                month: ' About a Month Ago',
                months: ' Months Ago',
                year: ' About a Year Ago',
                years: ' Years Ago'
            };


            //filteredDate = timeStrings.seconds ||
            //    minutes == 1 ? timeStrings.minute : timeStrings.seconds ||
            //    minutes > 1 ? minutes + timeStrings.minutes : timeStrings.minute ||
            //    hours == 1 ? timeStrings.hour : minutes + timeStrings.minutes ||
            //    hours > 1 ? hours + timeStrings.hours : timeStrings.hour ||
            //    days == 1 ? timeStrings.day : hours + timeStrings.hours ||
            //    days > 1 ? days + timeStrings.days : timeStrings.day ||
            //    months == 1 ? timeStrings.month : days + timeStrings.days ||
            //    months > 1 ? months + timeStrings.months : timeStrings.month;

            filteredDate =
                months > 1 ? months + timeStrings.months : timeStrings.month ||
                months == 1 ? timeStrings.month : days + timeStrings.days ||
                days > 1 ? days + timeStrings.days : timeStrings.day ||
                days == 1 ? timeStrings.day : hours + timeStrings.hours ||
                hours > 1 ? hours + timeStrings.hours : timeStrings.hour ||
                hours == 1 ? timeStrings.hour : minutes + timeStrings.minutes ||
                minutes > 1 ? minutes + timeStrings.minutes : timeStrings.minute ||
                minutes == 1 ? timeStrings.minute : timeStrings.seconds ||
                timeStrings.seconds;

            return filteredDate;
        }
    }


})();