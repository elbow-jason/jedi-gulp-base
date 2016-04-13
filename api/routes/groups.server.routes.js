'use strict';

// public.server.routes.js

module.exports = function(app) {
	// Root routing
	var groups = require('../controllers/groups.server.controller');
	app.route('/regions')
		.get(groups.regions);

	app.route('/region/:id')
		.get(groups.region);

	app.route('/regions')
		.post(groups.regions_new);
};