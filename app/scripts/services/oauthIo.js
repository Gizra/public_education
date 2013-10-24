'use strict';

angular.module('publicEducationApp')
  .factory('OAuthIo', function ($window, $http, $q) {
    var OAuth = $window.OAuth;
    // @todo Integrate with the new config file, require merge with master.
    OAuth.initialize('nCYMyRVLEfy-4Sk_TPQCaey4Hhk');

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
        photo: null
      }
    };

    /**
     * Request data from facebook with the token and store in service property data.user.
     *
     * @param token
     * @returns {*}
     *  promise
     */
    function gettingUserData(token, provider) {
      var deferred = $q.defer();
      var url;

      // Create URL for each provider.
      if (provider === 'facebook') {
        url = 'https://graph.facebook.com/me?fields=picture.type(small),name,username&access_token=' + token;
      }

      // Request data to facebook.
      $http({
        method: 'GET',
        url: url
      }).success(function(result) {
          if (provider === 'facebook') {
            data.user.username = result.username;
            data.user.name = result.name;
            data.user.photo = result.picture.data.url;
          }
          
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
        OAuth.popup(provider, function(err, result) {
          if (result) {
            if ('facebook') {
              data.token = result.access_token;
              deferred.resolve(gettingUserData(data.token, 'facebook'));
            }
            else if ('twitter') {
              data.token = result.oauth_token;
              deferred.resolve(gettingUserData(data.token, 'twitter'));
            }
          }
        });

        return deferred.promise;
      }

    };
  });
