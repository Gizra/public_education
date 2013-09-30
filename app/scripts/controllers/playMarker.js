'use strict';

angular.module('publicEducationApp')
  .controller('PlayMarkerCtrl', function ($scope, $routeParams, $location, Marker) {

    $scope.venueId = $routeParams.venueId;
    angular.extend($scope, {
      selectedMarker: {
        playList: []
      }
    });

    Marker.getMarkers().then(function(data) {
      $scope.markers = data;

      if (!$scope.markers[$scope.venueId]) {
        // Redirect to homepage on wrong venue ID.
        $location.path('/');
      }

      $scope.selectedMarker = $scope.markers[$scope.venueId];
    });

  });
