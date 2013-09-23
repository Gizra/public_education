'use strict';

angular.module('publicEducationApp')
  .controller('playMarkerCtrl', function ($scope, $routeParams, $location) {

    $scope.venueId = $routeParams.venueId;

    // @todo: Get as response from server.
    $scope.markers = {
      // Array keyed by FourSquare's Venue ID.
      '513ee460e4b06c84bc3599d1': {
        name: 'Topçular Semt Polikliniği',
        lat: 41.0383,
        lng: 28.9869,
        playList: [
          {
            src: 'http://upload.wikimedia.org/wikipedia/en/7/79/Korn_-_Predictable_%28demo%29.ogg',
            text: '1st text',
            user: {
              name: 'amitaibu',
              photo: 'https://graph.facebook.com/amitai.burstein/picture'
            }
          },
          {
            src: 'http://www.metadecks.org/software/sweep/audio/demos/vocal2.ogg',
            text: '2nd  text',
            user: {
              name: 'Bruce',
              photo: 'https://graph.facebook.com/brice.lenfant/picture'
            }
          },
          {
            src: 'http://demos.w3avenue.com/html5-unleashed-tips-tricks-and-techniques/demo-audio.ogg',
            text: '3rd text',
            user: {}
          }
        ]
      }
    };

    if (!$scope.markers[$scope.venueId]) {
      // Redirect to homepage on wrong venue ID.
      $location.path('/');
    }

    $scope.selectedMarker = $scope.markers[$scope.venueId];

  });
