(function(){
    "use strict";

    angular.module('kpStr.about')
        .controller('AboutCtrl', AboutController);

    // @ngInject
    function AboutController($scope, $rootScope, $interval) {
        console.log('AboutController');
        var ac = this;

        ac.usersCount = 9;

        $scope.$on('UsersBroadcast', function(event, msg){
            console.log('GetAllUsersBroadcast $on catch event in AboutCtrl: ', event, msg);
        });

        // Angular аналог setInterval(), который включает в себя встроенный $scope.$apply() для отслеживания изменений
        // и их передачи между View и Model.
        $interval(function () {
            ac.usersCount += 3;
        }, 1000);
    }

})();