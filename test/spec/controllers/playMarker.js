'use strict';

describe('Controller: playMarkerCtrl', function () {

  // load the controller's module
  beforeEach(module('publicEducationApp'));

  var playMarkerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    playMarkerCtrl = $controller('playMarkerCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
