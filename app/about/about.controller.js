var app;
(function (app) {
    var about;
    (function (about) {
        var controller;
        (function (controller) {
            var AboutController = (function () {
                function AboutController() {
                }
                AboutController.prototype.writeFeedback = function () {
                    console.log('feedback');
                };
                return AboutController;
            }());
            angular.module('kpStr.about')
                .controller('AboutCtrl', AboutController);
        })(controller = about.controller || (about.controller = {}));
    })(about = app.about || (app.about = {}));
})(app || (app = {}));
//# sourceMappingURL=about.controller.js.map