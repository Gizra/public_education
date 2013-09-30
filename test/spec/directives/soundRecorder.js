'use strict';

describe('Directive: SoundRecorder', function () {

  // load the directive's module
  beforeEach(module('publicEducationApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<-sound-recorder></-sound-recorder>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the SoundRecorder directive');
  }));
});
