(function(){
    "use strict";

    angular.module('kpStr.progress', [])
        .directive('kpstrProgress', kpstrProgress);


    // @ngInject
    function kpstrProgress() {
        var directive = {
            restrict: 'EAC',
            // scope: true,
            // scope: {}, // Isolated scope
            scope: { //
                max: '@'
            },
            link: link,
            // replace: true,
            templateUrl: 'app/progress/progress.html'
        };

        return directive;

        function link(scope, elem, attrs) {
            console.log("DIRECTIVE", scope, elem, attrs)
            scope.workout.type = "another";

            scope.max = 200;
            //console.log('value', attrs.val);
            //attrs.value = 60;

            //var parent = elem.parent();
            //console.log('parent', elem.parent());
            //console.log('HA', parent.find('p'));
            //console.log('val', parent.find('p').html());
            ////scope.exercisesCount = scope.max.split(',').length;
            ////scope.exercisesCount = 20;
            ////console.log('exs length', scope.exercisesCount.length);
            ////console.log('MAX: ', scope.exercisesCount);
            //
            //console.log('exerciseProgress directive link', attrs);


        }
    }

})();