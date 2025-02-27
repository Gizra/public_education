'use strict';

angular.module('publicEducationApp')
  .controller('PlayMarkerCtrl', function ($scope, $routeParams, $location, storage, Marker, Leaflet, WEB_URL) {

    // Apply custom css, if exist.
    storage.bind($scope,'customCss', {defaultValue: 'reset-custom-css'});

    $scope.venueId = $routeParams.venueId;
    angular.extend($scope, {
      selectedMarker: {
        playList: [],
        currentRecord: null
      }
    });

    // Default values, that will be populated once the markers are fetched.
    $scope.center = Leaflet.getCenter();
    $scope.selectedMarker = {};
    $scope.playList = [];
    $scope.webUrl = WEB_URL;

    // Default values edit mode ng-class.
    $scope.classPlayerMode = 'playlist-info bottom-bar';
    $scope.actualPage = $location.absUrl();
    storage.bind($scope,'editMode', {defaultValue: false});

    $scope.stopPlayingAndCycle = function() {
      // Stop the cycle, if it was enabled.
      Marker.setPlayingAllMarkers(false);

      $scope.stopPlaying = true;
    };

    $scope.stopPlaying = false;

    // Geting markers.
    Marker.gettingMarkers().then(function(data) {
      $scope.markers = data;

      if (!$scope.markers[$scope.venueId]) {
        // Redirect to homepage on wrong venue ID.
        $location.path('/');
      }

      $scope.selectedMarker = $scope.markers[$scope.venueId];

      // Needed to fill the playList of the component angular-audio-player.
      angular.forEach($scope.selectedMarker.playList, function(value) {
        // Push the new items to the play list.
        $scope.playList.push(value);
        $scope.user = $scope.selectedMarker.user;
      });

      $scope.center = {
        lat: $scope.selectedMarker.lat,
        lng: $scope.selectedMarker.lng,
        zoom: 18
      };
    });

    $scope.playListFinished = false;

    if (Marker.isPlayingAllMarkers()) {
      $scope.$watch('playListFinished', function(playListFinished) {
        if (!playListFinished) {
          return;
        }

        // Load the next venue from the markers list.
        var firstVenueId = null,
          reachedCurrentVenueId = false,
          nextVenueId = null;

        angular.forEach($scope.markers, function(value, key) {
          if (!firstVenueId) {
            firstVenueId = key;
          }

          if (nextVenueId) {
            // @todo: Is there a way to break the forEach?
            return;
          }

          if (key === $scope.venueId) {
            reachedCurrentVenueId = true;
          }
          else if (reachedCurrentVenueId) {
            nextVenueId = key;
          }
        });

        if (nextVenueId) {
          // Redirect to the next venue.
          $location.path('/play-marker/' + nextVenueId);
        }
        else {
          // Redirect back to the first venue, and let the Markers service know
          // it can refresh the cache.
          Marker.setSkipCacheNextInterval();
          $location.path('/play-marker/' + firstVenueId);
        }
      });
    }


    angular.extend($scope, Leaflet.getDefaults());


    /**
     * Intercept Drag Map Event.
     */
    $scope.$on('leafletDirectiveMap.drag', function(event, args) {

      // TODO:Implement disable draggble onclick (Verify if the directive implemented)
      args.leafletEvent.target.options.dragging = false;
      args.leafletEvent.target.dragging._enabled = false;
      args.leafletEvent.target.dragging._draggable._enabled = false;
      args.leafletEvent.target.keyboard._enabled = false;

    });

    /**
     * Toggle between edit and play mode.
     */
    $scope.toggleEditMode = function() {
      $scope.editMode = !$scope.editMode;
    };

  });
