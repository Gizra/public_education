'use strict';

angular.module('publicEducationApp')
  .service('Foursquare', function Foursquare($http, $q) {

    return {

      getVenue: function(lat, lng) {
        var defer = $q.defer();

        $http({
          method: "GET",
          url: "https://api.foursquare.com/v2/venues/search",
          params: {
            ll: lat + ',' + lng,
            v: 20130917,
            // @todo: Change to anonymous request.
            oauth_token: "ARSXRAKVBW1D3KGHZVHN0IGHAITQQTIYXSKIKS2SWOSYHQEU",
            limit: 1
          },
          // Cache the results.
          cache: true
        })
          .success(function (data) {
            defer.resolve(data.response.venues[0]);
          })
          .error(function (data, status) {
          });

        return defer.promise;
      }
    }

  });
