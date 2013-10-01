'use strict';

angular.module('publicEducationApp')
  .controller('AddMarkerCtrl', function ($scope, Leaflet, Foursquare, storage, User, Marker) {

    /**
     * Update the map's center, and get the venue name from FourSquare.
     *
     * The marker is always in the center of the map, and visible only if the
     * zoom is equal or above 16.
     */
    var updateMarker = function () {
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

    // Get default values.
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

    $scope.$watch('state', function(oldVal, newVal) {
      // @todo: value should be "completed" after recording is in place.
      if (newVal === 'record') {
        // Add the new marker.
        var venue = {
          id: $scope.markers.marker.venue.id,
          name: $scope.markers.marker.venue.name,
          lat: $scope.markers.marker.venue.location.lat,
          lng: $scope.markers.marker.venue.location.lng
        },
        location = {
          lng: $scope.markers.marker.lng,
          lat: $scope.markers.marker.lat
        };

        Marker.addMarker(venue, $scope.text, $scope.file, location, $scope.user);
      }
    });

    /**
     * Set the state.
     *
     * @param state
     *   Possible options:
     *   - mark:
     *   - form:
     *   - beforeRecord:
     *   - recording:
     *   - afterRecord:
     *   - afterPlay:
     *   - uploading:
     *   - uploaded:
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
