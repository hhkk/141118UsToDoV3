'use strict';

// Configuring the Articles module
angular.module('rawrecords3s').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Rawrecords3s', 'rawrecords3s', 'dropdown', '/rawrecords3s(/create)?');
		Menus.addSubMenuItem('topbar', 'rawrecords3s', 'List Rawrecords3s', 'rawrecords3s');
		Menus.addSubMenuItem('topbar', 'rawrecords3s', 'New Rawrecords3', 'rawrecords3s/create');
	}
]);