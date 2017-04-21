var ng = require('angular');

fooViewerDirectiveController.registeredName = 'fooViewerDirectiveController';
fooViewerDirectiveController.directiveName = 'fooViewer';
fooViewerDirectiveController.$inject = ['foo'];
function fooViewerDirectiveController (foo) {
    var vm = this;
    vm.getAllFoosForDirective = getAllFoosForDirective;
    init();

    function getAllFoosForDirective () {
        return foo.query().$promise;
    }

    function init () {
        foo.getAllFoosForDirective();
    }
}

ng
    .module('app')
    .controller(fooViewerDirectiveController.registeredName, fooViewerDirectiveController)
    .directive(fooViewerDirectiveController.directiveName, function () {
        return {
            template:require('./foo-viewer.partial.html'),
            restrict:'E',
            controller: fooViewerDirectiveController.registeredName,
            controllerAs:'vm'
        }
    });