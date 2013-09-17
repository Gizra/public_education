'use strict';

angular.module('publicEducationApp')
  .service('Leaflet', function Leaflet() {

    return {

      data: {
        "leaflet": {},
        "markers": {},
        "marker": null
      },

      /**
       * Return all the cart items (products, line items).
       */
      getLeafletBase: function() {
        this.data.leaflet = {
          defaults: {
            maxZoom: 20,
            minZoom: 14

          },
          center: {
            lat: 41.0383,
            lng: 28.9869,
            zoom: 16
          }
        }

        return this.data.leaflet;
      }
    }

  });
