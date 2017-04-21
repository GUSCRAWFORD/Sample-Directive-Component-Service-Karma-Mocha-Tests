
//[!] They're so similar, I pasted the spec
describe('foo-viewer-component component', function () {
    var foo, $rootScope;
    beforeEach(angular.mock.module('app'));
    beforeEach(inject(function (_foo_, _$rootScope_, _$q_) {
        foo = _foo_;
        $rootScope = _$rootScope_;
        $q = _$q_; 
    }));
    //[!] This is purely to verify template compliation now
    describe.skip('template output', function() {
        var element, childScope;
        beforeEach(inject(function($compile) {
            $rootScope.bindingProperty = "something";
            // compiling *will* fire .$onInit
            sinon.stub(foo,'query').returns({$promise:$q.when()});
            element = $compile('<foo-viewer-component bar="bindingProperty"></foo-viewer-component>')($rootScope);
            $rootScope.$digest();
            childScope = element.isolateScope();
        }));
        //[!] Test no longer necessary, see below where we test bindings
        it('<foo-viewer-component bar="bindingProperty"> binds $scope.bindingProperty', function () {
            expect(childScope.vm.bar).to.equal($rootScope.bindingProperty);
        });
        it('<foo-viewer-component bar="bindingProperty"> contains "something"', function () {
            expect(element.html()).to.contain($rootScope.bindingProperty);
        });
    });

    describe('controller', function() {
        var instanceController, expectedBarBinding="something";
        //[!] Component Controller
        beforeEach(inject(function ($componentController) {
            instanceController = function () {
                return $componentController('fooViewerComponent', null,{
                    bar:expectedBarBinding
                });
            };
        }));
        it('binds to bar', function () {
            var vm = instanceController();
            expect(vm.bar).to.equal(expectedBarBinding);
        })
        it('calls foo.query() on instancing', function () {
            // Rather than verify that foo service makes a certain api call,
            // make sure it's used correctly in this controller
            sinon.stub(foo,'query').returns({$promise:$q.when()});
            var vm = instanceController();
            vm.$onInit(); //  You invoke the life-cycle hooks
            $rootScope.$digest();
        });
        describe('$onInit', function () {
            var vm, expectedFoos = [];
            beforeEach(function() {
                vm = instanceController();
            });
            it('() sets foos to the foo result', function () {
                expect(vm.busy).to.be.false;
                sinon.stub(foo,'query').returns({$promise:$q.when(expectedFoos)});
                vm.$onInit();
                $rootScope.$digest();
                expect(vm.foos).to.equal(expectedFoos);
            });
        });
        describe('getAllFoosForComponent', function () {
            var vm, expectedFoos = [];
            beforeEach(function() {
                vm = instanceController();
            });
            it('() indicates it\'s busy while loading', function () {
                expect(vm.busy).to.be.false;
                sinon.stub(foo,'query').returns({$promise:$q.when(expectedFoos)});
                vm.getAllFoosForComponent();
                expect(vm.busy).to.be.true;
                $rootScope.$digest();
                expect(vm.busy).to.be.false;
            });
        });
    });
});