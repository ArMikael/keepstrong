(function () {
    'use strict';

    // Data Base Connection to Firebase
    angular.module('kpStr.dbc', [
        'firebase',
    ])
        .factory('dbc', dbcFactory)

    // @ngInject
    function dbcFactory(FURL) {
        var obj = {};
        var ref = new Firebase(FURL);

        obj.getRef = function(){
            return ref;
        };

        return obj;
    }

})();