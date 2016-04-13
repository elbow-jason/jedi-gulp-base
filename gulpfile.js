"use strict"

// all
var gulp          = require('gulp');
var livereload    = require('gulp-livereload');
var eslint        = require('gulp-eslint');
var tinylr        = require('tiny-lr');
// system

const fs          = require('fs'),
      async       = require('async'),
      gutil       = require('gulp-util'),
      shell       = require('gulp-shell'),
      exec        = require('child_process').exec,
      fork        = require('child_process').fork,
      path        = require('path');


//css_build
var autoprefixer  = require('gulp-autoprefixer'),
    minifycss     = require('gulp-minify-css'),
    sass          = require('gulp-sass'),
    rename        = require('gulp-rename');

//js_build
var browserify = require('browserify'),
    watchify   = require('watchify'),
    babelify   = require('babelify'),
    uglify     = require('gulp-uglify'),
    source     = require('vinyl-source-stream');





class NodeService {

  constructor(path, env){
    this.instance = {};
    this.path     = path;
    this.env      = env;
    this.restart  = this.restart.bind(this);
    this.start    = this.start.bind(this);
    this.stop     = this.stop.bind(this);
  }

  start(callback){
    var options = { silent: true, env: this.env };
    this.instance = fork(this.path, options);
    this.instance.on('close', (code, signal) => {
      gutil.log(gutil.colors.green(`Service '${this.path}' closed. Exiting...`));
      this.stop();
      process.exit();
    });
    this.instance.stdout.pipe(process.stdout);
    this.instance.stderr.pipe(process.stderr);
    gutil.log(gutil.colors.green(`Starting service '${this.path}' ...`));
    if (callback) callback();
  }

  stop(callback){
    if (this.instance.connected ){
      this.instance.on('exit', () => {
        gutil.log(gutil.colors.green(`Stopping service '${this.path}' ...`));
        if (callback) callback();
      });
      return this.instance.kill('SIGINT');
    }
    if (callback) callback();
  }

  restart(event, callback){
    gutil.log(gutil.colors.green(`Restarting service '${this.path}' ...`));
    let theCallback = callback ?
                      (cb) => { callback(event, cb) } :
                      ()   => {};
    async.series([
      this.stop,
      this.start,
      theCallback,
    ]);
  }
}

class Reloader {
  constructor(){
    this.instance = null;
    this.port     = 3003;
  }

  start(callback){
    this.instance = tinylr();
    this.instance.listen(this.port, callback);
  }

  changed(event, callback){
    var fileName = path.relative(__dirname, event.path);
    gutil.log(gutil.colors.green(`Detected change in ${fileName} ... Reloading...`));
    this.instance.changed({body: { files: [ fileName ] }});
    if (callback) callback();
  }
}

var server   = new NodeService("server.js", { NODE_ENV: 'local', port: 8400 });
var reloader = new Reloader();

gulp.task('lint', () => {
  return gulp.src(['src/**/*.js','__test__/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task("express",    () => server.start()    );
gulp.task('livereload', () => reloader.start()  );



var sassOrigin = './src/sass/*.scss';
var jsOrigin   = './src/**/**/*.js';

gulp.task('setApiUrl', (cb) => {
  var strPort, env, url, protocol,
      host, port, api, debugMode;

  /* Allow dev ops to override production defaults */
  env       = process.env.NODE_ENV;
  protocol  = process.env.NODE_TLS;
  host      = process.env.NODE_HOST;
  port      = process.env.NODE_PORT;

  if (!env)       throw "An OS environment var NODE_ENV is required";
  if (!protocol)  throw "An OS environment var NODE_TLS is required";
  if (!host)      throw "An OS environment var NODE_HOST is required";
  if (!port)      throw "An OS environment var NODE_PORT is required";

  strPort   = port ? ":" + port : "";
  url       = `${protocol}://${host}${strPort}`;
  console.warn("Compiling static assets with url", url);
  debugMode = (env !== "production");

  api = { env, url, port, host, protocol, debugMode };

  var config   = `window.journeyConfig = ${JSON.stringify(api)};`;
  var filepath = 'public/js/config.js';
  fs.writeFile(filepath, config, cb);
});

gulp.task('build_app_debug', ['setApiUrl'], () => {
  return browserify({entries: 'src/js/main.js', extensions: ['.js'], debug: true})
    .transform(babelify)
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('public/js'));
});

gulp.task('build_app', ['setApiUrl'], () => {
  return browserify({entries: 'src/main.js', extensions: ['.js'], debug: false})
    .transform(babelify, {sourceMaps: false})
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('public/js'));
});



gulp.task('sass', () => {
  return gulp.src(sassOrigin)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer(
      'last 2 version',
      'safari 5',
      'ie 7',
      'ie 8',
      'ie 9',
      'opera 12.1'
    ))
    .pipe(rename({ basename: 'app' }))
    .pipe(gulp.dest('./public/css/'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifycss())
    .pipe(gulp.dest('./public/css/'))
    .pipe(livereload());
});


gulp.task('watch', () => {
  gulp.watch('src/sass/**/*.scss', ['sass']);
  gulp.watch(jsOrigin,   ['build_local']);
  gulp.watch('public/js/*.js',    (e) => reloader.changed(e) );
  gulp.watch('*.html',            (e) => reloader.changed(e) );
  gulp.watch('public/css/*.css',  (e) => reloader.changed(e) );
});

gulp.task('build_styling',
  [
    'sass',
  ], () => {}
);

gulp.task('build_local',
  [
    'setup_local',
    'build_app_debug'
  ], () => {}
);

gulp.task('setup_local', (callback) => {
  if (!process.env.NODE_ENV)  process.env.NODE_ENV  = 'local';
  if (!process.env.NODE_TLS)  process.env.NODE_TLS  = 'http';
  if (!process.env.NODE_HOST) process.env.NODE_HOST = 'localhost';
  if (!process.env.NODE_PORT) process.env.NODE_PORT = 8200;
  callback();
});


// Default task
gulp.task('default',
  [
    'build_local',
    'build_styling',
    'express',
    'livereload',
    'watch',
  ], () => {}
);

process.on("exit", () => server.stop() )
