'use strict';

angular.module('publicEducationApp')
  .controller('AddMarkerCtrl', function ($scope, Leaflet, Foursquare, storage) {

    var updateMarker = function() {
      // The marker is always in the center of the map, and visible only if the
      // zoom is equal or above 16.
      if ($scope.center.zoom >= 16) {
        var lat = $scope.center.lat,
            lng = $scope.center.lng;

        $scope.markers = {
          marker: {
            lat: lat,
            lng: lng,
            draggable: false,
            // Add text until venue is loaded.
            venue: null
          }
        };

        // Populate the venue.
        Foursquare.getVenue(lat, lng).then(function(data) {
          $scope.markers.marker.venue = data;
        });
      }
      else {
        $scope.markers = {};
      }
    };

    angular.extend($scope, Leaflet.getDefaults());


    // @todo: Move to init function?
    storage.bind($scope,'center', {defaultValue: Leaflet.getCenter()});
    storage.bind($scope,'text');
    storage.bind($scope,'markers');
    updateMarker();

    angular.forEach(['zoomend','moveend'], function(value) {
      $scope.$on('leafletDirectiveMap.' + value, function() {
        updateMarker();
        Leaflet.setCenter($scope.center);
      });
    });

  });
