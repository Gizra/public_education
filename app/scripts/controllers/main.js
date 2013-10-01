'use strict';

angular.module('publicEducationApp')
  .controller('ListMarkersCtrl', function ($scope, Leaflet, storage, Marker, $location) {

    angular.extend($scope, Leaflet.getDefaults());
    storage.bind($scope,'center', {defaultValue: Leaflet.getCenter()});

    $scope.markers = {};
    Marker.gettingMarkers().then(function(data) {

      // Set the icon according to the playlist count.
      var counter;
      angular.forEach(data, function(marker, key) {
        counter = 0;
        angular.forEach(marker.playList, function(item) {
          if (!item.unprocessed) {
            ++counter;
          }
        });
        marker.icon = L.divIcon({
          iconSize: [10, 10],
          html: counter,
          // @todo: angular-leaflet fails without this one.
          iconAnchor:   [0, 0]
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
