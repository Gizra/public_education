'use strict';

angular.module('publicEducationApp')
  .controller('AddMarkerCtrl', function ($scope) {

    var updateMarker = function() {

      // The marker is always in the center of the map, and visible only if the
      // zoom is equal or above 16.
      if ($scope.center.zoom >= 16) {
        $scope.markers = {
          marker: {
            lat: $scope.center.lat,
            lng: $scope.center.lng,
            message: "This is Gezi Parki"
          }
        };
      }
      else {
        $scope.markers = {};
      }
    }

    angular.extend($scope, {
      text: '',
      center: {
        lat: 41.0383,
        lng: 28.9869,
        zoom: 20
      },
      markers: {}
    });

    updateMarker();

    angular.forEach(['zoomend','moveend'], function(value) {
      $scope.$on('leafletDirectiveMap.' + value, function(event) {
        updateMarker();
      });
    });

  });
