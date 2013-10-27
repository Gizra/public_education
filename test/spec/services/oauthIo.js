'use strict';

describe('Service: oauthIo', function () {

  // load the service's module
  beforeEach(module('publicEducationApp'));

  // instantiate service
  var oauthIo;
  beforeEach(inject(function (_oauthIo_) {
    oauthIo = _oauthIo_;
  }));

  it('should do something', function () {
    expect(!!oauthIo).toBe(true);
  });

});
