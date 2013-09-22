'use strict';

angular.module('publicEducationApp')
  .directive('soundRecorder', function () {
    return {
      templateUrl: '../views/sound-recorder.html',
      restrict: 'E',
      scope: {
        fileURI: '=fileURI'
      },
      link: function postLink(scope, element, attrs) {
        scope.fileURI = '/tmp/foo';

        var record = function() {
          console.log('record');
        }
      }
    };
  });
