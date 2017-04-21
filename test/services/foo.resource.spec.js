/*
var ng = require('angular');
Foo.$inject = ['$resource','API_END_POINT'];
Foo.registeredName = 'foo';
function Foo ($resource, API_END_POINT) {
    return $resource(API_END_POINT+'foo');
}
ng
    .module('app')
    .service(Foo.registeredName, Foo);
*/
require('angular').module('app').constant('API_END_POINT','http://api.test/');

describe('foo service', function () {
    var foo,
        $httpBackend,
        API_END_POINT;
    beforeEach(angular.mock.module('app'));
    beforeEach(inject(function (_foo_, _$httpBackend_, _API_END_POINT_) {
        foo = _foo_;
        $httpBackend = _$httpBackend_;
        API_END_POINT = _API_END_POINT_;
    }))
    describe('query', function () {
        describe('()', function() {
            it('calls GET: ~/foo', function () {
                $httpBackend
                    .expectGET(API_END_POINT+'foo')
                    .respond(200);
                foo.query();
                $httpBackend.flush();
            });
        });
        describe('({name:"Toby"})', function() {
            it('calls GET: ~/foo?name=Toby', function () {
                $httpBackend
                    .expectGET(API_END_POINT+'foo?name=Toby')
                    .respond(200);
                foo.query({name:"Toby"});
                $httpBackend.flush();
            });
        });
    });
});