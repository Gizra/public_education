'use strict';

angular.module('publicEducationApp')
  .service('Marker', function Marker($q, $http, $timeout, BACKEND_URL, Phonegap, md5) {

    return {

      /**
       * Private variable to hold the state.
       *
       * - markers: List of markers in cache
       * - lastProcessing:
       *   A hash of the last marker added, during server processing set a valid
       *   hash md5, otherwise null.
       * - markersCacheTimestamp: timestamp of when marker was retrieved from
       *   server.
       */
      data: {
        markers: null,
        lastProcessingHash: null,
        markersCacheTimestamp: null
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
            playList: []
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

        // Creating hash form a string of the newMarker obj.
        newMarker.hash = md5.createHash(angular.toJson(newMarker, false));
        this.setProcessing(newMarker.hash);

        this.data.markers[id].playList = this.data.markers[id].playList || [];
        this.data.markers[id].playList.unshift(newMarker);

        // Add the venue information to the uploaded marker, so we can create
        // a Venue record if it doesn't exist yet, without re-calling
        // FourSquare.
        newMarker.venue = {
          venueId: venue.id,
          name: venue.name,
          lat: venue.lat,
          lng: venue.lng
        };

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
      gettingMarkers: function(skipCache) {
        var self = this;
        var defer = $q.defer();
        skipCache = skipCache || false;
        var now = new Date().getTime();


        if (this.data.markersCacheTimestamp && now < (this.data.markersCacheTimestamp + 60000) && !skipCache) {
          // Return markers from cache.
          defer.resolve(this.data.markers);
          return defer.promise;
        }

        $http({
          method: 'GET',
          url: BACKEND_URL + '/get-markers'
        }).success(function (data) {
          // Update the timestamp of the response from the server.
          self.data.markersCacheTimestamp = new Date().getTime();

          // Check if resolve cache or server data.
          if (self.isProcessing(data)) {
            defer.resolve(self.data.markers);
          }
          else {
            // Update cache.
            self.data.markers = data;
            defer.resolve(data);
          }
        });

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

        var ft = Phonegap.getFileTransfer();
        var options = Phonegap.getFileUploadOptions();

        var fileURI;
        if (Phonegap.isMobile.iOS()) {
          fileURI = window.appRootDir.fullPath + '/' + marker.src;
          options.mimeType = 'audio/wav';
        }
        else if (Phonegap.isMobile.Android()) {
          fileURI = '/mnt/sdcard/' + marker.src;
          options.mimeType = 'audio/amr';

          // Request headers needs to be in the following format.
          // @see https://github.com/superjoe30/node-multiparty/pull/15
          var headers = {'Content-type': 'multipart/form-data; boundary=+++++'};
          options.headers = headers;
        }
        else {
          // Development.
          fileURI = '/tmp/' + marker.src;
          options.mimeType = 'audio/amr';
        }

        options.fileName = fileURI.substr(fileURI.lastIndexOf('/')+1);

        // We need to stringify the marker.
        options.params = {marker: JSON.stringify(marker)};

        ft.upload(fileURI, BACKEND_URL + '/add-marker', function onSuccess(result) {
          defer.resolve(result);
        }, function onError(error) {
          console.log('An error has occurred: Code = ' + error.code);
          console.log(error);
          defer.reject(error);
        }, options);

        return defer.promise;
      },

      /**
       * Validate if the server still processing the last marker inserted;
       * return true when last marker was processed by the server, but false.
       *
       * @param markers
       *   marker for the server
       * @returns true|false
       *
       */
      isProcessing: function(markers) {
        var self = this;

        // Set timeout to abort cache in case of server issues.
        $timeout(function() {
          self.data.lastProcessingHash = null;
        }, 600000);

        // Check if hash exist in markers
        if (markers && self.data.lastProcessingHash) {
          angular.forEach(markers, function(marker) {
            angular.forEach(marker.playList, function(record) {
              if (record.hash == self.data.lastProcessingHash) {
                self.data.lastProcessingHash = null;
              }
            });
          });
        }

        return (self.data.lastProcessingHash) ? true : false;
      },
      /**
       * Set the a status property to know when the marker was processed by the server.
       *
       * @param hash
       *   Hash to identify the last marker inserted.
       */
      setProcessing: function(hash) {
        this.data.lastProcessingHash = hash;
      }
    };
  });
