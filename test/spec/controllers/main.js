'use strict';

describe('Controller: listMarkersCtrl', function () {

  // load the controller's module
  beforeEach(module('publicEducationApp'));

  var listMarkersCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    listMarkersCtrl = $controller('listMarkersCtrl', {
      $scope: scope
    });
  }));

  it('should attach Leaflet related properties to the scope', function () {
    expect(!!scope.center).toBe(true);
    expect(!!scope.markers).toBe(true);
  });
});
