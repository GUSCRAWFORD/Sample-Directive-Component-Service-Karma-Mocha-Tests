/*
var ng = require('angular');
Foo.$inject = ['$resource','API_END_POINT'];
Foo.registeredName = 'foo';
function Foo ($resource, API_END_POINT) {
    return $resoure(API_END_POINT+'foo');
}
ng.service(Foo.registeredName, Foo);
*/
describe('foo service', function () {
    beforeEach(inject(angular.mocks.inject('app')));
    describe('query', function () {
        describe('()', function() {
            it('calls GET: ~/foo', function () {

            });
        });
    });
});