'use strict';

var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User          = require('../../api/models/user.model');

module.exports = function() {

	passport.use(new LocalStrategy({
			usernameField: 'email',
			passwordField: 'password'
		},
		function(username, password, done) {
			console.log('local.js IN PASSPORT LOCAL');
			console.log('local.js username = ' + username);
			console.log('local.js password = ' + password);

			User
				.findOne({where: {email: username} })
				.then(
					function(user) {
						console.log('local.js INSIDE User.findOne callback');

						if (!user) {
							console.log('local.js No user found');
							return done(null, false, {
								message: 'Unknown user'
							});
						}


						console.log('local.js WE HAVE A USER! : ' + JSON.stringify(user));
						console.log('local.js CHECK PASSWORD');

						if(!user.authenticateAsync(password)){
							console.log('local.js PASSWORD ERROR');
							done(true, null);
						}
						else {
							console.log('local.js PASSWORD GOOD');
							//Right here send back user.public
							done(null, user);
						}
					},
					function(err){
						console.log('local.js findOne ERROR');
						console.log(err);
					});
		})
	);
};
