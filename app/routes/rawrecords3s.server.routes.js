'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var rawrecords3s = require('../../app/controllers/rawrecords3s.server.controller');

	// Rawrecords3s Routes
	app.route('/rawrecords3s')
		.get(rawrecords3s.list)
		.post(users.requiresLogin, rawrecords3s.create);

	app.route('/rawrecords3s/:rawrecords3Id')
		.get(rawrecords3s.read)
		.put(users.requiresLogin, rawrecords3s.hasAuthorization, rawrecords3s.update)
		.delete(users.requiresLogin, rawrecords3s.hasAuthorization, rawrecords3s.delete);

	// Finish by binding the Rawrecords3 middleware
	app.param('rawrecords3Id', rawrecords3s.rawrecords3ByID);
};
