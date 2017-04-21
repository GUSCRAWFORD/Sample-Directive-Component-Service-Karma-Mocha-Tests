var ng = require('angular');
    require('angular-mocks');
    require('../app');
ng
    .module('app');
ng
    .module('test',['app']);
require('./services');