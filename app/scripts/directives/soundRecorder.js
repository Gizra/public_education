'use strict';

angular.module('publicEducationApp')
  .directive('soundRecorder', function (Marker, $timeout, Phonegap) {
    return {
      templateUrl:'views/sound-recorder.html',
      restrict: 'E',
      scope: {
        // Pass the file name and path to the controller.
        file: '=file',
        // The callback function that will be invoked when a recording is
        // approved by the user.
        onRecorded: '&onRecorded'
      },
      link: function postLink(scope) {
        // Internal state of the recording.
        scope.state = 'beforeRecord';

        // Record audio.
        if (Phonegap.isMobile.iOS()) {
          scope.file = 'pe.wav';
        }
        else if (Phonegap.isMobile.Android()) {
          scope.file = 'pe.amr';
        }

        var mediaRec = Phonegap.getMedia(scope.file);

        /**
         * Start recording.
         */
        scope.startRecord = function() {
          scope.state = 'recording';

	        // Record audio for up 6 seconds.
	        mediaRec.startRecord();
          scope.counter = 1;
          scope.onTimeout = function(){
            scope.counter--;
            if (scope.counter > 0) {
              interval = $timeout(scope.onTimeout,1000);
            }
            else {
              scope.stopRecord();
            }
          };
          var interval = $timeout(scope.onTimeout,1000);
        };

        /**
         * Stop recording.
         */
        scope.stopRecord = function() {
          mediaRec.stopRecord();
          scope.state = 'afterRecord';
        };

        /**
         * Play the record.
         */
        scope.playRecord = function() {
          scope.state = 'playRecord';

          var mediaPlayer = Phonegap.getMedia(scope.file, function onSuccess() {
            // If play was successful, update marker state.
            scope.state = 'afterPlay';
          });

          mediaPlayer.play();
        };
      }
    };
  });
