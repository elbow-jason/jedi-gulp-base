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
  var User = athena_sequelize.define(
    'user',
    {
      first_name: Sequelize.STRING,
      last_name: Sequelize.STRING,
      display_name: Sequelize.STRING,
      email: {
        type: Sequelize.STRING,
        validate: {
          isEmail: {
            msg: 'Must be a valid email address'
          },
        }
      },
      email_verified: {
        type: Sequelize.DATE
      },
      birth_date: {
        type: Sequelize.DATE
      },
      provider: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      address_1: {
        type: Sequelize.STRING
      },
      address_2: {
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.STRING
      },
      state_code: {
        type: Sequelize.STRING
      },
      country_code: {
        type: Sequelize.STRING
      },
      zip_code: {
        type: Sequelize.STRING
      },
      password: {
      type: Sequelize.VIRTUAL
      },
      bcrypted_password: {
        type: Sequelize.STRING(100)
      }
    },
    {
      instanceMethods: {
        hashPasswordAsync: function(password) {
          return bcrypt.genSaltAsync(10).then(function(result) {
            return bcrypt.hashAsync(password, result, null);
          });
        },
        authenticateAsync: function(password) {
          return bcrypt.compareAsync(password, this.bcrypted_password);
        },
        public: function() {
          return {
            display_name: this.display_name,
            email: this.email,
            email_verified: this.email_verified,
          };
        }
      },
      timestamps: true,
      underscored: true,
      tableName: 'users',
      hooks: {
        beforeCreate: function(user, options, fn) {
          if (user.changed('password')) {
            user.hashPasswordAsync(user.get('password'))
            .then(function(bcrypted_password) {
              user.bcrypted_password = bcrypted_password;
              fn(null, user);
            });
          }
          else {
            fn(null, user);
          }
        },
        beforeUpdate: function(user, options, fn) {
          if (user.changed('password')) {
            user.hashPasswordAsync(user.get('password'))
            .then(function(bcrypted_password) {
              user.bcrypted_password = bcrypted_password;
              fn(null, user);
            });
          }
          else {
            fn(null, user);
          }
        }
      }
    }
  );

 module.exports = User;
}
