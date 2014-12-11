'use strict';

//Setting up route
angular.module('ustodos').config(['$stateProvider',
	function($stateProvider) {
		// Ustodos state routing
		$stateProvider.
		state('listUstodos', {
			url: '/ustodos',
			templateUrl: 'modules/ustodos/views/list-ustodos.client.view.html'
		}).
		state('createUstodo', {
			url: '/ustodos/create',
			templateUrl: 'modules/ustodos/views/create-ustodo.client.view.html'
		}).
		state('viewUstodo', {
			url: '/ustodos/:ustodoId',
			templateUrl: 'modules/ustodos/views/view-ustodo.client.view.html'
		}).
        state('editUstodo', {
            url: '/ustodos/:ustodoId/edit',
            templateUrl: 'modules/ustodos/views/edit-ustodo.client.view.html'
        }).
        state('workUstodo', {
            url: '/ustodowork/ustodo',
            templateUrl: 'modules/ustodos/views/work-ustodos.client.view.html'
        })
        ;
	}
]);