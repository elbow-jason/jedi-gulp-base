// server.js

var express      = require('express');
var session      = require('express-session');
var SessionStore = require('express-mysql-session');
var path         = require('path');
var bodyParser   = require('body-parser');
var cookieParser = require('cookie-parser');
var nconf        = require('nconf');
var Sequelize    = require('sequelize');
var chalk        = require('chalk');
var passport     = require('passport');
var consolidate  = require('consolidate');
var config       = require('./config/config');
var Sequelize    = require('sequelize');


var app          = express();
var publicPath   = path.join(__dirname, 'public');


app.use(express.static(publicPath));
nconf.argv().env();
nconf.defaults({
  'NODE_ENV': 'development'
});
nconf.file('config/env/' + nconf.get('NODE_ENV') + '.json');

var athena_db          = nconf.get('databases').athena.database;
var athena_db_username = nconf.get('databases').athena.user;
var athena_db_password = nconf.get('databases').athena.password;
var athena_db_options  = {};
athena_db_options.host = nconf.get('databases').athena.host;
athena_db_options.port = nconf.get('databases').athena.port;

var athena_sequelize   = new Sequelize(athena_db, athena_db_username, athena_db_password, athena_db_options);

require('./api/models/user.model.js')(athena_sequelize);
require('./api/models/region.model.js')(athena_sequelize);

athena_sequelize.sync()



var sessionStore       = new SessionStore(nconf.get('databases').athena);
var port               = nconf.get("port");
var title              = nconf.get("title");
var node_env           = nconf.get("NODE_ENV");
var templateEngine     = nconf.get("templateEngine");

// Set swig as the template engine
app.engine('server.view.html', consolidate[templateEngine]);

// Set views path and view engine
app.set('view engine', 'server.view.html');
app.set('views', './api/views');


if (nconf.get('hot-server') === true) {
  var connectLivereload = require('connect-livereload');
  app.use(connectLivereload({port: 3003}));
  app.use('/static', function (req, res) {
    res.redirect('personal.hot.jedi_gulp_base.jediunixmaster.com/' + req.path);
  });
}

app.use(cookieParser());
app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({
  extended: true
}));
//session storage configuration
app.use(session({
  key: 'athena_session',
  secret: 'goddessofwisdomandintelligents',
  store: sessionStore,
  saveUninitialized: true,
  resave: true
}));

app.use(passport.initialize());
app.use(passport.session());

// Log each request to the console for debugging
app.use(function(req, res, next) {
  console.log("ROUTE :" + req.method, req.url);
  next();
});

// Globbing routing files
config.getGlobbedFiles('./api/routes/**/*.js').forEach(function(routePath) {
  require(path.resolve(routePath))(app);
});

// Bootstrap passport config
require('./config/passport')();

console.log('--');
app.listen(port, 'localhost', function (err) {
  if (err) {
    console.log(chalk.red(console.log("Error occurred: %e", err)));
  } 
  else {
    console.log(chalk.green(title + ' application started'));
    console.log(chalk.green('Environment:\t\t\t' + node_env));
    console.log(chalk.green('Port:\t\t\t\t' + port));
  }
});
console.log('--');

module.exports = app;








