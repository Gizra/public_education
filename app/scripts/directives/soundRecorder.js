'use strict';

angular.module('publicEducationApp')
  .directive('soundRecorder', function (UploadFile, $timeout) {
    return {
      templateUrl:'views/sound-recorder.html',
      restrict: 'E',
      scope: {
        file: '=file',
        state: '=state',
        setState: '&'
      },
      link: function postLink(scope) {
        scope.file = '/tmp/foo';

        scope.counter = 6;

        scope.record = function() {
          scope.state = 'recording';

          // Record audio
	        var src = 'myrecording.amr';
	        var mediaRec = new Media(src, function onSuccess() {
            console.log('recordAudio():Audio Success');
          }, function onError(error) {
            console.log('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
          });

	        // Record audio for up 6 seconds or until user stops recording.
	        mediaRec.startRecord();
          scope.onTimeout = function(){
            scope.counter--;
            if (scope.counter > 0) {
              interval = $timeout(scope.onTimeout,1000);
            }
            else {
              //mediaRec.stopRecord();
              scope.state = 'afterRecord';
            }
          };
          var interval = $timeout(scope.onTimeout,1000);
        };

        scope.pauseRecording = function() {
          scope.counter = 0;
        };

        scope.play = function() {
          var src = 'myrecording.amr';
          var mediaPlayer = new Media(src, function onSuccess() {
            console.log('playAudio(): Audio Success');
            // If play was successful, update marker state.
            scope.state = 'afterPlay';

          }, function onError(error) {
            console.log('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
          });

          mediaPlayer.play();

          scope.state = 'afterPlay';

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
