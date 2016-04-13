'use strict';

// public.server.routes.js

module.exports = function(app) {
	// Root routing
	var core = require('../controllers/core.server.controller');
	app.route('/').get(core.index);
	app.route('/links').get(core.links);
};