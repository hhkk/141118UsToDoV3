'use strict';

//Ustodos service used to communicate Ustodos REST endpoints
angular.module('ustodos').factory('Ustodos', ['$resource',
	function($resource) {
		return $resource('ustodos/:ustodoId', { ustodoId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);