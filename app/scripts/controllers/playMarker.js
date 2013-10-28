'use strict';

angular.module('publicEducationApp')
  .controller('PlayMarkerCtrl', function ($scope, $routeParams, $location, storage, Marker, Leaflet, Phonegap, $window) {

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

    // Default values edit mode ng-class.
    $scope.classPlayerMode = 'playlist-info bottom-bar';
    $scope.editMode = Marker.isPlayingAllMarkers();
    $scope.actualPage = $location.absUrl();

    $scope.PlayingAllMarkers = function() {
      Marker.setPlayingAllMarkers(false);
    };

    // Geting markers.
    Marker.gettingMarkers().then(function(data) {

      $scope.markers = data;

      if (!$scope.markers[$scope.venueId]) {
        // Redirect to homepage on wrong venue ID.
        $location.path('/');
      }

      // Set the current record, need it to play cached markers.
      $scope.selectedMarker = $scope.markers[$scope.venueId];
      $scope.selectedMarker.currentRecord = $scope.selectedMarker.playList[0];
      // @todo: mock the web version
      if (!Phonegap.isMobile.any()) {
        $scope.selectedMarker.currentRecord.src = 'https://s3.amazonaws.com/PE-dev/1382945564909.wav';
      }

      // Needed to fill the playList of the component angular-audio-player.
      angular.forEach($scope.selectedMarker.playList, function(value) {
        // Push the new items to the play list.
        $scope.playList.push(value);
        $scope.user = $scope.selectedMarker.user;
      });

      $scope.center = {
        lat: $scope.selectedMarker.lat,
        lng: $scope.selectedMarker.lng,
        zoom: 16
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

    /**
     * Share link to twitter, facebook, email.
     */
    $scope.shareLink = function(method) {
      var url;
      var text = $scope.selectedMarker.currentRecord.text + '-' + encodeURIComponent($location.absUrl());

      if (method === 'twitter') {
        url = 'https://twitter.com/share?text='+text;
      }
      else if (method === 'facebook') {
        url = 'http://www.facebook.com/sharer/sharer.php?s=100&p[url]=' + encodeURIComponent($location.absUrl()) + '&p[title]=Public%20Education&p[summary]=' + text;
      }
      else if (method === 'email') {
        url = 'mailto:?body=' + text + ' - ' + encodeURIComponent($location.absUrl());
      }

      $window.open(url, method, 'width=626,height=445');
    };


  });
