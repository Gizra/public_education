'use strict';

angular.module('publicEducationApp', [
    'config',
    'angular-audio-player',
    'angularLocalStorage',
    'leaflet-directive',
    'angular-md5',
    'btford.phonegap.ready',
    'btford.phonegap.geolocation'
  ])
  .config(function ($routeProvider, $httpProvider) {
    $routeProvider
//      .when('/', {
//        templateUrl: 'views/main.html',
//        controller: 'ListMarkersCtrl'
      .when('/', {
        templateUrl: 'views/testPhonegap.html',
        controller: 'TestphonegapCtrl'
      })
      .when('/add-marker', {
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
      .when('/testPhonegap', {
        templateUrl: 'views/testPhonegap.html',
        controller: 'TestphonegapCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

    delete $httpProvider.defaults.headers.common['X-Requested-With'];
  });
