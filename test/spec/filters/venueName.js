'use strict';

describe('Filter: venueName', function () {

  // load the filter's module
  beforeEach(module('publicEducationApp'));

  // initialize a new instance of the filter before each test
  var venueName;
  beforeEach(inject(function ($filter) {
    venueName = $filter('venueName');
  }));

  it('should return the input prefixed with "venueName filter:"', function () {
    var text = 'angularjs';
    expect(venueName(text)).toBe('venueName filter: ' + text);
  });

});
