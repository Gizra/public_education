'use strict';

angular.module('publicEducationApp')
  .factory('OAuthIo', function ($window) {
    var OAuth = $window.OAuth;
    OAuth.initialize('nCYMyRVLEfy-4Sk_TPQCaey4Hhk');

    function getFacebookData() {
      return true;
    }

    function getTwitterData() {
      return true;
    }

    // Public API OAuthIo
    return {
      /**
       * Store some data to maintain cache.
       *
       * token: public or private token resolve from the provider.
       * user: {*} username, name, photo of the user.
       */
      data: {
        token: null,
        user: {
          init: true
        }
      },
      /**
       * Get the basic user (username. name, photo) information from a provider
       * (facebook, twitter).
       *
       * @param provider
       *   Indicate the name of the provider.
       * @returns {*}
       */
      auth: function (provider) {
        var self = this;

        // Get the token from OAuth.io
        OAuth.popup(provider, function(err, result) {
          if (result) {
            if ('facebook') {
              self.data.token = result.access_token;
              getFacebookData();
            }
            else if ('twitter') {
              self.data.token = result.oauth_token
              getTwitterData();
            }
          }
        });
        return this.data.user;
      }

    };
  });
