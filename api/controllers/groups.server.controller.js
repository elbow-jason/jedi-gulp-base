'use strict';

var Sequelize       = require('sequelize');
var Region          = require ('../models/region.model.js');

// core.server.controller.js
var config       = require('../../config/config');

exports.index = function(req, res) {
  console.log('index');

  // fix the config so that both the frontend and backend
  // are getting the correct environment config
  var title = 'Jedi-Base';

	res.render('index', {
		user: req.user || null,
    title: title,
		request: req
	});
};

//--------------------------------------------------------------------------------------------------
exports.regions = function(req, res) {
	console.log('regions');

  Region.findAll()
  	.then(
  		function(regions) {
    		if (!regions) {
    			console.log('regions error no regions');
      		res.status(400).send({message: 'regions error no regions'});
    		}
    		console.log('success');
    		res.json(regions);
  		},
  		function(e){
    		console.log('memos DATABASE ERROR Region');
    		console.log(e);
    		res.status(400).send(err);
  		});
};

//--------------------------------------------------------------------------------------------------
exports.region = function(req, res) {
	console.log('region');
	console.log(req.params.id);

  Region.find({where: {id: req.params.id}})
  	.then(
  		function(region) {
    		if (!region) {
    			console.log('region error no region');
      		res.status(400).send({message: 'region error no region'});
    		}
    		console.log('success');
    		res.json(region);
  		},
  		function(e){
    		console.log('memos DATABASE ERROR region');
    		console.log(e);
    		res.status(400).send(err);
  		});
};

//--------------------------------------------------------------------------------------------------
exports.regions_new = function(req, res) {
	console.log('regions_new');
	console.log('req.body');
	console.log(req.body);

	var name          = req.body.name;
	var visibility    = req.body.visibility;


	Region
		.create({
			name: name, 
			visibility: visibility
		})
		.then(
			function(region){
				console.log(region);
				res.json(region);
			},
			function(err){
				console.log('regions_new ERRORRRRRR');
				console.log(err);
				res.status(400).send(err);
			});
};






