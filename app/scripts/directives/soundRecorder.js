'use strict';

angular.module('publicEducationApp')
  .directive('soundRecorder', function (UploadFile, $timeout) {
    return {
      templateUrl:'views/sound-recorder.html',
      restrict: 'E',
      scope: {
        file: '=file',
        state: '=state'
      },
      link: function postLink(scope) {
        scope.file = '/tmp/foo';

        scope.record = function() {
          scope.state = 'recording';
          // Record audio
	        var src = 'myrecording.amr';
	        var mediaRec = new Media(src, function onSuccess() {
            console.log('recordAudio():Audio Success');
          }, function onError(error) {
            console.log('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
          });

	        // Record audio for up 6 seconds.
	        mediaRec.startRecord();
          scope.counter = 6;
          scope.onTimeout = function(){
            scope.counter--;
            if (scope.counter > 0) {
              interval = $timeout(scope.onTimeout,1000);
            }
            else {
              mediaRec.stopRecord();

              scope.state = 'recorded';
            }
          };
          var interval = $timeout(scope.onTimeout,1000);
        };

        scope.upload = function() {
          scope.state = 'uploading';
          UploadFile.sendFile().then(function() {
            scope.state = 'uploaded';
          });
        };
      }
    };
  });
