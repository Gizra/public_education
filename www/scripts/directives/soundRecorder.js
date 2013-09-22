'use strict';

angular.module('publicEducationApp')
  .directive('soundRecorder', function () {
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
	        		
	        // Record audio
	        mediaRec.startRecord();
	
	        // Stop recording after 10 sec
	        var recTime = 0;
	        var recInterval = setInterval(function() {
	            recTime = recTime + 1;
	            setAudioPosition(recTime + " sec");
	            if (recTime >= 10) {
	                clearInterval(recInterval);
	                mediaRec.stopRecord();
	            }
	        }, 1000);
		
		    // onSuccess Callback
		    //
		    function onSuccess() {
		        console.log("recordAudio():Audio Success");
		    }
		
		    // onError Callback
		    //
		    function onError(error) {
		        alert('code: '    + error.code    + '\n' +
		              'message: ' + error.message + '\n');
		    }
		    
	        // Set audio position
		    //
		    function setAudioPosition(position) {
		        document.getElementById('audio_position').innerHTML = position;
		    }
          
          
          
        }
      }
    };
  });
