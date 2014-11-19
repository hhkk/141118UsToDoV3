'use strict';

// Rawrecords3s controller
angular.module('rawrecords3s').controller('Rawrecords3sController', ['$scope', '$stateParams', '$location', 'Authentication', 'Rawrecords3s',
	function($scope, $stateParams, $location, Authentication, Rawrecords3s) {
		$scope.authentication = Authentication;

		// Create new Rawrecords3
		$scope.create = function() {
			// Create new Rawrecords3 object
			var rawrecords3 = new Rawrecords3s ({
				name: this.name
			});

			// Redirect after save
			rawrecords3.$save(function(response) {
				$location.path('rawrecords3s/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Rawrecords3
		$scope.remove = function(rawrecords3) {
			if ( rawrecords3 ) { 
				rawrecords3.$remove();

				for (var i in $scope.rawrecords3s) {
					if ($scope.rawrecords3s [i] === rawrecords3) {
						$scope.rawrecords3s.splice(i, 1);
					}
				}
			} else {
				$scope.rawrecords3.$remove(function() {
					$location.path('rawrecords3s');
				});
			}
		};

		// Update existing Rawrecords3
		$scope.update = function() {
			var rawrecords3 = $scope.rawrecords3;

			rawrecords3.$update(function() {
				$location.path('rawrecords3s/' + rawrecords3._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Rawrecords3s
		$scope.find = function() {
			$scope.rawrecords3s = Rawrecords3s.query();
		};

		// Find existing Rawrecords3
		$scope.findOne = function() {
			$scope.rawrecords3 = Rawrecords3s.get({ 
				rawrecords3Id: $stateParams.rawrecords3Id
			});
		};
	}
]);