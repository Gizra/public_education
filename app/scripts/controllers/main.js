'use strict';

angular.module('publicEducationApp')
  .controller('ListMarkersCtrl', function ($scope, Leaflet, storage, Marker, $location) {

    angular.extend($scope, Leaflet.getDefaults());
    storage.bind($scope,'center', {defaultValue: Leaflet.getCenter()});

    $scope.markers = {};
    Marker.gettingMarkers().then(function(data) {

      angular.forEach(data, function(marker, key) {
        marker.icon = L.divIcon({
          iconSize: [63, 71],
          // Set the icon according to the playlist count.
          html: '<div class="marker-icon">' + marker.playList.length + '</div>',
          // @todo: angular-leaflet fails without this one.
          iconAnchor:   [31, 71]
        });

        console.log(key);

        $scope.markers[key] = marker;
      });
      // $scope.markers = data;
    });

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
