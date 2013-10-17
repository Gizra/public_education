'use strict';

describe('Service: foursquare', function () {

  // load the service's module
  beforeEach(module('publicEducationApp'));

  // instantiate service
  var foursquare;
  beforeEach(inject(function ($injector) {
    foursquare = $injector.get('Foursquare');
  }));

  it('should do something', function () {
    expect(!!foursquare).toBe(true);
  });

});
