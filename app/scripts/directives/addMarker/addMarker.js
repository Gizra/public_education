'use strict';

angular.module('publicEducationApp')
  .directive('addMarker', function ($location, IS_MOBILE, Phonegap, URL_STORE) {
    return {
      templateUrl: 'scripts/directives/addMarker/addMarker.html',
      restrict: 'E',
      scope:true,
      controller: function($scope) {

        if (!IS_MOBILE && Phonegap.isMobile.iOS()) {
          // @todo: Need to replace with the name an idi of the application publish in the
          // iTunes Store of Public Education.

          $scope.url = 'https://itunes.apple.com/app/' + URL_STORE.iOS;
        }
        else if (Phonegap.isMobile.Android()) {
          $scope.url = 'https://play.google.com/store/apps/details?id=' + URL_STORE.android;
        }
        else {
          $scope.url = '#/add-marker';
        }

      }
    };
  });