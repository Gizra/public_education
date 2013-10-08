'use strict';

angular.module('publicEducationApp', ['config', 'angular-audio-player', 'angularLocalStorage', 'leaflet-directive'])
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
        controller: 'PlayMarkerCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'loginCtrl'
      })
      .when('/play-mode/:venueId', {
        templateUrl: 'views/play-mode.html',
        controller: 'PlayMarkerCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

    delete $httpProvider.defaults.headers.common['X-Requested-With'];
  });
