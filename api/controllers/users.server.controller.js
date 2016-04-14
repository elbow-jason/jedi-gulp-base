'use strict';

// var _            = require('lodash');
// var errorHandler = require('../errors.server.controller');
// var mongoose     = require('mongoose');
var passport     = require('passport');
var Sequelize    = require('sequelize');
var User         = require('../models/user.model.js');
var helpers      = require('../helpers');


//--------------------------------------------------------------------------------------------------
exports.signin = function(req, res, next) {
	// TODO: Remove/scrub user credentials from console.logs
	console.log('signin');
	console.log('req.body');
	console.log(req.body);

	var email       = req.body.email;
	var displayName = req.body.firstName + ' ' + req.body.lastName;
	var password    = req.body.password;

	passport.authenticate('local', function(err, user, info) {
		if (err || !user) {
			console.log('user.server.controller.js signin passport.authenticate ERROR');
			console.log(err);
			res.status(401).json({message: "Email Or Password Was Incorrect"});
		} else {
			// Remove sensitive data before login
			user.password          = undefined;
			user.bcrypted_password = undefined;

			req.login(user, function(err) {
				if (err) {
					console.log('user.server.controller.js signin req.login ERROR');
					console.log(err);
					res.status(400).send(err);
				} else {
					res.json(helpers.safeUser(user));
				}
			});
		}
	})(req, res, next);
};

//--------------------------------------------------------------------------------------------------
exports.signup = function(req, res) {
	// TODO: Remove/scrub user credentials from console.logs
	console.log('signup');
	// console.log('req.body');
	// console.log(req.body);

	var firstName   = req.body.firstName;
	var lastName    = req.body.lastName;
	var email       = req.body.email;
	var password    = req.body.password;
	var provider    = 'local';

	User
		.create({
			first_name: firstName, 
			last_name: lastName, 
			email: email,  
			password: password,
			provider: provider
		})
		.then(
			function(user){
				//console.log(user);
				user.password          = undefined;
				user.bcrypted_password = undefined;

				req.login(user, function(err) {
					if (err) {
						res.status(400).send(err);
					}
					else {
						//user.save;
						res.json(user);
					}
				});
			},
			function(err){
				console.log('ERRORRRRRR');
				console.log(err);
				res.status(400).send(err);
			});
};
//--------------------------------------------------------------------------------------------------
exports.signout = function(req, res) {
	req.logout();
	res.status(200).json({message: 'success'});
	//res.redirect('/');
};

//--------------------------------------------------------------------------------------------------
exports.show = function(req, res) {
  var id = req.params.id;
  res.status(200).json({ id });
};