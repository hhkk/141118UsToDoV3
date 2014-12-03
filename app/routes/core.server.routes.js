'use strict';

module.exports = function(app) {
	// Root routing
	var core = require('../../app/controllers/core.server.controller');
	app.route('/').get(core.index); // hbkk concatenation1
    app.route('/hk').get(core.index); // hbkk concatenation1
};