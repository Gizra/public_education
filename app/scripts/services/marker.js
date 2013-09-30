'use strict';

angular.module('publicEducationApp')
  .service('Marker', function Marker($q, $http, $timeout) {

    return {

      // Private variable to hold the state.
      data: {
        markers: []
      },

      getMarkers: function() {
        var defer = $q.defer();

        // @todo: Get as response from server.
        var markers = {
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

        // @todo: Simulating http, replace with actuall call to server.
        $timeout(function() {
          defer.resolve(markers);
        }, 500);

        return defer.promise;
      }
    };
  });
