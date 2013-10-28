'use strict';

angular.module('publicEducationApp')
  .controller('loginCtrl', function ($scope, User, $location, BACKEND_URL) {

    User.getUser().then(function(data) {
      // @todo: Redirect is user already logged in.
        console.log(data);
        $scope.user = data;
      });

    // Get the backend URL.
    $scope.backendUrl = BACKEND_URL;

    $scope.testGeo = function() {
      // Testing investigation.
      // http://stackoverflow.com/questions/1673579/location-permission-alert-on-iphone-with-phonegap
      navigator.geolocation.getCurrentPosition(function(position) {
        console.log('geolocation work');
        console.log('timestamp: ', position.timestamp);
      }, function(err) {
        console.log('geolocation error: ', err);
      });
    }

  });
