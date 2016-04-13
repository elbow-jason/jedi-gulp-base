'use strict';

var Sequelize    = require('sequelize');
var _            = require('lodash');
var crypto       = require('crypto');
var Bluebird     = require('bluebird');
var bcrypt       = Bluebird.promisifyAll(require('bcrypt-nodejs'), {
  filter: function(name) {
    return _.includes(['compare', 'hash', 'genSalt'], name);
  }
});


module.exports = function(athena_sequelize){
  var Region = athena_sequelize.define(
    'region',
    {
      name:       Sequelize.STRING,
      visibility: Sequelize.STRING
    },
    {
      timestamps: true,
      underscored: true,
      tableName: 'regions'
    }
  );

 module.exports = Region;
}
