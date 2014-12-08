'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		// Redirect to home view when route not found
		$urlRouterProvider.otherwise('/');

		// Home state routing
        $stateProvider.
            state('homex', {
                url: '/',     // http://localhost:3000/#!/
                templateUrl: 'modules/core/views/home.client.view.html'
            });
        $stateProvider.
            state('homehk2', {
                url: '/hk2',       //http://localhost:3000/#!/hk2
                templateUrl: 'modules/core/views/homehk2.client.view.html'
            });
	}
]);