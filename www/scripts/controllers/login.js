'use strict';

angular.module('publicEducationApp')
  .controller('loginCtrl', function ($scope, User, $location, BACKEND_URL) {

    User.getUser().then(function(data) {
      // @todo: Redirect is user already logged in.
      $scope.user = data;
    });

    // Get the backend URL.
    $scope.backendUrl = BACKEND_URL;


  });
