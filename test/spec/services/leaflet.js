'use strict';

describe('Service: leaflet', function () {

  // load the service's module
  beforeEach(module('publicEducationApp'));

  // instantiate service
  var leaflet;
  beforeEach(inject(function (_leaflet_) {
    leaflet = _leaflet_;
  }));

  it('should do something', function () {
    expect(!!leaflet).toBe(true);
  });

});
