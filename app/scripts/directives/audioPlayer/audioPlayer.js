'use strict';

angular.module('publicEducationApp')
  .directive('audioPlayer', function (Phonegap) {
    return {
      templateUrl: 'scripts/directives/audioPlayer/audioPlayer.html',
      restrict: 'E',
      scope: {
        playList: '=playList',
        currentRecord: '=currentRecord',
        playListFinished: '=playListFinished',
        stopPlaying: '=stopPlaying'
      },
      link: function postLink(scope) {

        scope.isPhoneGap = Phonegap.isMobile.any();

        scope.previous = function() {
          // Pause before change record.
          if (scope.isPhoneGap) {
            scope.play = false;
            scope.mediaPlayer.pause();
          }

          if (scope.currentTrack > 0) {
            --scope.currentTrack;
          }
        };

        scope.next = function() {
          // Pause before change record.
          if (scope.isPhoneGap) {
            scope.play = false;
            scope.mediaPlayer.pause();
          }

          if (scope.currentTrack < scope.playList.length - 1) {
            ++scope.currentTrack;
          }
        };

        scope.playPauseHtml5 = function() {
          scope.play = !scope.play;
          scope.playerControl.playPause();
        };

        /**
         * Observe the event 'stopPlaying'.
         */
        if (scope.isPhoneGap) {
          scope.$watch('stopPlaying', function(stopPlaying) {
            if (!stopPlaying || !scope.mediaPlayer) {
              return;
            }

            // Stop playing the playList, when finish the last sound.
            scope.stopPlaying = true;

          });
        }


        /* Play and pause a record in PhoneGap devices.
         *
         * @param pause
         *  true: Pause the current record.
         *  false Continue playing the current record.
         */
        scope.playPhoneGap = function(pause) {

          // Realize pause and resume action.
          if (pause) {
            if (scope.play) {
              scope.mediaPlayer.pause();
            }
            else {
              scope.mediaPlayer.play();
            }
            scope.play = !scope.play;
            console.log(scope.play, 'play?');
            return;
          }

          // Release resources if not need the last record first.
          if (scope.mediaPlayer) {
            scope.mediaPlayer.stop();
            scope.mediaPlayer.release();
          }

          scope.mediaPlayer = Phonegap.getMedia(scope.currentRecord.src,
            function onSuccess() {

              // If play was successful, skip to the next track, if it exists.
              scope.$apply(function () {
                if (scope.currentTrack +1 < scope.playList.length) {
                  ++scope.currentTrack;
                }
              });

            });

          scope.mediaPlayer.play();
        };

        // Initialize the property to stop playList.
        scope.stopPlaying = false;

        scope.$watch('currentTrack', function(track, oldTrack) {
          // We continue only with a valid track number or a playlist.
          if (!scope.playList.length || track === undefined || track < 0) {
            return;
          }

          // Avoid to continue playing the playList
          if (scope.stopPlaying) {
            return;
          }

          // Update currentRecord.
          scope.currentRecord = scope.playList[track];
          // Set play state.
          scope.play = true;

          if (scope.isPhoneGap) {
            scope.playPhoneGap();
          }
          else if (oldTrack > 0) {
            // HTML <audio> tag.
            if (oldTrack < track) {
              scope.playerControl.next();
            }
            else {
              scope.playerControl.prev();
            }

          }
        });


        if (!scope.isPhoneGap) {
          scope.$watch('playerControl.currentTrack', function(currentTrack) {
            // Change current track by the HTML5 <audio> tag.
            scope.currentTrack = currentTrack - 1;

            if (!scope.playerControl || !scope.playerControl.tracks) {
              return;
            }
          });

          // Watch when reaching the last audio.
          scope.$watch('playerControl.playing', function(playing) {
            if (playing) {
              // Audio is playing.
              return;
            }

            if (!scope.playerControl || !scope.playerControl.tracks) {
              // Tracks not initalized yet.
              return;
            }

            if (scope.playerControl.currentTrack !== scope.playerControl.tracks) {
              // Still didn't reach the last song.
              return;
            }

            // User reached the last song.
            scope.playListFinished = true;
            scope.play = false;
          });

          // Initialize the play property.
          // scope.play = true;
        }

        /**
         * Initialize currentTrack just when the playList is filled.
         *
         * This is need because the process $http and linking phase of the directive
         * (angularjs bootstrap) are asynchronous.
         */
        scope.$watch('playList', function(playList) {
          if (playList.length) {
            scope.currentTrack = 0;
          }
        }, true);
      }
    };
  });
