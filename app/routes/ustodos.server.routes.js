'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var ustodos = require('../../app/controllers/ustodos.server.controller');

	// Ustodos Routes
	app.route('/ustodos')
		.get(ustodos.list)
		.post(users.requiresLogin, ustodos.create);

	app.route('/ustodos/:ustodoId')
		.get(ustodos.read)
		.put(users.requiresLogin, ustodos.hasAuthorization, ustodos.update)
		.delete(users.requiresLogin, ustodos.hasAuthorization, ustodos.delete);

	// Finish by binding the Ustodo middleware
	app.param('ustodoId', ustodos.ustodoByID);
};
