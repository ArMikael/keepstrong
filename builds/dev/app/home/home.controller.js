(function(){
    "use strict";
    
    angular.module('kpStr.home')
        .controller('HomeCtrl', HomeController);
    
    // @ngInject
    function HomeController() {
        var hc = this;

        console.log('HomeController');
    }
    
})();