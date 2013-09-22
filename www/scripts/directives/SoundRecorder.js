'use strict';

angular.module('publicEducationApp')
  .directive('soundRecorder', function () {
    return {
      templateUrl: '../views/sound-recorder.html',
      restrict: 'E',
      scope: {
        file: '=file'
      },
      link: function postLink(scope, element, attrs) {
        scope.file = '/tmp/foo';

        var record = function() {
          console.log('record');
        }
      }
    };
  });
