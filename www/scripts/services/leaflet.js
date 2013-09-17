'use strict';

angular.module('publicEducationApp')
  .service('Leaflet', function Leaflet() {

    return {

      // Private variable to hold the state.
      data: {
        leaflet: {
          defaults: {
            maxZoom: 20,
            minZoom: 14
          },
          center: {
            lat: 41.0383,
            lng: 28.9869,
            zoom: 16
          }
        },
        markers: {},
        marker: null
      },

      getDefaults: function() {
        return {defaults: this.data.leaflet.defaults};
      },

      /**
       * Return all the cart items (products, line items).
       */
      getCenter: function() {
        return {center: this.data.leaflet.center};
      },

      setCenter: function(center) {
        this.data.leaflet.center = center;
      }
    }

  });
