'use strict';

angular.module('publicEducationApp')
  .directive('soundRecorder', function () {
    return {
      template: '/views/sound-recorder',
      restrict: 'E',
      scope: {
        fileURI: '=fileURI'
      },
      link: function postLink(scope, element, attrs) {
        scope.fileURI = '/tmp/foo';
      }
    };
  });
