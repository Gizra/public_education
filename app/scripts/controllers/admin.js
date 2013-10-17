'use strict';

angular.module('publicEducationApp')
  .controller('AdminCtrl', function ($scope, Marker) {
    $scope.markers = {};

    // Get markers.
    var getMarkers = function() {
      Marker.gettingMarkers().then(function(data) {

        angular.forEach(data, function(marker, key) {
          $scope.markers[key] = marker;
        });
      });
    };

    // Initial request get markers.
    getMarkers();
  });
