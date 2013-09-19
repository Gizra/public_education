'use strict';

describe('Filter: venueName', function () {

  // load the filter's module
  beforeEach(module('publicEducationApp'));

  // initialize a new instance of the filter before each test
  var venueName;
  beforeEach(inject(function ($filter) {
    venueName = $filter('venueName');
  }));

  it('should return the venue name if exists, or "Loading" if not."', function () {
    expect(venueName('some place')).toBe('some place');
    expect(venueName(null)).toBe('Loading...');
  });

});
