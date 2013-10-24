'use strict';

angular.module('publicEducationApp')
  .factory('OAuthIo', function ($window, $http, $q) {
    var OAuth = $window.OAuth;
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
     */
    function getFacebookData(token) {
      var deferred = $q.defer();

      // Request data to facebook.
      $http({
        method: 'GET',
        url: 'https://graph.facebook.com/me?fields=picture.type(small),name,username&access_token=' + token
      }).success(function(result) {
          data.user.username = result.username;
          data.user.name = result.name;
          data.user.photo = result.picture.data.url;

          deferred.resolve(data.user);
        });

      return deferred.promise
    }

    function getTwitterData() {
      return true;
    }

    // Public API OAuthIo
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
              deferred.resolve(getFacebookData(data.token));
            }
            else if ('twitter') {
              data.token = result.oauth_token
              getTwitterData();
            }
          }
        });
        return deferred.promise;
      }

    };
  });
