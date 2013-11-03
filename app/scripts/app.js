'use strict';

angular.module('publicEducationApp', [
    'config',
    'angular-audio-player',
    'angularLocalStorage',
    'leaflet-directive',
    'angular-md5'
  ])
  .config(function ($routeProvider, $httpProvider, $compileProvider) {
    $compileProvider.urlSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|content|filesystem:chrome-extension):/);
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
