'use strict';

describe('Service: records', function () {

  // load the service's module
  beforeEach(module('publicEducationApp'));

  // instantiate service
  var records;
  beforeEach(inject(function (_records_) {
    records = _records_;
  }));

  it('should do something', function () {
    expect(!!records).toBe(true);
  });

});
