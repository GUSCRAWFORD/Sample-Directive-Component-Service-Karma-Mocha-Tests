var ng = require('angular');

fooViewerComponentController.registeredName = 'fooViewerComponentController';
fooViewerComponentController.componentName = 'fooViewerComponent';
fooViewerComponentController.$inject = ['foo'];
function fooViewerComponentController (foo) {
    var vm = this;
    ctrl.getAllFoosForComponent = getAllFoosForComponent;
    ctrl.$onInit = init;

    function getAllFoosForComponent () {
        return foo.query().$promise;
    }

    function init () {
        foo.getAllFoosForComponent();
    }
}

ng
    .module('app')
    .component(fooViewerComponentController.componentName, {
            template:require('./foo-viewer.partial.html'), 
            controller: fooViewerComponentController,
            controllerAs:'vm'
        });