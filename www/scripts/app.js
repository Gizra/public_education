'use strict';

angular.module('publicEducationApp', ['leaflet-directive'])
  .config(function ($routeProvider, $httpProvider) {
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

    delete $httpProvider.defaults.headers.common['X-Requested-With'];
  });
