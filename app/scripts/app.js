'use strict';

angular.module('publicEducationApp', [
    'config',
    'angular-audio-player',
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
      .when('/add-marker/:provider', {
        templateUrl: 'views/add-marker.html',
        controller: 'AddMarkerCtrl'
      })
      .when('/play-marker/:venueId', {
        templateUrl: 'views/play-marker.html',
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

    OAuth.initialize('nCYMyRVLEfy-4Sk_TPQCaey4Hhk');
  });
