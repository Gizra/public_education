'use strict';

angular.module('publicEducationApp')
  .service('User', function User($http, BACKEND_URL) {

    return {

      // Private variable to hold the state.
      data: {
        user: null
      },

      getUser: function() {
        return $http({
          method: 'GET',
          url: BACKEND_URL + '/account',
          cache: true,
          withCredentials: true
        });
      }
    };
  });
