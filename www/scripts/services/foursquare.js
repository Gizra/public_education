'use strict';

angular.module('publicEducationApp')
  .service('Foursquare', function Foursquare($http, $q, FOURDQUARE) {

    return {

      getVenue: function(lat, lng) {
        var defer = $q.defer();

        $http({
          method: 'GET',
          url: 'https://api.foursquare.com/v2/venues/search',
          params: {
            ll: lat + ',' + lng,
            v: 20130917,
            client_id: FOURDQUARE.id,
            client_secret: FOURDQUARE.secret,
            limit: 1
          },
          // Cache the results.
          cache: true
        })
          .success(function (data) {
            defer.resolve(data.response.venues[0]);
          });

        return defer.promise;
      }
    };

  });
