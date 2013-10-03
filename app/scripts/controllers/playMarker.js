'use strict';

angular.module('publicEducationApp')
  .controller('PlayMarkerCtrl', function ($scope, $routeParams, $location, Marker) {

    $scope.venueId = $routeParams.venueId;
    angular.extend($scope, {
      selectedMarker: {
        playList: []
      }
    });

    $scope.selectedMarker = {};
    $scope.playList = [];

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
    });

  });
