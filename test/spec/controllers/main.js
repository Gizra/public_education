'use strict';

describe('Controller: ListMarkersCtrl', function () {

  // load the controller's module
  beforeEach(module('publicEducationApp'));

  var ListMarkersCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ListMarkersCtrl = $controller('ListMarkersCtrl', {
      $scope: scope
    });
  }));

  it('should attach Leaflet related properties to the scope', function () {
    expect(!!scope.center).toBe(true);
    expect(!!scope.markers).toBe(true);
  });
});
