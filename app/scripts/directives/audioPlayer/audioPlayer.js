'use strict';

angular.module('publicEducationApp')
  .directive('audioPlayer', function (Phonegap) {
    return {
      templateUrl: 'scripts/directives/audioPlayer/audioPlayer.html',
      restrict: 'E',
      scope: {
        playlist: '=playlist'
      },
      link: function postLink(scope, element, attrs) {

        scope.isPhoneGap = Phonegap.isMobile.any();
      }
    };
  });
