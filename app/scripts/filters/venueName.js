'use strict';

angular.module('publicEducationApp')
  .filter('venueName', function () {
    return function (venueName) {
      return !!venueName ? venueName : 'Loading...';
    };
  });
