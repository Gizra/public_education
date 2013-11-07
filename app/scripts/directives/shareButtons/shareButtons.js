'use strict';

angular.module('publicEducationApp')
  .directive('shareButtons', function ($window) {
    return {
      templateUrl: 'scripts/directives/shareButtons/shareButtons.html',
      restrict: 'E',
      scope: {
        text: '=text',
        id: '=id',
        webUrl: '=webUrl'
      },
      link: function postLink(scope, element, attrs) {

        scope.webUrl = scope.webUrl + '/#/play-marker/' + scope.id;

        /**
         * Share link to twitter, facebook, email.
         */
        scope.shareLink = function(method) {
          var url;
          scope.encodedWebUrl = encodeURIComponent(scope.webUrl);
          var text = scope.text + '-' + scope.encodedWebUrl;

          if (method === 'twitter') {
            url = 'https://twitter.com/share?text=' + text;
          }
          else if (method === 'facebook') {
            url = 'http://www.facebook.com/sharer/sharer.php?s=100&p[url]=' + scope.encodedWebUrl + '&p[title]=Public%20Education&p[summary]=' + text;
          }
          else if (method === 'email') {
            url = 'mailto:?body=' + text + ' - ' + scope.encodedWebUrl;
          }

          $window.open(url, method, 'width=626,height=445');
        };
      }
    };
  });
