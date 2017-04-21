var ng = require('angular');
    require('../app');

ng
    .module('test',['app'])
    .constant('API_END_POINT','http://api.test/');
require('./services');