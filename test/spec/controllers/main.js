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

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
