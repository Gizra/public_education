'use strict';

angular.module('publicEducationApp')
  .directive('audioPlayer', function (Phonegap) {
    return {
      templateUrl: 'scripts/directives/audioPlayer/audioPlayer.html',
      restrict: 'E',
      scope: {
        playList: '=playList',
        currentRecord: '=currentRecord',
        playListFinished: '=playListFinished'
      },
      link: function postLink(scope) {
        scope.isPhoneGap = Phonegap.isMobile.any();

        scope.previous = function() {
          if (scope.currentTrack > 0) {
            --scope.currentTrack;
          }
        };

        scope.next = function() {
          if (scope.currentTrack < scope.playList.length - 1) {
            ++scope.currentTrack;
          }
        };

        scope.playPauseHtml5 = function() {
          scope.play = !scope.play;
          scope.playerControl.playPause();
        };

        /**
         * Play an item in PhoneGap devices.
         */
        scope.playPhoneGap = function() {
          scope.mediaPlayer = Phonegap.getMedia(scope.currentRecord.src, function onSuccess() {
            // If play was successful, skip to the next track, if it exists.
            scope.$apply(function () {
              if (scope.currentTrack +1 < scope.playList.length) {
                ++scope.currentTrack;
              }
            });
          });
          scope.play = true;
          scope.mediaPlayer.play();
        };

        scope.$watch('currentTrack', function(track, oldTrack) {
          // We continue only with a valid track number or a playlist.
          if (!scope.playList.length || track === undefined || track < 0) {
            return;
          }

          // Update currentRecord.
          scope.currentRecord = scope.playList[track];

          if (scope.isPhoneGap) {
            scope.playPhoneGap();
          }
          else if (oldTrack > 0) {
            scope.play = true;
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
          scope.play = true;
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
