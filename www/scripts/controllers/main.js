'use strict';

angular.module('publicEducationApp')
  .controller('ListMarkersCtrl', function ($scope, Leaflet, storage) {

    angular.extend($scope, Leaflet.getDefaults());
    storage.bind($scope,'center', {defaultValue: Leaflet.getCenter()});

    angular.extend($scope, {
      markers: {
        '513ee460e4b06c84bc3599d1': {
          lat: 41.0383,
          lng: 28.9869,
          // @todo: Remove hardcoding.
          message: 'This is Gezi Parki',
          focus: false,
          draggable: false
        },
        marker2: {
          lat: 41.0383,
          lng: 28.96,
          message: 'This is Barcelona. You can not drag me',
          focus: false,
          draggable: false
        }
      }
    });

    angular.forEach(['zoomend','moveend'], function(value) {
      $scope.$on('leafletDirectiveMap.' + value, function() {
        Leaflet.setCenter($scope.center);
      });
    });

  });
