'use strict';

angular.module('publicEducationApp')
  .controller('ListMarkersCtrl', function ($scope, Leaflet, storage, Marker, $location) {

    angular.extend($scope, Leaflet.getDefaults());
    storage.bind($scope,'center', {defaultValue: Leaflet.getCenter()});

    $scope.markers = {};
    Marker.getMarkers().then(function(data) {
      $scope.markers = data;
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
