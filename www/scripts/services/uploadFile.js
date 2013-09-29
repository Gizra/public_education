'use strict';

angular.module('publicEducationApp')
  .service('UploadFile', function Uploadfile() {

    return {

      sendFile: function() {
        // TODO@ remove hardcoding of URI and file format.
        var fileURI = '/mnt/sdcard/myrecording.amr';
        var options = new FileUploadOptions();
        options.fileKey="file";
        options.fileName = fileURI.substr(fileURI.lastIndexOf('/')+1);
        options.mimeType="audio/amr";

        // Request headers needs to be in the following format.
        // See issue @ Github: https://github.com/superjoe30/node-multiparty/pull/15
        var headers = {'Content-type': 'multipart/form-data; boundary=+++++'};
        options.headers = headers;

        var ft = new FileTransfer();
        ft.upload(fileURI, 'http://10.0.0.52:3000/recordings/create', this.win, this.fail, options);

        function win(r) {
          console.log("Code = " + r.responseCode);
          console.log("Response = " + r.response);
          console.log("Sent = " + r.bytesSent);
        }

        function fail(error) {
          console.log("An error has occurred: Code = " + error.code);
        }
      }
    };
  });

