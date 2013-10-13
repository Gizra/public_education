'use strict';

angular.module('publicEducationApp')
  .controller('PlayMarkerCtrl', function ($scope, $routeParams, $location, storage, Marker, Leaflet, Phonegap) {

    $scope.venueId = $routeParams.venueId;
      angular.extend($scope, {
        selectedMarker: {
          playList: []
        }
    });

    // Default values, that will be populated once the markers are fetched.
    $scope.center = Leaflet.getCenter();
    $scope.selectedMarker = {};
    $scope.playList = [];
    $scope.currentTrack = 0;

    Marker.gettingMarkers().then(function(data) {
      $scope.markers = data;

      if (!$scope.markers[$scope.venueId]) {
        // Redirect to homepage on wrong venue ID.
        $location.path('/');
      }

      $scope.selectedMarker = $scope.markers[$scope.venueId];
      angular.forEach($scope.selectedMarker.playList, function(value) {
        // Push the new items to the play list.
        $scope.playList.push(value);
      });

      $scope.center = {
        lat: $scope.selectedMarker.lat,
        lng: $scope.selectedMarker.lng,
        zoom: 16
      }

      $scope.$watch('currentTrack', function(track) {
        console.log('Track: ' + track);
        console.log('Length: ' + $scope.selectedMarker.playList.length);
        if (track <= $scope.selectedMarker.playList.length) {
          $scope.playItem($scope.selectedMarker.playList[track].src);
        }
      });
    });

    /**
     * Play an item.
     *
     * @param src
     */
    $scope.playItem = function(src) {
      console.log('src: ' + src);
      var mediaPlayer = Phonegap.getMedia(src, function onSuccess() {
        // If play was successful, update marker state.
        ++$scope.currentTrack;
      });
      mediaPlayer.play();
    }

    angular.extend($scope, Leaflet.getDefaults());


    /**
     * Intercept Drag Map Event
     */
    $scope.$on('leafletDirectiveMap.drag', function(event, args) {

      // TODO:Implement disable draggble onclick (Verify if the directive implemented)
      args.leafletEvent.target.options.dragging = false;
      args.leafletEvent.target.dragging._enabled = false;
      args.leafletEvent.target.dragging._draggable._enabled = false;
      args.leafletEvent.target.keyboard._enabled = false;

    });

  });
