angular.module("leaflet-directive").service('leafletData', function ($log, $q) {
    var maps = {
        main: $q.defer()
    };
    var tiles = {
        main: $q.defer()
    };
    var layers = {
        main: $q.defer()
    };
    var paths = {
        main: $q.defer()
    };
    var markers = {
        main: $q.defer()
    };
    var defaults = {};

    function getDefer(d, scopeId) {
        if (!isDefined(scopeId)) {
            scopeId = "main";
        }
        var defer;
        if (!isDefined(d[scopeId])) {
            defer = $q.defer();
            d[scopeId] = defer;
        } else {
            defer = d[scopeId];
        }
        return defer;
    }

    this.setMap = function(leafletMap, scopeId) {
        var map = getDefer(maps, scopeId);
        map.resolve(leafletMap);
    };

    this.getMap = function(scopeId) {
        var map = getDefer(maps, scopeId);
        return map.promise;
    };

    this.getDefaults = function() {
        return defaults;
    };

    this.setDefaults = function(leafletDefaults) {
        defaults = leafletDefaults;
    };

    this.getPaths = function(scopeId) {
        var path = getDefer(paths, scopeId);
        return path.promise;
    };

    this.setPaths = function(leafletPaths, scopeId) {
        var path = getDefer(paths, scopeId);
        path.resolve(leafletPaths);
    };

    this.getMarkers = function(scopeId) {
        var marker = getDefer(markers, scopeId);
        return marker.promise;
    };

    this.setMarkers = function(leafletMarkers, scopeId) {
        var marker = getDefer(markers, scopeId);
        marker.resolve(leafletMarkers);
    };

    this.getLayers = function(scopeId) {
        var layer = getDefer(layers, scopeId);
        return layer.promise;
    };

    this.setLayers = function(leafletLayers, scopeId) {
        var layer = getDefer(layers, scopeId);
        layer.resolve(leafletLayers);
    };

    this.setTiles = function(leafletTiles, scopeId) {
        var tile = getDefer(tiles, scopeId);
        tile.resolve(leafletTiles);
    };

    this.getTiles = function(scopeId) {
        var tile = getDefer(tiles, scopeId);
        return tile.promise;
    };
});
