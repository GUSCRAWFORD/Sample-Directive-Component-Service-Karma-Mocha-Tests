var ng = require('angular');

fooViewerDirectiveController.registeredName = 'fooViewerDirectiveController';
fooViewerDirectiveController.directiveName = 'fooViewer';
fooViewerDirectiveController.$inject = ['foo'];
function fooViewerDirectiveController (foo) {
    var vm = this;
    vm.getAllFoosForDirective = getAllFoosForDirective;
    init();

    // [!] The functions between the component and directive have not changed
    function getAllFoosForDirective () {
        vm.busy = true;
        return foo.query().$promise.then(function(foos){
            vm.busy = false;
            return foos;
        });
    }

    function init () {
        vm.getAllFoosForDirective().then(function (foos) {
            return vm.foos = foos;
        });
    }
}

ng
    .module('app')
    .controller(fooViewerDirectiveController.registeredName, fooViewerDirectiveController)
    .directive(fooViewerDirectiveController.directiveName, function () {
        return {
            template:require('./foo-viewer.partial.html'),
            restrict:'E',
            controller: 'fooViewerDirectiveController',
            controllerAs:'vm',
            bindToController:true,
            scope: {
                bar:'='
            }
        }
    });