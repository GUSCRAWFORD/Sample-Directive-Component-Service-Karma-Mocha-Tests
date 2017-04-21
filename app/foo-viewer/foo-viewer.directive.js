var ng = require('angular');

fooViewerDirectiveController.registeredName = 'fooViewerDirectiveController';
fooViewerDirectiveController.directiveName = 'fooViewer';
fooViewerDirectiveController.$inject = ['foo'];
function fooViewerDirectiveController (foo) {

}

ng
    .module('app')
    .directive(fooViewerDirectiveController.directiveName, function () {
        return {
            template:require('./foo-viewer.partial.html'),
            restrict:'E',
            controller: fooViewerDirectiveController.registeredName
        }
    })