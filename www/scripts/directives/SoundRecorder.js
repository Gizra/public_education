'use strict';

angular.module('publicEducationApp')
  .directive('SoundRecorder', function () {
    return {
      templateUrl: '<div></div>',
      restrict: 'E',
      scope: {
        fileURI: '=fileURI'
      },
      link: function postLink(scope, element, attrs) {
        element.text('this is the SoundRecorder directive');
      }
    };
  });
