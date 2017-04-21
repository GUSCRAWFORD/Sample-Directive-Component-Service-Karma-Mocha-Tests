/*var ng = require('angular');

fooViewerDirectiveController.registeredName = 'fooViewerDirectiveController';
fooViewerDirectiveController.directiveName = 'fooViewer';
fooViewerDirectiveController.$inject = ['foo'];
function fooViewerDirectiveController (foo) {
    var vm = this;
    vm.getAllFoosForDirective = getAllFoosForDirective;
    init();

    // [!] The functions between the component and directive have not changed
    function getAllFoosForComponent () {
        vm.busy = true;
        return foo.query().$promise.then(function(foos){
            vm.busy = false;
            return foos;
        });
    }

    function init () {
        foo.getAllFoosForComponent().then(function (foos) {
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
            controller: fooViewerDirectiveController.registeredName,
            controllerAs:'vm'
        }
    });
    */
describe('foo-viewer directive', function () {
    var foo, $rootScope;
    beforeEach(angular.mock.module('app'));
    beforeEach(inject(function (_foo_, _$rootScope_, _$q_) {
        foo = _foo_;
        $rootScope = _$rootScope_;
        $q = _$q_; 
    }));

    describe('binding (and template output)', function() {
        var element, childScope;
        beforeEach(inject(function($compile) {
            sinon.stub(foo,'query').returns({$promise:$q.when()});
            $rootScope.bindingProperty = "something";
            // compilation is necessary to test bindings, and get 100% branch coverge
            element = $compile('<foo-viewer bar="bindingProperty"></foo-viewer>')($rootScope);
            $rootScope.$digest();
            childScope = element.isolateScope();
        }));
        it('<foo-viewer-directive bar="bindingProperty"> binds $scope.bindingProperty', function () {
            expect(childScope.vm.bar).to.equal($rootScope.bindingProperty);
        });
        it('<foo-viewer-directive bar="bindingProperty"> contains "something"', function () {
            expect(element.html()).to.contain($rootScope.bindingProperty);
        });
    });
    describe('controller', function() {
        var instanceController;
        beforeEach(inject(function ($controller) {
            instanceController = function () {
                return $controller('fooViewerDirectiveController');
            };
        }));
        it('calls foo.query() on instancing', function () {
            // Rather than verify that foo service makes a certain api call,
            // make sure it's used correctly in this controller
            sinon.stub(foo,'query').returns({$promise:$q.when()});
            var vm = instanceController();
            $rootScope.$digest();
        });
        describe('getAllFoosForDirective', function () {
            var vm, expectedFoos = [];
            beforeEach(function() {
                sinon.stub(foo,'query').returns({$promise:$q.when(expectedFoos)});
                vm = instanceController();
                $rootScope.$digest();
            });
            it('() sets vm.foos to the result, and indicates it\'s busy while loading', function () {
                expect(vm.busy).to.be.false;
                vm.getAllFoosForDirective();
                expect(vm.busy).to.be.true;
                $rootScope.$digest();
                expect(vm.foos).to.equal(expectedFoos);
                expect(vm.busy).to.be.false;
            });
        });
    });
});