var ng = require('angular');
Foo.$inject = ['$resource','API_END_POINT'];
Foo.registeredName = 'foo';
function Foo ($resource, API_END_POINT) {
    return $resource(API_END_POINT+'foo');
}
ng
    .module('app')
    .service(Foo.registeredName, Foo);