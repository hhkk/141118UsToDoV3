'use strict';

(function() {
	// Rawrecords3s Controller Spec
	describe('Rawrecords3s Controller Tests', function() {
		// Initialize global variables
		var Rawrecords3sController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Rawrecords3s controller.
			Rawrecords3sController = $controller('Rawrecords3sController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Rawrecords3 object fetched from XHR', inject(function(Rawrecords3s) {
			// Create sample Rawrecords3 using the Rawrecords3s service
			var sampleRawrecords3 = new Rawrecords3s({
				name: 'New Rawrecords3'
			});

			// Create a sample Rawrecords3s array that includes the new Rawrecords3
			var sampleRawrecords3s = [sampleRawrecords3];

			// Set GET response
			$httpBackend.expectGET('rawrecords3s').respond(sampleRawrecords3s);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.rawrecords3s).toEqualData(sampleRawrecords3s);
		}));

		it('$scope.findOne() should create an array with one Rawrecords3 object fetched from XHR using a rawrecords3Id URL parameter', inject(function(Rawrecords3s) {
			// Define a sample Rawrecords3 object
			var sampleRawrecords3 = new Rawrecords3s({
				name: 'New Rawrecords3'
			});

			// Set the URL parameter
			$stateParams.rawrecords3Id = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/rawrecords3s\/([0-9a-fA-F]{24})$/).respond(sampleRawrecords3);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.rawrecords3).toEqualData(sampleRawrecords3);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Rawrecords3s) {
			// Create a sample Rawrecords3 object
			var sampleRawrecords3PostData = new Rawrecords3s({
				name: 'New Rawrecords3'
			});

			// Create a sample Rawrecords3 response
			var sampleRawrecords3Response = new Rawrecords3s({
				_id: '525cf20451979dea2c000001',
				name: 'New Rawrecords3'
			});

			// Fixture mock form input values
			scope.name = 'New Rawrecords3';

			// Set POST response
			$httpBackend.expectPOST('rawrecords3s', sampleRawrecords3PostData).respond(sampleRawrecords3Response);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Rawrecords3 was created
			expect($location.path()).toBe('/rawrecords3s/' + sampleRawrecords3Response._id);
		}));

		it('$scope.update() should update a valid Rawrecords3', inject(function(Rawrecords3s) {
			// Define a sample Rawrecords3 put data
			var sampleRawrecords3PutData = new Rawrecords3s({
				_id: '525cf20451979dea2c000001',
				name: 'New Rawrecords3'
			});

			// Mock Rawrecords3 in scope
			scope.rawrecords3 = sampleRawrecords3PutData;

			// Set PUT response
			$httpBackend.expectPUT(/rawrecords3s\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/rawrecords3s/' + sampleRawrecords3PutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid rawrecords3Id and remove the Rawrecords3 from the scope', inject(function(Rawrecords3s) {
			// Create new Rawrecords3 object
			var sampleRawrecords3 = new Rawrecords3s({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Rawrecords3s array and include the Rawrecords3
			scope.rawrecords3s = [sampleRawrecords3];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/rawrecords3s\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleRawrecords3);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.rawrecords3s.length).toBe(0);
		}));
	});
}());