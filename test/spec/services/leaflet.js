'use strict';

describe('Service: leaflet', function () {

  // load the service's module
  beforeEach(module('publicEducationApp'));

  // instantiate service
  var leaflet;
  beforeEach(inject(function ($injector) {
    leaflet = $injector.get('Leaflet');
  }));

  it('should do something', function () {
    expect(!!leaflet).toBe(true);
  });

});
