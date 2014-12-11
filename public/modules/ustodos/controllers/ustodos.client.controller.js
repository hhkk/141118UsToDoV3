'use strict';


// Ustodos controller
angular.module('ustodos').controller('UstodosController', ['$scope', '$stateParams', '$location', 'Authentication', 'Ustodos',
	function($scope, $stateParams, $location, Authentication, Ustodos) {
		$scope.authentication = Authentication;

		// Create new Ustodo
		$scope.create = function() {
			// Create new Ustodo object
			var ustodo = new Ustodos ({
				name: this.name
			});

			// Redirect after save
			ustodo.$save(function(response) {
				$location.path('ustodos/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Ustodo
		$scope.remove = function(ustodo) {
			if ( ustodo ) { 
				ustodo.$remove();

				for (var i in $scope.ustodos) {
					if ($scope.ustodos [i] === ustodo) {
						$scope.ustodos.splice(i, 1);
					}
				}
			} else {
				$scope.ustodo.$remove(function() {
					$location.path('ustodos');
				});
			}
		};

		// Update existing Ustodo
		$scope.update = function() {
			var ustodo = $scope.ustodo;

			ustodo.$update(function() {
				$location.path('ustodos/' + ustodo._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Ustodos
		$scope.find = function() {
                //console.log ("Ustodosdesc" +  Ustodos.toString());
            //exports.getClass ("Ustodosdesc1", Ustodos)
            //console.log ("Ustodosdesc2");
			$scope.ustodos = Ustodos.query();
		};

		// Find existing Ustodo
		$scope.findOne = function() {
			$scope.ustodo = Ustodos.get({ 
				ustodoId: $stateParams.ustodoId
			});
		};
	}
]);