'use strict';

describe('Service: GeoLocation', function () {

  // load the service's module
  beforeEach(module('publicEducationApp'));

  // instantiate service
  var GeoLocation;
  beforeEach(inject(function (_GeoLocation_) {
    GeoLocation = _GeoLocation_;
  }));

  it('should do something', function () {
    expect(!!GeoLocation).toBe(true);
  });

});
