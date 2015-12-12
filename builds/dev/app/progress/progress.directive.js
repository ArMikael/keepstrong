(function(){
    "use strict";

    angular.module('kpStr.progress', [])
        .directive('kpstrProgress', kpstrProgress);


    // @ngInject
    function kpstrProgress() {
        var directive = {
            restrict: 'EAC',
            link: link,
            //replace: true,
            templateUrl: 'app/progress/progress.html'
        };

        return directive;

        function link(scope, elem, attrs) {
            console.log('exerciseProgress directive link', attrs);

            console.log('parent', elem.parent());
        }
    }

})();