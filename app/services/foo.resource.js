var ng = require('angular');
Foo.$inject = ['$resource','API_END_POINT'];
Foo.registeredName = 'foo';
function Foo ($resource, API_END_POINT) {
    return $resoure(API_END_POINT+'foo');
}
ng.service(Foo.registeredName, Foo);