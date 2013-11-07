'use strict';

angular.module('publicEducationApp')
  .directive('shareButtons', function () {
    return {
      templateUrl: 'scripts/directives/shareButtons/shareButtons.html',
      restrict: 'E',
      scope: {
        webUrl: '=webUrl'
      }
      link: function postLink(scope, element, attrs) {

        /**
         * Share link to twitter, facebook, email.
         */
        scope.shareLink = function(method) {
          var url;
          var text = $scope.selectedMarker.currentRecord.text + '-' + encodeURIComponent($location.absUrl());

          if (method === 'twitter') {
            url = 'https://twitter.com/share?text='+text;
          }
          else if (method === 'facebook') {
            url = 'http://www.facebook.com/sharer/sharer.php?s=100&p[url]=' + encodeURIComponent($location.absUrl()) + '&p[title]=Public%20Education&p[summary]=' + text;
          }
          else if (method === 'email') {
            url = 'mailto:?body=' + text + ' - ' + encodeURIComponent($location.absUrl());
          }

          $window.open(url, method, 'width=626,height=445');
        };
      }
    };
  });
