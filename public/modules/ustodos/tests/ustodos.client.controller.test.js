'use strict';

(function() {
	// Ustodos Controller Spec
	describe('Ustodos Controller Tests', function() {
		// Initialize global variables
		var UstodosController,
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

			// Initialize the Ustodos controller.
			UstodosController = $controller('UstodosController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Ustodo object fetched from XHR', inject(function(Ustodos) {
			// Create sample Ustodo using the Ustodos service
			var sampleUstodo = new Ustodos({
				name: 'New Ustodo'
			});

			// Create a sample Ustodos array that includes the new Ustodo
			var sampleUstodos = [sampleUstodo];

			// Set GET response
			$httpBackend.expectGET('ustodos').respond(sampleUstodos);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.ustodos).toEqualData(sampleUstodos);
		}));

		it('$scope.findOne() should create an array with one Ustodo object fetched from XHR using a ustodoId URL parameter', inject(function(Ustodos) {
			// Define a sample Ustodo object
			var sampleUstodo = new Ustodos({
				name: 'New Ustodo'
			});

			// Set the URL parameter
			$stateParams.ustodoId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/ustodos\/([0-9a-fA-F]{24})$/).respond(sampleUstodo);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.ustodo).toEqualData(sampleUstodo);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Ustodos) {
			// Create a sample Ustodo object
			var sampleUstodoPostData = new Ustodos({
				name: 'New Ustodo'
			});

			// Create a sample Ustodo response
			var sampleUstodoResponse = new Ustodos({
				_id: '525cf20451979dea2c000001',
				name: 'New Ustodo'
			});

			// Fixture mock form input values
			scope.name = 'New Ustodo';

			// Set POST response
			$httpBackend.expectPOST('ustodos', sampleUstodoPostData).respond(sampleUstodoResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Ustodo was created
			expect($location.path()).toBe('/ustodos/' + sampleUstodoResponse._id);
		}));

		it('$scope.update() should update a valid Ustodo', inject(function(Ustodos) {
			// Define a sample Ustodo put data
			var sampleUstodoPutData = new Ustodos({
				_id: '525cf20451979dea2c000001',
				name: 'New Ustodo'
			});

			// Mock Ustodo in scope
			scope.ustodo = sampleUstodoPutData;

			// Set PUT response
			$httpBackend.expectPUT(/ustodos\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/ustodos/' + sampleUstodoPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid ustodoId and remove the Ustodo from the scope', inject(function(Ustodos) {
			// Create new Ustodo object
			var sampleUstodo = new Ustodos({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Ustodos array and include the Ustodo
			scope.ustodos = [sampleUstodo];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/ustodos\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleUstodo);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.ustodos.length).toBe(0);
		}));
	});
}());