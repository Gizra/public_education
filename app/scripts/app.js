'use strict';

angular.module('publicEducationApp', [
    'config',
    'audioPlayer',
    'angularLocalStorage',
    'leaflet-directive',
    'angular-md5'
  ])
  .config(function ($routeProvider, $httpProvider) {

    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'ListMarkersCtrl'
      })
      .when('/custom-css/:route', {
        templateUrl: 'views/main.html',
        controller: 'ListMarkersCtrl'
      })
      .when('/add-marker', {
        templateUrl: 'views/add-marker.html',
        controller: 'AddMarkerCtrl'
      })
      .when('/play-marker/:venueId', {
        templateUrl: 'views/play-marker.html',
        resolve: {
          // Set the map's center before execute controller, so the "old center"
          // and "center" in Leaflet are not the same.
          centerMap: ['Leaflet', 'Marker', '$route', function(Leaflet, Marker, $route) {
            // Geting venue information.
            Marker.gettingMarkers().then(function(data) {
              var lat, lng, zoom;
              lat = data[$route.current.params.venueId].lat;
              lng = data[$route.current.params.venueId].lng;
              zoom = 18;

              Leaflet.setCenter({lat: lat, lng: lng, zoom: zoom});
            });
          }]
        },
        controller: 'PlayMarkerCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'loginCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

    delete $httpProvider.defaults.headers.common['X-Requested-With'];
  });
