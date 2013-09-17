'use strict';

angular.module('publicEducationApp', ["leaflet-directive"])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'listMarkersCtrl'
      })
      .when('/add-marker', {
        templateUrl: 'views/add-marker.html',
        controller: 'AddMarkerCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
