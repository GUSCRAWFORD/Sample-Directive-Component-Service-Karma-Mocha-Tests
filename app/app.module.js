var ng = require('angular');
    require('angular-resource');

ng
    .module('app',['ngResource'])
require('./services');
require('./foo-viewer');