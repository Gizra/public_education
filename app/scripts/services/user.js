'use strict';

angular.module('publicEducationApp')
  .service('User', function User($http, $q, BACKEND_URL) {

    return {

      // Private variable to hold the state.
      data: {
        user: null
      },

      getUser: function() {
        var defer = $q.defer();

        $http({
          method: 'GET',
          url: BACKEND_URL + '/account',
          cache: true,
          withCredentials: true
        })
          .success(function (data) {
            defer.resolve(data);
          });

        return defer.promise;
      }
    };
  });
