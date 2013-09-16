'use strict';

describe('Controller: AddmarkerCtrl', function () {

  // load the controller's module
  beforeEach(module('publicEducationApp'));

  var AddmarkerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AddmarkerCtrl = $controller('AddmarkerCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
