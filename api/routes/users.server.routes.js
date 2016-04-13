'use strict';

// public.server.routes.js

module.exports = function(app) {
	// Root routing
	var users = require('../controllers/users.server.controller');
	app.route('/auth/signin').post(users.signin);
	app.route('/auth/signup').post(users.signup);
	app.route('/auth/signout').get(users.signout);
	app.route('/user/:id').get(users.show)
};