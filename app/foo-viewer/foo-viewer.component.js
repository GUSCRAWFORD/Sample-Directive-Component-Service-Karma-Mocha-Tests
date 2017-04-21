var ng = require('angular');

fooViewerComponentController.registeredName = 'fooViewerComponentController';
fooViewerComponentController.componentName = 'fooViewerComponent';
fooViewerComponentController.$inject = ['foo'];
function fooViewerComponentController (foo) {
    var vm = this;
    vm.getAllFoosForComponent = getAllFoosForComponent;
    vm.$onInit = init;
    vm.busy = false;

    function getAllFoosForComponent () {
        vm.busy = true;
        return foo.query().$promise.then(function(foos){
            vm.busy = false;
            return foos;
        });
    }

    function init () {
        vm.getAllFoosForComponent().then(function (foos) {
            return vm.foos = foos;
        });
    }
}

ng
    .module('app')
    .component(fooViewerComponentController.componentName, {
            template:require('./foo-viewer.partial.html'), 
            controller: fooViewerComponentController,
            controllerAs:'vm',
            bindings:{
                bar:'='
            }
        });