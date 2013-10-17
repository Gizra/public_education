'use strict';

describe('Service: marker', function () {

  // load the service's module
  beforeEach(module('publicEducationApp'));

  // instantiate service
  var marker;
  beforeEach(inject(function (_marker_) {
    marker = _marker_;
  }));

  it('should do something', function () {
    expect(!!marker).toBe(true);
  });

});
