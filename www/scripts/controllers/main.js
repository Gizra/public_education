'use strict';

angular.module('publicEducationApp')
  .controller('listMarkersCtrl', function ($scope) {

    angular.extend($scope, {
      defaults: {
        maxZoom: 20,
        minZoom: 14

      },
      center: {
        lat: 41.0383,
        lng: 28.9869,
        zoom: 16
      },
      markers: {
        marker1: {
          lat: 41.0383,
          lng: 28.9869,
          message: "This is Gezi Parki",
          focus: false,
          draggable: false
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
