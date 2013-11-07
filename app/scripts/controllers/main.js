'use strict';

angular.module('publicEducationApp')
  .controller('ListMarkersCtrl', function ($scope, $window, Leaflet, storage, Marker, Geolocation, $location, $timeout, IS_MOBILE, $routeParams, CUSTOM_CSS) {

    // Storage custom css information in the LocalStorage.
    storage.bind($scope,'isCustomCss', {defaultValue: false});
    storage.bind($scope,'customCss', {defaultValue: 'reset-custom-css'});

    if ($routeParams.route === CUSTOM_CSS.route) {
      // Activate custom css.
      $scope.isCustomCss = true;
      $scope.customCss = $scope.customCss + ' ' +  CUSTOM_CSS.css;
    }
    else if ($routeParams.route === 'reset') {
      // Return default values.
      $scope.isCustomCss = false;
      $scope.customCss = 'reset-custom-css';
    }

    // Reset the route to main view, when activate/deactivate a custom css.
    if ($routeParams.route) {
      $location.path('/');
    }


    // Leaflet default values.
    angular.extend($scope, Leaflet.getDefaults());
    storage.bind($scope,'center', {defaultValue: Leaflet.getCenter()});
    $scope.markers = {};
    $scope.marker = {};
    $scope.marker.lat = $scope.center.lat;
    $scope.marker.lng = $scope.center.lng;


    $scope.getCurrentPosition = function() {
      Geolocation.gettingCurrentPosition().then(function(data) {
        $scope.center.lat = data.lat;
        $scope.center.lng = data.lng;
        $scope.center.zoom = 16;
      });


      // Set Current position marker. By using "marker" instead of "markers" we
      // assure it's going to be the first marker in the list.
      $scope.marker = {};
      $scope.marker.lat = $scope.center.lat;
      $scope.marker.lng = $scope.center.lng;
      // Set icon current position.
      $scope.marker.icon = $window.L.divIcon({
        iconSize: [30, 35],
        // Set the icon according to the playlist count.
        html: '<div class="marker-icon-current"></div>',
        // @todo: angular-leaflet fails without this one.
        iconAnchor:   [15, 35]
      });
    };

    if (!Geolocation.checkGotCurrentPosition()) {
      Geolocation.setGotCurrentPosition();
      if (IS_MOBILE) {
        // Devices.
        document.addEventListener('deviceready', $scope.getCurrentPosition, false);
      }
      else {
        // Web.
        $scope.getCurrentPosition();
      }
    }


    $scope.playAllMarkers = function() {
      Marker.setPlayingAllMarkers(true);
      $scope.redirectToFirstVenue();
    };


    $scope.$watch('markers', function() {
      if (Marker.isPlayingAllMarkers()) {
        $scope.redirectToFirstVenue();
      }
    });

    $scope.redirectToFirstVenue = function() {
      // Redirect to the first venueId.
      angular.forEach($scope.markers, function(marker, key) {
        $location.path('/play-marker/' + key);
      });
    };


    // Get markers.
    var getMarkers = function() {
      Marker.gettingMarkers().then(function(data) {

        angular.forEach(data, function(marker, key) {
          marker.icon = $window.L.divIcon({
            iconSize: [30, 35],
            // Set the icon according to the playlist count.
            html: '<div class="marker-icon">' + marker.playList.length + '</div>',
            // @todo: angular-leaflet fails without this one.
            iconAnchor:   [15, 35]
          });

          $scope.markers[key] = marker;
        });

        // @todo: create a directive? or look for a best way with css?
      })
        // Refresh markers each minute, after data was received.
        .then($timeout(getMarkers, 60000).resolve);
    };

    // Initial request get markers.
    getMarkers();

    angular.forEach(['zoomend','moveend'], function(value) {
      $scope.$on('leafletDirectiveMap.' + value, function() {
        Leaflet.setCenter($scope.center);
      });
    });

    $scope.$on('leafletDirectiveMarker.click', function (event, args) {
      // Redirect to play-marker, when user clicks a marker.
      $location.path('/play-marker/' + args.markerName);
    });

    $scope.isMobile = IS_MOBILE;
  });
