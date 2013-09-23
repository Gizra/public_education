'use strict';

angular.module('publicEducationApp')
  .directive('soundRecorder', function (UploadFile, $timeout) {
    return {
      templateUrl:'views/sound-recorder.html',
      restrict: 'E',
      scope: {
        file: '=file'
      },
      link: function postLink(scope, element, attrs) {
        scope.file = '/tmp/foo';

        scope.record = function() {
          console.log('record');
          // Record audio
		      //
	        var src = "myrecording.amr";
	        var mediaRec = new Media(src, onSuccess, onError);
	        		
	        // Record audio for 6 seconds.
	        mediaRec.startRecord();
          scope.counter = 6;
          scope.onTimeout = function(){
            scope.counter--;
            if (scope.counter > 0) {
              interval = $timeout(scope.onTimeout,1000);
            }
            else {
              mediaRec.stopRecord();
            }
          };
          var interval = $timeout(scope.onTimeout,1000);

          // onSuccess Callback
          //
          function onSuccess() {
              console.log("recordAudio():Audio Success");
          }

          // onError Callback
          //
          function onError(error) {
            alert('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
          }
        },

        scope.upload = function() {
          UploadFile.sendFile();
        };
      }
    };
  });
