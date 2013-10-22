'use strict';

angular.module('publicEducationApp')
  .directive('audioPlayer', function (Phonegap) {
    return {
      templateUrl: 'scripts/directives/audioPlayer/audioPlayer.html',
      restrict: 'E',
      scope: {
        playList: '=playList',
        currentRecord: '=currentRecord',
        list: '='
      },
      link: function postLink(scope) {

        scope.isPhoneGap = Phonegap.isMobile.any();

        /**
         * Play a previous item in HTML5.
         */
        scope.previous = function() {
          if (scope.currentTrack > 0) {
            --scope.currentTrack;
          }
        };

        /**
         * Play a next item in HTML5.
         */
        scope.next = function() {
          if (scope.currentTrack < scope.playList.length - 1) {
            ++scope.currentTrack;
          }
        };

        /**
         * Play an item in HTML5.
         */
        scope.playPauseHtml5 = function() {
          scope.playerControl.playPause();
        };

        /**
         * Play an item in PhoneGap devices.
         */
        scope.playPhoneGap = function(src) {
          console.log('src:', src);
          scope.mediaPlayer = Phonegap.getMedia(src, function onSuccess() {

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
          if (!scope.playList.length, track) {
            console.log(scope.playList);
            return;
          }

          console.log('track:', track, 'playList:', scope.playList[track]);
          scope.currentRecord = scope.playList[track];


          if (scope.isPhoneGap) {
            console.log('scope.currentRecord:', scope.currentRecord);
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
          if (!scope.isPhoneGap) {
            // Change current track by the HTML5 <audio> tag.
            scope.currentTrack = currentTrack - 1;
          }
          // console.log('playControl');
        });

        /**
         * On playlist updated
         */
        scope.$watch('list', function( newPlaylist, oldPlaylist ) {

          if (angular.isDefined(newPlaylist)) {
            // If exist playlist init current track
            scope.currentTrack = 0;
          }

        });

      }
    };
  });
