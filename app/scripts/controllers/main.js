'use strict';

angular.module('publicEducationApp')
  .controller('ListMarkersCtrl', function ($scope, Leaflet, storage, Marker, $location, $timeout) {

    angular.extend($scope, Leaflet.getDefaults());
    storage.bind($scope,'center', {defaultValue: Leaflet.getCenter()});
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        $scope.center.lat = position.coords.latitude;
        $scope.center.lng = position.coords.longitude;
      });
    }

    $scope.markers = {};

    // Get markers.
    var getMarkers = function getMarkers() {
      Marker.gettingMarkers().then(function(data) {

        data = data.data;

        angular.forEach(data, function(marker, key) {
          marker.icon = L.divIcon({
            iconSize: [63, 71],
            // Set the icon according to the playlist count.
            html: '<div class="marker-icon">' + marker.playList.length + '</div>',
            // @todo: angular-leaflet fails without this one.
            iconAnchor:   [31, 71]
          });

          $scope.markers[key] = marker;
        });
        // $scope.markers = data;
      });
    }

    // Refresh markers each minute.
    var refreshMarker = function lopp() {
      getMarkers();
      $timeout(refreshMarker, 60000)
    };

    // Start request
    refreshMarker();

    angular.forEach(['zoomend','moveend'], function(value) {
      $scope.$on('leafletDirectiveMap.' + value, function() {
        Leaflet.setCenter($scope.center);
      });
    });

    $scope.$on('leafletDirectiveMarker.click', function (event, args) {
      // Redirect to play-marker, when user clicks a marker.
      $location.path('/play-marker/' + args.markerName);
    });

  });
