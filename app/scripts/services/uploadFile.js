'use strict';

angular.module('publicEducationApp')
  .service('UploadFile', function Uploadfile(BACKEND_URL, $q) {

    return {

      sendFile: function() {
        var defer = $q.defer();

        // @todo: remove hardcoding of URI and file format.
        var fileURI = '/mnt/sdcard/myrecording.amr';
        var options = new FileUploadOptions();
        options.fileKey = 'file';
        options.fileName = fileURI.substr(fileURI.lastIndexOf('/')+1);
        // @todo: Remove hardcoding.
        options.mimeType = 'audio/amr';

        // Request headers needs to be in the following format.
        // @see https://github.com/superjoe30/node-multiparty/pull/15
        var headers = {'Content-type': 'multipart/form-data; boundary=+++++'};
        options.headers = headers;

        var ft = new FileTransfer();
        ft.upload(fileURI, BACKEND_URL + '/recordings/create', function onSuccess(result) {
          console.log('Code = ' + result.responseCode);
          console.log('Response = ' + result.response);
          console.log('Sent = ' + result.bytesSent);
          defer.resolve(result);
        }, function onError(error) {
          console.log('An error has occurred: Code = ' + error.code);
          defer.reject(error);
        }, options);

        return defer.promise;
      }
    };
  });

