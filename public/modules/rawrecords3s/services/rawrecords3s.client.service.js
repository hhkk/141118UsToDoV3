'use strict';

//Rawrecords3s service used to communicate Rawrecords3s REST endpoints
angular.module('rawrecords3s').factory('Rawrecords3s', ['$resource',
	function($resource) {
		return $resource('rawrecords3s/:rawrecords3Id', { rawrecords3Id: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);