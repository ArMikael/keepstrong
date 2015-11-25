(function () {
    'use strict';

    // Data Base Connection to Firebase
    angular.module('kpStr.dbc', [
        'firebase',
    ])
        .factory('dbc', dbcFactory)

    // @ngInject
    function dbcFactory(FURL) {
        var ref = new Firebase(FURL);

        var service = {
            getRef: getRef
        };

        // Return reference to the firebase db
        function getRef() {
            return ref;
        }

        // service.getRef = function(){
        //     return ref;
        // };

        return service;
    }

})();