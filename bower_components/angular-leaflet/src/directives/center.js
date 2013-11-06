angular.module("leaflet-directive").directive('center', function ($log, $parse) {
    return {
        restrict: "A",
        scope: false,
        replace: false,
        transclude: false,
        require: 'leaflet',

        link: function($scope, element, attrs, controller) {
            var defaults = parseMapDefaults($scope.defaults);
            var center = $scope.center;
            var bounds = $scope.bounds;

            controller.getMap().then(function(map) {

                if (isDefined(center)) {
                    if (center.autoDiscover === true) {
                        map.locate({ setView: true, maxZoom: defaults.maxZoom });
                    }

                    var centerModel = {
                        lat:  $parse("center.lat"),
                        lng:  $parse("center.lng"),
                        zoom: $parse("center.zoom")
                    };
                } else {
                    map.setView([defaults.center.lat, defaults.center.lng], defaults.center.zoom);
                    $log.warn("[AngularJS - Leaflet] 'center' is undefined in the current scope, did you forget to initialize it?");
                }

                var movingMap = false;

                $scope.$watch("center", function(center) {
                    if (!isValidCenter(center)) {
                        $log.warn("[AngularJS - Leaflet] invalid 'center'");
                        updateCenter(map, defaults.center);
                        return;
                    }
                    if (movingMap) {
                        // Can't update. The map is moving.
                        return;
                    }
                    updateCenter(map, center);
                }, true);

                map.on("movestart", function(/* event */) {
                    movingMap = true;
                });

                map.on("moveend", function(/* event */) {
                    movingMap = false;
                    safeApply($scope, function(scope) {
                        if (centerModel) {
                            centerModel.lat.assign(scope, map.getCenter().lat);
                            centerModel.lng.assign(scope, map.getCenter().lng);
                            centerModel.zoom.assign(scope, map.getZoom());
                        }
                        scope.$emit("centerUpdated");
                    });
                });

                function updateBoundsInScope(map) {
                    if (!bounds) {
                        return;
                    }

                    var leafletBounds = map.getBounds();
                    var sw_latlng = leafletBounds.getSouthWest();
                    var ne_latlng = leafletBounds.getNorthEast();
                    bounds = {
                        southWest: {
                            lat: sw_latlng.lat,
                            lng: sw_latlng.lng
                        },
                        northEast: {
                            lat: ne_latlng.lat,
                            lng: ne_latlng.lng
                        }
                    };
                }

                function updateCenter(map, center) {
                    map.setView([center.lat, center.lng], center.zoom);
                    updateBoundsInScope(map);
                }

                function isValidCenter(center) {
                    return isDefined(center) && isNumber(center.lat) && isNumber(center.lng) && isNumber(center.zoom);
                }

            });
        }
    };
});
