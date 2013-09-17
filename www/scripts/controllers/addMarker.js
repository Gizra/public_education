'use strict';

angular.module('publicEducationApp')
  .controller('AddMarkerCtrl', function ($scope, Leaflet) {

    var updateMarker = function() {
      // The marker is always in the center of the map, and visible only if the
      // zoom is equal or above 16.
      if ($scope.center.zoom >= 16) {
        $scope.markers = {
          marker: {
            lat: $scope.center.lat,
            lng: $scope.center.lng,
            message: "This is Gezi Parki",
            draggable: true
          }
        };
      }
      else {
        $scope.markers = {};
      }
    }

    angular.extend($scope, Leaflet.getDefaults());
    angular.extend($scope, Leaflet.getCenter());

    angular.extend($scope, {
      text: '',
      markers: {}
    });

    updateMarker();

    angular.forEach(['zoomend','moveend'], function(value) {
      $scope.$on('leafletDirectiveMap.' + value, function(event) {
        updateMarker();
        Leaflet.setCenter($scope.center);
      });
    });

  });
