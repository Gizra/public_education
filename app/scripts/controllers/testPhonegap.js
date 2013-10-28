'use strict';

angular.module('publicEducationApp')
  .controller('TestphonegapCtrl', function ($scope, geolocation, $timeout) {

  var geo = function() {

    geolocation.getCurrentPosition(function (position) {
      console.log(JSON.stringify(position) );
    }, function(err) {
      console.log(JSON.stringify(err));
    }, {maximumAge: 0, timeout: 30000, enableHighAccuracy:true}); //, {frequency:500,maximumAge: 0, timeout: 10000, enableHighAccuracy:true});

    $timeout(geo, 1000).resolve
  };

  geo();

  });
