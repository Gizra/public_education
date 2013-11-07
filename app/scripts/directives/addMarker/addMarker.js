'use strict';

angular.module('publicEducationApp')
  .directive('addMarker', function ($location, IS_MOBILE, Phonegap, URL_STORE) {
    return {
      templateUrl: 'scripts/directives/addMarker/addMarker.html',
      restrict: 'E',
      scope: {
        setInstallState: '&'
      },
      link: function postLink(scope) {

        scope.isMobile = IS_MOBILE;

        // Set the store url in each device.
        // It's needed set the specific application url info in the config.json
        // file.
        if (!IS_MOBILE && Phonegap.isMobile.iOS()) {
          scope.url = URL_STORE.iOS;
        }
        else if (Phonegap.isMobile.Android()) {
          scope.url = URL_STORE.android;
        }
        else {
          scope.url = '#/add-marker';
        }
      }
    };
  });