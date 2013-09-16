'use strict';

angular.module('publicEducationApp')
  .directive('map', function () {
    return {
      template: '<div id="map"></div>',
      restrict: 'E',
      scope: {
        // Pass the records array.
        records: '=',
        // The current lng and lat.
        lng: '=',
        lat: '='
      },
      link: function postLink(scope, element, attrs) {
        var map = L.map('map').setView([51.505, -0.09], 13);

        map.locate({setView : true, maxZoom: 13});

        L.tileLayer('http://{s}.tiles.mapbox.com/v3/niryariv.map-n3zuwkkz/{z}/{x}/{y}.png', {
          attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
          maxZoom: 18
        }).addTo(map);

        map.on('click', function(e) {
          scope.$apply(function() {
            // scope.lng = e.latlng.lng;
          });
        });

        scope.$watch('lng', function(newVal, oldVal) {
          if (newVal !== undefined) {
            map.setView([newVal, -0.09], 13);
          }
        });
      }
    };
  });
