'use strict';

angular.module('publicEducationApp')
  .controller('AddMarkerCtrl', function ($scope, Leaflet, Foursquare, storage, User) {

    var updateMarker = function () {
      // The marker is always in the center of the map, and visible only if the
      // zoom is equal or above 16.
      if ($scope.center.zoom >= 16) {
        var lat = $scope.center.lat,
            lng = $scope.center.lng;

        $scope.markers = {
          marker: {
            lat: lat,
            lng: lng,
            draggable: true,
            // Add text until venue is loaded.
            venue: null
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

    User.getUser().then(function(data) {
      $scope.user = data;
    });

    /**
     * Set the state.
     *
     * @param state
     *   Possible options:
     *   - mark:
     *   - form:
     *   - record:
     *   - upload:
     */
    $scope.setState = function(state) {
      $scope.state = state;
    };


    // @todo: Move to init function?
    storage.bind($scope, 'center', {defaultValue: Leaflet.getCenter()});
    storage.bind($scope, 'text');
    storage.bind($scope, 'markers');
    storage.bind($scope, 'state', {defaultValue: 'mark'});
    updateMarker();

  });
