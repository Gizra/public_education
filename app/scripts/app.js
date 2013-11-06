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
      .when('/add-marker', {
        templateUrl: 'views/add-marker.html',
        controller: 'AddMarkerCtrl'
      })
      .when('/play-marker/:venueId', {
        templateUrl: 'views/play-marker.html',
        controller: 'PlayMarkerCtrl',
        resolve: {
          centerMap: ['Leaflet', 'Marker', '$route', function(Leaflet, Marker, $route) {
            // Geting markers to get venue.
            Marker.gettingMarkers().then(function(data) {
              var lat, lng, zoom;
              lat = data[$route.current.params.venueId].lat;
              lng = data[$route.current.params.venueId].lng;
              zoom = 18;

              // Set center before execute controller
              Leaflet.setCenter({lat: lat, lng: lng, zoom: zoom});
            });


          }]
        }
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
