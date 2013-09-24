'use strict';

describe('Controller: addmarkerCtrl', function () {

  // load the controller's module
  beforeEach(module('publicEducationApp'));

  var $httpBackend,
    AddMarkerCtrl,
    // Define four Square venues response
    venuesResponse = {},
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($injector, $controller, $rootScope) {
    // Set up the mock http service responses
    $httpBackend = $injector.get('$httpBackend');
    // backend definition common for all tests

    venuesResponse = {
      response: {
        venues: [{
          id: 1000,
          name: 'Test place'
          // @todo: Add lng, lat.
        }]
      }
    };

    // @todo: Use wildcards.
    $httpBackend.when('GET', 'https://api.foursquare.com/v2/venues/search?limit=1&ll=41.0383%2C28.9869&oauth_token=ARSXRAKVBW1D3KGHZVHN0IGHAITQQTIYXSKIKS2SWOSYHQEU&v=20130917').respond(venuesResponse);

    scope = $rootScope.$new();

    AddMarkerCtrl = $controller('AddMarkerCtrl', {
      $scope: scope
    });
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should update the venue and marker info', function () {
    $httpBackend.flush();
    expect(scope.markers.marker.venue.id).toBe(1000);
    expect(scope.markers.marker.venue.name).toBe('Test place');
  });
});
