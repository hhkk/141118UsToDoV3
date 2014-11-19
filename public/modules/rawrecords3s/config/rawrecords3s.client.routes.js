'use strict';

//Setting up route
angular.module('rawrecords3s').config(['$stateProvider',
	function($stateProvider) {
		// Rawrecords3s state routing
		$stateProvider.
		state('listRawrecords3s', {
			url: '/rawrecords3s',
			templateUrl: 'modules/rawrecords3s/views/list-rawrecords3s.client.view.html'
		}).
		state('createRawrecords3', {
			url: '/rawrecords3s/create',
			templateUrl: 'modules/rawrecords3s/views/create-rawrecords3.client.view.html'
		}).
		state('viewRawrecords3', {
			url: '/rawrecords3s/:rawrecords3Id',
			templateUrl: 'modules/rawrecords3s/views/view-rawrecords3.client.view.html'
		}).
		state('editRawrecords3', {
			url: '/rawrecords3s/:rawrecords3Id/edit',
			templateUrl: 'modules/rawrecords3s/views/edit-rawrecords3.client.view.html'
		});
	}
]);