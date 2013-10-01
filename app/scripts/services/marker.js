'use strict';

angular.module('publicEducationApp')
  .service('Marker', function Marker($q, $http, $timeout, BACKEND_URL, Phonegap) {

    return {

      // Private variable to hold the state.
      data: {
        markers: null
      },

      /**
       * Add a marker to the existing markers and send to backend.
       *
       * Note that Since we want to provide a real time expreience, we will add
       * the marker before it was sent to the backend, however the sound file
       * will not be ready yet.
       *
       * @param venue
       *   Venue object from Foursquare with 'id', 'name', 'lng', and 'lat'.
       * @param text
       *   The text entered by the user.
       * @param file
       *   The file URI to be uploaded.
       * @param location.
       *   Object with the original 'lng' and 'lat'.
       * @param user
       *   Optional; The user object to associate the recording with.
       */
      addMarker: function(venue, text, file, location, user) {
        var id = venue.id;

        this.data.markers = this.data.markers || {};

        if (!this.data.markers[id]) {
          // Add the venue data.
          this.data.markers[id] = {
            name: venue.name,
            lat: venue.lat,
            lng: venue.lng,
            playlist: []
          };
        }

        var userInfo = {};

        if (user) {
          userInfo = {
            name: user.name,
            // @todo: Deal with photo from different providers and anonymous.
            photo: user.photo
          };
        }

        // Unshift the new markers to be the first in the playlist.
        var newMarker = {
          src: file,
          text: text,
          user: userInfo,
          // Mark this marker as unprocessed yet.
          unprocessed: true,

          // Pass the original 'lng' and 'lat' to the backend.
          location: location
        };
        this.data.markers[id].playlist.unshift(newMarker);

        return this.uploadingMarker(newMarker);
      },

      /**
       * Get Leaflet markers.
       *
       * @param cache
       *   Determine if a request to the server should be done. Defaults to
       *   true.
       * @returns {*}
       */
      gettingMarkers: function(cache) {
        var defer = $q.defer();
        cache = cache || true;
        var markers;

        if (!this.data.markers || !cache) {
          // @todo: Get as response from server.
          markers = {
            // Object keyed by FourSquare's Venue ID.
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
            },
            '513ee460e4b06c84bc359988': {
              name: 'Another place',
              lat: 41.0396,
              lng: 28.9842,
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
                }
              ]
            }
          };
        }
        else {
          // Get markers from cache.
          markers = this.data.markers;
        }


        // @todo: Simulating http, replace with actual call to server.
        var self = this;
        $timeout(function() {
          self.data.markers = markers;
          defer.resolve(markers);
        }, 500);

        return defer.promise;
      },

      /**
       * Upload the new marker with the recorded file to the server.
       *
       * @param marker
       *   The marker object as prepared by Marker::addMarker().
       *
       * @returns {*}
       */
      uploadingMarker: function(marker) {
        var defer = $q.defer();

        // @todo: remove hardcoding of URI and file format.
        var fileURI = marker.src;
        var options = Phonegap.getFileUploadOptions();
        options.fileKey = 'file';
        options.fileName = fileURI.substr(fileURI.lastIndexOf('/')+1);

        // @todo: Remove hardcoding.
        options.mimeType = 'audio/amr';

        // Request headers needs to be in the following format.
        // @see https://github.com/superjoe30/node-multiparty/pull/15
        var headers = {'Content-type': 'multipart/form-data; boundary=+++++'};
        options.headers = headers;

        var ft = Phonegap.getFileTransfer();
        ft.upload(fileURI, BACKEND_URL + '/recordings/create', function onSuccess(result) {
          console.log('Response = ' + result.response);
          defer.resolve(result);
        }, function onError(error) {
          console.log('An error has occurred: Code = ' + error.code);
          defer.reject(error);
        }, options);

        return defer.promise;
      }
    };
  });
