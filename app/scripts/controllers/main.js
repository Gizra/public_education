'use strict';

angular.module('publicEducationApp')
  .controller('MainCtrl', function ($scope) {

    angular.extend($scope, {
      istanbul: {
        lat: 41.0383,
        lng: 28.9869,
        zoom: 20
      },
      markers: {
        marker1: {
          lat: 41.0383,
          lng: 28.9869,
          message: "This is Gezi Parki",
          focus: false,
          draggable: true
        },
        marker2: {
          lat: 41.0383,
          lng: 28.96,
          message: "This is Barcelona. You can't drag me",
          focus: false,
          draggable: false
        }
      }
    });
  });
