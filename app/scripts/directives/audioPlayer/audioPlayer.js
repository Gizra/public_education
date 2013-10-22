'use strict';

angular.module('publicEducationApp')
  .directive('audioPlayer', function (Phonegap) {
    return {
      templateUrl: 'scripts/directives/audioPlayer/audioPlayer.html',
      restrict: 'E',
      scope: {
        playList: '=playList',
        currentRecord: '=currentRecord'
      },
      link: function postLink(scope) {

        scope.isPhoneGap = Phonegap.isMobile.any();
        scope.currentTrack = 0;

        //alert(Phonegap.isMobile.any());
        console.log('isMobile:', Phonegap.isMobile.any());

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
          scope.playerControl.playPause();
        };

        /**
         * Play an item in PhoneGap devices.
         *
         */
        scope.playPhoneGap = function() {

          scope.mediaPlayer = Phonegap.getMedia(function onSuccess() {
            // If play was successful, skip to the next track.
            scope.$apply(function () {
              ++scope.currentTrack;
            });
          });
          scope.mediaPlayer.play();
        };

        /**
         * Play previous item in PhoneGap devices
         */
        scope.previousPhoneGap = function() {

          return;
        };

        /**
         * Play next item in PhoneGap devices
         */
        scope.nextPhoneGap = function() {

          return;
        };

        /**
         * Pause an item in PhoneGap devies.
         */
        scope.pausePhoneGap = function() {
          scope.mediaPlayer.pause();
        };


        scope.$watch('currentTrack', function(track, oldTrack) {
          // Populate info of current record in the scope.
          if (!scope.playList.length) {
            return;
          }

          scope.currentRecord = scope.playList[track];

          if (scope.isPhoneGap) {
            scope.playPhoneGap(scope.playList[track].src);
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


        scope.$watch('playerControl.currentTrack', function(currentTrack) {
          // Change current track by the HTML5 <audio> tag.
          scope.currentTrack = currentTrack - 1;
        });
      }
    };
  });
