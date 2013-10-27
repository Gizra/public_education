'use strict';

angular.module('publicEducationApp')
  .factory('OAuthIo', function ($window, $http, $q, OAUTHIO) {

    /**
     * Store some data to maintain cache.
     *
     * token: public or private token resolve from the provider.
     * user: {*} username, name, photo of the user.
     */
    var data = {
      token: null,
      user: {
        username: null,
        name: null,
        photo: null,
        provider: null
      }
    };

    /**
     * Request data from facebook with the token and store in service property data.user.
     *
     * @param token
     * @param provider
     *
     * @returns {*}
     *  promise
     */
    function gettingFacebookData(token) {
      var deferred = $q.defer();
      var url;

      // Create URL for each provider.
      // Request data to facebook.
      $http({
        method: 'GET',
        url: 'https://graph.facebook.com/me',
        params: {
          fields: 'name,username',
          access_token: token
        }
      }).success(function(result) {
          data.user.username = result.username;
          data.user.name = result.name;
          data.user.photo = 'https://graph.facebook.com/'+ result.username +'/picture';
          data.user.provider = 'facebook';

          deferred.resolve(data.user);
        });

      return deferred.promise;
    }

    // Public API OAuthIo.
    return {
      /**
       * Get the basic user (username. name, photo) information from a provider
       * (facebook, twitter).
       *
       * @param provider
       *   Indicate the name of the provider.
       * @returns {*}
       */
      auth: function (provider) {
        var deferred = $q.defer();

        // Get the token from OAuth.io
        var OAuth = $window.OAuth;
        OAuth.initialize(OAUTHIO.id);
        OAuth.popup(provider, function(err, success) {
          if (!success) {
            return;
          }

          if (provider === 'facebook') {
            data.token = success.access_token;
            deferred.resolve(gettingFacebookData(data.token));
          }
          else if (provider === 'twitter') {
            data.token = success.oauth_token;
            // @todo require implementation for twitter API
            deferred.reject({msg:'require implementation'});
          }
        });

        return deferred.promise;
      },

      /**
       * Get user data information stored
       *
       * @returns {*}
       */
      getUser: function() {

        return data.user;
      }
    };
  });
