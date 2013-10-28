'use strict';

angular.module('publicEducationApp')
  .controller('AddMarkerCtrl', function ($scope, $location, $window, Leaflet, Foursquare, storage, User, Marker, BACKEND_URL, OAuthIo) {
     /**
     * Update the map's center, and get the venue name from FourSquare.
     *
     * The marker is always in the center of the map, and visible only if the
     * zoom is equal or above 16.
     */
    $scope.$watch('center', function (center) {
      $scope.updateMarker(center.lat, center.lng);
    });

    $scope.updateMarker = function(lat, lng) {
      var icon = $window.L.divIcon({
        iconSize: [30, 35],
        // Set the icon according to the playlist count.
        html: '<div class="marker-icon"></div>',
        // @todo: angular-leaflet fails without this one.
        iconAnchor:   [15, 35]
      });

      if ($scope.center.zoom >= 16) {

        $scope.markers = {
          marker: {
            lat: lat,
            lng: lng,
            venue: null,
            icon: icon
          }
        };

        if (!$scope.mapIsMoving) {
          Foursquare.gettingVenue(lat, lng).then(function(data) {
            $scope.markers.marker.venue = data;
          });
        }
      }
      else {
        $scope.markers = {};
      }
    };

    // Get default values.
    angular.extend($scope, Leaflet.getDefaults());
    $scope.mapIsMoving = false;


    angular.forEach(['zoomend', 'moveend'], function (value) {
      $scope.$on('leafletDirectiveMap.' + value, function () {
        $scope.mapIsMoving = false;
        $scope.updateMarker($scope.center.lat, $scope.center.lng);
      });
    });

    angular.forEach(['zoomstart', 'movestart'], function (value) {
      $scope.$on('leafletDirectiveMap.' + value, function () {
        $scope.mapIsMoving = true;
      });
    });

    $scope.$on('leafletDirectiveMap.move', function(event, args) {
      // Get the Leaflet map from the triggered event.
      var map = args.leafletEvent.target;
      var center = map.getCenter();

      // Update the marker.
      $scope.updateMarker(center.lat, center.lng);
    });

    // Click on the marker should advance to next step.
    $scope.$on('leafletDirectiveMarker.click', function() {
      $scope.setState('form');
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
     *   - credentials: Ask for twitter, facebook credentials before posting or permits anonymously posting.
     *
     */
    $scope.setState = function(state) {
      $scope.state = state;
    };

    /**
     * Helper function to indicate recording has completed.
     */
    $scope.onRecorded = function() {
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

      // Getting the promise of add a new marker.
      Marker.addMarker(venue, $scope.text, $scope.file, location, $scope.user);

      $scope.setState('completed');

      // Clear local storage.
      storage.remove('text');

    };

    /**
     * Observing states of add marker flow, to perform actions.
     */
    $scope.$watch('state', function() {
      // Initialize user when enter to credentials state.
      if ($scope.state === 'credentials') {
        // Default values of a user.
        $scope.user = {
          username: '',
          name: 'Anonymous',
          photo: '',
          provider: null
        };
      }
    });

    /**
     * Login user in a specific provider OAuth (Facebook) and save the marker and related record.
     *
     * @param provider
     */
    $scope.oauth = function(provider) {
      // Get provider parameter and auth.
      OAuthIo.auth(provider).then(function(data) {
        $scope.user = data;

        // Upload the data and save marker.
        $scope.onRecorded();
      });
    };


    // @todo: Move to init function?
    storage.bind($scope, 'center', {defaultValue: Leaflet.getCenter()});
    storage.bind($scope, 'text');
    storage.bind($scope, 'state', {defaultValue: 'mark'});
    $scope.markers = {};
    $scope.backendUrl = BACKEND_URL;

  });
