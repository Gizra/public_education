'use strict';

angular.module('publicEducationApp')
  .controller('MainCtrl', function ($scope) {

    angular.extend($scope, {
      center: {
        lat: 40.095,
        lng: -3.823,
        zoom: 4
      }
    });

  });
