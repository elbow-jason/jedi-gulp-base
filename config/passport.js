'use strict';

var passport = require('passport');
var path     = require('path');
var config   = require('./config');
var User     = require('../api/models/user.model');

module.exports = function() {
	// Serialize sessions
	passport.serializeUser(function(user, done) {
		console.log('passport.serializeUser user = ' + JSON.stringify(user));
		done(null, user.id);
	});

	// Deserialize sessions
	passport.deserializeUser(function(id, done) {
		console.log('passport.deserializeUser');
		User.findById(id)
		.then(function(user){
			done(null,user);
		},
		function(err){
			console.log('passport.deserializeUser ERROR');
			console.log(err);
			done(err,null);
		});
	});

	// Initialize strategies
	config.getGlobbedFiles('./config/strategies/**/*.js').forEach(function(strategy) {
		require(path.resolve(strategy))();
	});
};