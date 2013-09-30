"use strict";

 angular.module("config", [])

.constant("ENV", "development")

.constant("FOURSQUARE", {
  "id": "client_id",
  "secret": "client_secret"
})

.constant("BACKEND_URL", "http://localhost:3000")

;