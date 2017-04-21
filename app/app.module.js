var ng = require('angular');
    require('angular-resource');

ng
    .module('app',['ngResource'])
    .constant('API_END_POINT','http://api.example/');
require('./services');
require('./foo-viewer');