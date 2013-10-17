'use strict';

describe('Controller: PlayMarkerCtrl', function () {

  // load the controller's module
  beforeEach(module('publicEducationApp'));

  var PlayMarkerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PlayMarkerCtrl = $controller('PlayMarkerCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    // expect(scope.awesomeThings.length).toBe(3);
  });
});
