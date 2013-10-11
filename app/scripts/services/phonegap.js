'use strict';

angular.module('publicEducationApp')
  .service('Phonegap', function Phonegap($q) {

    return {

      isMobile: {
        Android: function() {
          return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function() {
          return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function() {
          return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function() {
          return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function() {
          return navigator.userAgent.match(/IEMobile/i);
        },
        any: function() {
          return (this.Android() || this.BlackBerry() || this.iOS() || this.Opera() || this.Windows());
        }
      },

      /**
       * Get FileUploadOptions in Phonegap or a mock object if outside of a
       * Phonegap context.
       *
       * @returns {*}
       */
      getFileUploadOptions: function() {
        if (typeof cordova !== 'undefined') {
          return new FileUploadOptions();
        }

        // Not inside Phonegap, return a mock object.
        return {};

      },

      /**
       * Get FileTransfer in Phonegap or a mock object if outside of a
       * Phonegap context.
       *
       * @returns {*}
       */
      getFileTransfer: function() {
        if (typeof cordova !== 'undefined') {
          return new FileTransfer();
        }

        // Not inside Phonegap, return a mock object.
        return {
          upload: function(fileURI, route, onSuccess, onError) {
            // Invoke success.
            return onSuccess(true);
          },

          LocalFileSystem: {
            TEMPORARY: null
          }
        };
      },

      /**
       * Get Media in Phonegap or a mock object if outside of a Phonegap
       * context.
       *
       * @param file
       *   The file URI.
       * @param onSuccess
       *   Callback for success.
       * @param onError
       *   Callback for error.
       *
       * @returns {*}
       */
      getMedia: function(file, onSuccess, onError) {
        if (typeof cordova !== 'undefined') {
          return new Media(file, onSuccess, onError);
        }

        // Not inside Phonegap, return a mock object.
        return {

          startRecord: function() {
            return true;
          },

          stopRecord: function() {
            return true;
          },

          play: function() {
            return true;
          }

        };
      }
    };
  });
