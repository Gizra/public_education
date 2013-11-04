'use strict';

angular.module('publicEducationApp')
  .service('Geolocation', function Geolocation($q, $window, $rootScope) {

  return {
    // Private variable to hold the state.
    data: {
      gotCurrentPosition: false,
      position: null
    },

    gettingCurrentPosition: function() {
      var defer = $q.defer();

      if (!navigator.geolocation) {
        defer.reject('no geolocation');
        return defer.promise;
      }

      var self = this;

      $window.navigator.geolocation.getCurrentPosition(function(position) {
        var data = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        self.data.position = data;
        defer.resolve(data);

        // We need to invoke the digest.
        $rootScope.$digest();
      });

      return defer.promise;
    },

    /**
     * Return all the cart items (products, line items).
     */
    checkGotCurrentPosition: function() {
      return this.data.gotCurrentPosition;
    },

    setGotCurrentPosition: function() {
      this.data.gotCurrentPosition = true;
    }
  };

});
