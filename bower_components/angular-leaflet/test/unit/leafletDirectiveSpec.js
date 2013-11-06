'use strict';

/*jshint -W117 */
/*jshint globalstrict: true*/
/* jasmine specs for directives go here */

describe('Directive: leaflet', function() {
    var $compile = null, $rootScope = null, $timeout, leafletData = null;

    beforeEach(module('leaflet-directive'));
    beforeEach(inject(function(_$compile_, _$rootScope_, _$timeout_, _leafletData_){
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        $timeout = _$timeout_;
        leafletData = _leafletData_;
    }));

    afterEach(inject(function($rootScope) {
        $rootScope.$apply();
    }));

    it('should have loaded leaflet library inside the directive', function() {
        var element = angular.element('<leaflet></leaflet>');
        element = $compile(element)($rootScope);
        expect(element.text()).toEqual('+-Leaflet | © OpenStreetMap contributors');
    });

    it('should set default center if not center is provided', function() {
        var element = angular.element('<leaflet></leaflet>');
        element = $compile(element)($rootScope);
        leafletData.getMap($rootScope).then(function(map) {
            expect(map.getZoom()).toEqual(1);
            expect(map.getCenter().lat).toEqual(0);
            expect(map.getCenter().lng).toEqual(0);
        });
    });

    it('should set default tile if not tiles nor layers are provided', function() {
        var element = angular.element('<leaflet></leaflet>');
        element = $compile(element)($rootScope);
        leafletData.getTiles().then(function(leafletTiles) {
            expect(leafletTiles._url).toEqual(leafletData.getDefaults().tileLayer);
        });
    });

    it('should set the max zoom if specified', function() {
        angular.extend($rootScope, { defaults: { maxZoom: 15 } });
        var element = angular.element('<leaflet defaults="defaults"></leaflet>');
        element = $compile(element)($rootScope);
        leafletData.getMap().then(function(map) {
            expect(map.getMaxZoom()).toEqual(15);
        });
    });

    it('should set the min zoom if specified', function() {
        angular.extend($rootScope, { defaults: { minZoom: 4 } });
        var element = angular.element('<leaflet defaults="defaults"></leaflet>');
        element = $compile(element)($rootScope);
        leafletData.getMap().then(function(map) {
            expect(map.getMinZoom()).toEqual(4);
        });
    });

    it('should unset the minzoom if maxbounds specified', function() {
        angular.extend($rootScope, {
            defaults: {
                minZoom: 4,
            },
            maxBounds: {
                southWest: {
                    lat: 47.200,
                    lng: 15.200
                },
                northEast: {
                    lat: 47.200,
                    lng: 15.200
                }
            }
        });
        var element = angular.element('<leaflet defaults="defaults" maxBounds="maxBounds"></leaflet>');
        element = $compile(element)($rootScope);
        leafletData.getMap().then(function(map) {
            expect(map.getMinZoom()).toEqual(0);
        });
    });

    it('should set tileLayer and tileLayer options if specified', function() {
        angular.extend($rootScope, {
            defaults: {
                tileLayer: "http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png",
                tileLayerOptions: {
                    detectRetina: true,
                    opacity: 0.8
                }
            }
        });
        var element = angular.element('<leaflet defaults="defaults"></leaflet>');
        element = $compile(element)($rootScope);
        leafletData.getTiles().then(function(leafletTiles) {
            expect(leafletTiles.options.detectRetina).toEqual(true);
            expect(leafletTiles.options.opacity).toEqual(0.8);
            expect(leafletTiles._url).toEqual("http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png");
            expect(leafletData.getDefaults().tileLayer).toEqual("http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png");
        });
    });

    it('should set zoom control button properly if zoomControlPosition option is set', function() {
        angular.extend($rootScope, {
            defaults: {
                zoomControlPosition: 'topright'
            }
        });
        var element = angular.element('<leaflet defaults="defaults"></leaflet>');
        element = $compile(element)($rootScope);
        leafletData.getMap().then(function(map) {
            expect(map.zoomControl.getPosition()).toEqual('topright');
        });
    });

    it('should remove zoom control button if unset on defaults', function() {
        angular.extend($rootScope, {
            defaults: {
                zoomControl: false
            }
        });
        var element = angular.element('<leaflet defaults="defaults"></leaflet>');
        element = $compile(element)($rootScope);
        leafletData.getMap().then(function(map) {
            expect(map.zoomControl).toBe(undefined);
        });
    });
});
