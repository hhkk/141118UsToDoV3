'use strict';

// Configuring the Articles module
angular.module('ustodos').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Ustodos', 'ustodos', 'dropdown', '/ustodos(/create)?');
		Menus.addSubMenuItem('topbar', 'ustodos', 'List Ustodos', 'ustodos');
        Menus.addSubMenuItem('topbar', 'ustodos', 'New Ustodo', 'ustodos/create');
        Menus.addSubMenuItem('topbar', 'ustodos', 'New Ustodo', 'ustodos/create');
        Menus.addSubMenuItem('topbar', 'ustodos', 'UsToDolist2', 'ustodos');
        Menus.addSubMenuItem('topbar', 'ustodos', 'UsToDoreal', 'ustodowork/ustodo');
	}
]);