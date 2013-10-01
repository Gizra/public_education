'use strict';

describe('Service: phonegap', function () {

  // load the service's module
  beforeEach(module('publicEducationApp'));

  // instantiate service
  var phonegap;
  beforeEach(inject(function (_phonegap_) {
    phonegap = _phonegap_;
  }));

  it('should do something', function () {
    expect(!!phonegap).toBe(true);
  });

});
