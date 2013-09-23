'use strict';

angular.module('publicEducationApp')
  .controller('addMarkerCtrl', function ($scope, Leaflet, Foursquare, storage) {

    var updateMarker = function () {
      // The marker is always in the center of the map, and visible only if the
      // zoom is equal or above 16.
      if ($scope.center.zoom >= 16) {
        var lat = $scope.center.lat,
            lng = $scope.center.lng;


        var icon = L.icon({
          iconUrl: 'http://leafletjs.com/docs/images/leaf-orange.png',
          shadowUrl: 'http://leafletjs.com/docs/images/leaf-shadow.png',
          iconSize:     [38, 95],
          shadowSize:   [50, 64],
          iconAnchor:   [22, 94],
          shadowAnchor: [4, 62]
        });

        angular.extend($scope, icon);

        $scope.markers = {
          marker: {
            lat: lat,
            lng: lng,
            draggable: true,
            // Add text until venue is loaded.
            venue: null,
            icon: icon
          }
        };

        // Populate the venue.
        Foursquare.getVenue(lat, lng).then(function (data) {
          $scope.markers.marker.venue = data;
        });
      }
      else {
        $scope.markers = {};
      }
    };

    angular.extend($scope, Leaflet.getDefaults());


    // @todo: Move to init function?
    storage.bind($scope, 'center', {defaultValue: Leaflet.getCenter()});
    storage.bind($scope, 'text');
    storage.bind($scope, 'file');
    storage.bind($scope, 'markers');
    updateMarker();

    angular.forEach(['leafletDirectiveMap.zoomend', 'leafletDirectiveMap.moveend', 'leafletDirectiveMarker.dragend'], function (value) {
      $scope.$on(value, function (event, args) {

        if (event.name === 'leafletDirectiveMarker.dragend') {
          // Marker was dragged, so center the map accordingly.
          $scope.center.lat = args.leafletEvent.target._latlng.lat;
          $scope.center.lng = args.leafletEvent.target._latlng.lng;
        }

        updateMarker();
        Leaflet.setCenter($scope.center);
      });
    });

  });
