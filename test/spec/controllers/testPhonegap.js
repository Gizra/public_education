'use strict';

describe('Controller: TestphonegapCtrl', function () {

  // load the controller's module
  beforeEach(module('publicEducationApp'));

  var TestphonegapCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TestphonegapCtrl = $controller('TestphonegapCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
