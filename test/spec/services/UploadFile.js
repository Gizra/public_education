'use strict';

describe('Service: UploadFile', function () {

  // load the service's module
  beforeEach(module('wwwApp'));

  // instantiate service
  var UploadFile;
  beforeEach(inject(function (_UploadFile_) {
    UploadFile = _UploadFile_;
  }));

  it('should do something', function () {
    expect(!!UploadFile).toBe(true);
  });

});
