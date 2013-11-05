'use strict';

angular.module('publicEducationApp')
  .directive('addMarker', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the addMarker directive');
      }
    };
  });
