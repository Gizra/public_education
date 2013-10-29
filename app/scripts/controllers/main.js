'use strict';

angular.module('publicEducationApp')
  .controller('ListMarkersCtrl', function ($scope, $window, Leaflet, storage, Marker, $location, $timeout, IS_MOBILE) {

    angular.extend($scope, Leaflet.getDefaults());
    storage.bind($scope,'center', {defaultValue: Leaflet.getCenter()});

    $scope.onDeviceReady = function() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          $scope.center.lat = position.coords.latitude;
          $scope.center.lng = position.coords.longitude;
        });
      }
    };

    if (IS_MOBILE) {
      // Devices.
      document.addEventListener('deviceready', $scope.onDeviceReady, false);
    }
    else {
      // Web.
      $scope.onDeviceReady();
    }

    $scope.markers = {};

    $scope.playAllMarkers = function() {
      Marker.setPlayingAllMarkers(true);
      $scope.redirectToFirstVenue();
    };


    $scope.$watch('markers', function() {
      if (Marker.isPlayingAllMarkers()) {
        $scope.redirectToFirstVenue();
      }
    });

    $scope.redirectToFirstVenue = function() {
      // Redirect to the first venueId.
      angular.forEach($scope.markers, function(marker, key) {
        $location.path('/play-marker/' + key);
      });
    };


    // Get markers.
    var getMarkers = function() {
      Marker.gettingMarkers().then(function(data) {

        angular.forEach(data, function(marker, key) {
          marker.icon = $window.L.divIcon({
            iconSize: [30, 35],
            // Set the icon according to the playlist count.
            html: '<div class="marker-icon">' + marker.playList.length + '</div>',
            // @todo: angular-leaflet fails without this one.
            iconAnchor:   [15, 35]
          });

          $scope.markers[key] = marker;
        });
      })
        // Refresh markers each minute, after data was received.
        .then($timeout(getMarkers, 60000).resolve);
    };

    // Initial request get markers.
    getMarkers();

    angular.forEach(['zoomend','moveend'], function(value) {
      $scope.$on('leafletDirectiveMap.' + value, function() {
        Leaflet.setCenter($scope.center);
      });
    });

    $scope.$on('leafletDirectiveMarker.click', function (event, args) {
      // Redirect to play-marker, when user clicks a marker.
      $location.path('/play-marker/' + args.markerName);
    });

    $scope.isMobile = IS_MOBILE;
  });
