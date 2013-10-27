'use strict';

angular.module('publicEducationApp')
  .service('Leaflet', function Leaflet() {

    return {

      // Private variable to hold the state.
      data: {
        leaflet: {
          center: {
            lat: 41.0383,
            lng: 28.9869,
            zoom: 16
          },
          icons: {
            markerIcon: L.icon({
              iconUrl: '../images/Add_btn.png',
              iconRetinaUrl: '../images/Add_btn@2x.png',
              iconSize:     [92, 102],
              iconAnchor:   [12, 101]
            }),
            default_icon: L.icon({
              iconUrl: '../images/Add_btn.png',
              iconRetinaUrl: '../images/Add_btn@2x.png',
              iconSize:     [92, 102],
              iconAnchor:   [12, 101]
            })
          }
        },
        markers: {},
        marker: null
      },

      getDefaults: function() {
        return {
          defaults: {
            tileLayer: 'http://{s}.tiles.mapbox.com/v3/mushon.map-wjhkqj4n/{z}/{x}/{y}.png',
            maxZoom: 20,
            minZoom: 14,
            attributionControl: false
          }
        };
      },

      /**
       * Return all the cart items (products, line items).
       */
      getCenter: function() {
        return this.data.leaflet.center;
      },

      setCenter: function(center) {
        this.data.leaflet.center = center;
      },

      /**
       * Return an object with the custom icon.
       *
       * @returns {*}
       */
      getIcons: function() {
        return this.data.leaflet.icons;
      }
    };

  });
