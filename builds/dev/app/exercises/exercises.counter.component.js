(function(){
    "use strict";

    angular.module('kpStr.exercises')
        .component('counter', {
            bindings: {
                count: '='
            },
            controller: function () {
                function increment() {
                    this.count++;
                }
                function decrement() {
                    this.count--;
                }
                this.increment = increment;
                this.decrement = decrement;
            },
            template: [
                '<div class="todo">',
                '<input type="text" ng-model="counter.count">',
                '<button type="button" ng-click="counter.decrement();">-</button>',
                '<button type="button" ng-click="counter.increment();">+</button>',
                '</div>'
            ].join('')
        });
})();