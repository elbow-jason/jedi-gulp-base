'use strict';

// core.server.controller.js
var config  = require('../../config/config');
var helpers = require('../helpers');

exports.index = function(req, res) {
  console.log('index');

  // fix the config so that both the frontend and backend
  // are getting the correct environment config
  var title = 'Jedi Base';
  var user  = req.user ? helpers.safeUser(req.user) : null;

	res.render('index', {
		user:    user,
    title:   title,
		request: req
	});
};

//--------------------------------------------------------------------------------------------------
exports.links = function(req, res) {
	console.log('links');

	var urls = [];
	urls.push({url: 'geekmonster.com'});

	// var todo = new Todo(req.body);
	// todo.user = req.user;

	// todo.save(function(err) {
	// 	if (err) {
	// 		console.log('create error');
	// 		console.log(err);
	// 		res.json({message: 'failure'});
	// 	} else {
	// 		console.log('create success');
	// 		res.json(todo);
	// 	}
	// });

	res.json(urls);
};