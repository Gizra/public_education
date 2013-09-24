'use strict';

angular.module('publicEducationApp', ['config', 'angular-audio-player', 'angularLocalStorage', 'leaflet-directive'])
  .config(function ($routeProvider, $httpProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'listMarkersCtrl'
      })
      .when('/add-marker', {
        templateUrl: 'views/add-marker.html',
        controller: 'addMarkerCtrl'
      })
      .when('/play-marker/:venueId', {
        templateUrl: 'views/play-marker.html',
        controller: 'playMarkerCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

    delete $httpProvider.defaults.headers.common['X-Requested-With'];
  });
