'use strict';

angular.module('publicEducationApp')
  .directive('shareLink', function ($location, $window) {
    return {
      template: '<ul class="share-btns">\n  <li><a ng-click="shareLink(\'twitter\')" class="share-tw">Share on Twitter</a></li>\n  <li><a ng-click="shareLink(\'facebook\')" class="share-fb">Share on Facebook</a></li>\n  <li><a ng-click="shareLink(\'email\')" class="share-email">Send as in an email</a></li>\n  <li><a href="{{ actualPage }}" target="_blank" class="share-link">Link to this command</a></li>\n</ul>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        scope.actualPage = $location.absUrl();

        /**
         * Share link to twitter, facebook, email.
         */
        scope.shareLink = function(method) {
          var url;
          var text = scope.selectedMarker.currentRecord.text + '-' + encodeURIComponent($location.absUrl());

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
