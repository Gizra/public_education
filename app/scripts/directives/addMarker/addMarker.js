'use strict';

angular.module('publicEducationApp')
  .directive('addMarker', function ($location) {
    return {
      templateUrl: 'scripts/directives/addMarker/addMarker.html',
      restrict: 'E',
      controller: function($scope) {
        $scope.addMarker = function() {
          $location.path('/add-marker');
        };
      }
    };
  });
