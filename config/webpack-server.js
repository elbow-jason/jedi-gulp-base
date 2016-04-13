var webpack          = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var bodyParser       = require('body-parser');
var webpackConfig    = require('../webpack.config');

var server           = new WebpackDevServer(webpack(webpackConfig), {
  // contentBase: __dirname,
  publicPath: webpackConfig.output.publicPath,
  hot:     true,
  quiet:   false,
  noInfo:  false,
  headers: {'Access-Control-Allow-Origin': '*'},
  stats:   {colors: true}
});

// console.log('Webpack Server webpackConfig:');
// console.log(webpackConfig);


server.app.use(bodyParser.json());
server.app.use(bodyParser.urlencoded({extended: true}));

server.listen(webpackConfig.serverPort, 'localhost', function(err, result) {
  if (err) { console.log(err); }
  console.log('Webpack server listening on port ' + webpackConfig.serverPort + '...');
});
