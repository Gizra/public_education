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

        this.data.markers[id].playList = this.data.markers[id].playList || [];
        this.data.markers[id].playList.unshift(newMarker);

        // Add the venue information to the uploded marker, so we can create
        // a Venue record if it doesn't exist yet, without re-calling
        // FourSquare.
        newMarker.venue = {
          venueId: venue.id,
          name: venue.name,
          lat: venue.lat,
          lng: venue.lng
        }

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
      gettingMarkers: function() {
        var self = this;
        return $http({
          method: 'GET',
          url: BACKEND_URL + '/get-markers'
        }).success(function (data) {
          self.data.markers = data;
        });
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

          // @todo: get from file name.
          options.mimeType = 'audio/wav';
        }
        else if (Phonegap.isMobile.Android()) {
          fileURI = '/mnt/sdcard/' + marker.src;
          options.mimeType = 'audio/amr';
        }
        else {
          // Development.
          fileURI = '/tmp/' + marker.src;
          options.mimeType = 'audio/amr';
        }

        options.fileName = fileURI.substr(fileURI.lastIndexOf('/')+1);
        // We need to stringfy the marker.
        options.params = {marker: JSON.stringify(marker)};


        ft.upload(fileURI, BACKEND_URL + '/add-marker', function onSuccess(result) {
          console.log('Response = ' + result.response);
          defer.resolve(result);
        }, function onError(error) {
          console.log('An error has occurred: Code = ' + error.code);
          console.log(error);
          defer.reject(error);
        }, options);

        return defer.promise;
      }
    };
  });
