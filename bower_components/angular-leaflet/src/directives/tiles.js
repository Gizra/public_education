angular.module("leaflet-directive").directive('tiles', function ($log, leafletData) {
    return {
        restrict: "A",
        scope: false,
        replace: false,
        transclude: false,
        require: 'leaflet',

        link: function($scope, element, attrs, controller) {
            var defaults = parseMapDefaults($scope.defaults);
            var tiles = $scope.tiles;

            controller.getMap().then(function(map) {

                var tileLayerObj;
                var tileLayerUrl = defaults.tileLayer;
                var tileLayerOptions = defaults.tileLayerOptions;

                if (angular.isDefined(tiles) && angular.isDefined(tiles.url)) {
                    tileLayerUrl = tiles.url;
                    $scope.$watch("tiles.url", function(url) {
                        if (angular.isDefined(url)) {
                            tileLayerObj.setUrl(url);
                        }
                    });
                } else {
                    $log.warn("[AngularJS - Leaflet] The 'tiles' definition doesn't have the 'url' property.");
                }

                if (angular.isDefined(tiles) && angular.isDefined(tiles.options)) {
                    angular.copy(tiles.options, tileLayerOptions);
                }

                tileLayerObj = L.tileLayer(tileLayerUrl, tileLayerOptions);
                tileLayerObj.addTo(map);
                leafletData.setTiles(tileLayerObj, attrs.id);
            });
        }
    };
});
