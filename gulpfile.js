var gulp = require('gulp'),
  webserver = require('gulp-webserver'),
  //typescript = require('gulp-typescript'),
  sourcemaps = require('gulp-sourcemaps'),
  //tsConfig = require('./tsconfig.json')
  browserify = require("browserify"),
  source = require('vinyl-source-stream'),
  tsify = require("tsify"),
  uglify = require('gulp-uglify'),
  buffer = require('vinyl-buffer'),
  del = require('del'),
  concat = require('gulp-concat')
  runSequence = require('run-sequence')

  //tsProject = typescript.createProject('./tsconfig.json')//require('./tsconfig.json')
;

runSequence.options.ignoreUndefinedTasks = true;

// sass
// https://stackoverflow.com/questions/35062852/npm-vs-bower-vs-browserify-vs-gulp-vs-grunt-vs-webpack

// https://blog.dmbcllc.com/using-gulp-to-bundle-minify-and-cache-bust/

// concat, uglify, imagemin
// https://github.com/gulpjs/gulp

var paths = {};
paths.root = '';

paths.app = paths.root + 'app/';
paths.appJs = paths.app + 'js/';
paths.appCss = paths.app + 'css/';
paths.appJsBundleName = 'app-scripts.min.js';

paths.src = paths.root + 'src/';
paths.srcTs = paths.src + 'typescript/';
paths.srcJs = paths.src + 'javascript/';
paths.srcTsTmp = paths.srcTs + 'tmp/';
paths.srcInitTsFile = paths.srcTs + 'boot.ts';
paths.srcTsJsBundleName = 'js-bundle.js';//'app-scripts-bundle.js';


paths.srcJsFiles = [
  paths.srcJs + 'spin.js',
  paths.srcTsTmp + paths.srcTsJsBundleName,
  paths.srcJs + 'main.js'
];


paths.srcCss = paths.src + 'css/';
paths.srcSass = paths.src + 'sass/';


var removeEndSlash = function(str) {
  return str.replace(/\/$/, '');
};

gulp.task('clean-ts', function() {
  return del.sync([
    paths.appJs + '/**', '!' + removeEndSlash(paths.appJs),
    paths.srcTsTmp + '/**', '!' + removeEndSlash(paths.srcTsTmp)
  ]);
});
gulp.task('clean-js', function() {
  return del.sync([
    paths.appJs + '/**', '!' + removeEndSlash(paths.appJs)
  ]);
});

gulp.task('html', function() {
  gulp.src(paths.app + '**/*.html');
});

gulp.task('css', function() {
  gulp.src(paths.app + '**/*.css');
});

gulp.task('copylibs', function () {
//  return gulp
//    .src([
      //'node_modules/es6-shim/es6-shim.min.js',
      //'node_modules/es6-shim/es6-shim.map',
      //'node_modules/systemjs/dist/system-polyfills.js',
      //'node_modules/systemjs/dist/system-polyfills.js.map',
      //'node_modules/angular2/bundles/angular2-polyfills.js',
      //'node_modules/systemjs/dist/system.src.js',
      //'node_modules/systemjs/dist/system.src.js.map',
      //'node_modules/rxjs/bundles/Rx.js',
      //'node_modules/angular2/bundles/angular2.dev.js'
 //   ])
//    .pipe(gulp.dest(appSrc + 'js/lib/angular2'));
});

gulp.task('pack-js', function() {
  return gulp
    .src(paths.srcJsFiles)
    .pipe(sourcemaps.init())
    .pipe(concat(paths.appJsBundleName))
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.appJs));

});

gulp.task("seq-run-tscript", function () {

//  return gulp
//    .src(tsSrc + '**/*.ts')
//    .pipe(sourcemaps.init())
//    .pipe(typescript(tsConfig.compilerOptions))
//    .pipe(sourcemaps.write('./'))
//    .pipe(gulp.dest(appSrc + '/js'));



//  return tsProject.src()
//    .pipe(tsProject())
//    .js.pipe(gulp.dest(appSrc + '/js'));

// ------------------------------------------------------------------------
// var imagemin = require('gulp-imagemin');


  // Images function with caching added:
//  function imagesFn() {
//    gulp.src(paths.source + '/images/**/*.+(png|jpg|gif|svg)')
//      .pipe(cache(imagemin({optimizationLevel: 5})))
//      .pipe(gulp.dest(paths.build + '/images'));


//  }

  // Images task:
//  gulp.task('images', imagesFn);

  // Watch for changes on files:
//  gulp.task('watch', function() {
//    gulp.watch(paths.source + '/images/**/*.+(png|jpg|gif|svg)', ['images']);
//    gulp.watch(paths.source + '/scripts/**/*.js', ['scripts']);
//  });
  // ------------------------------------------------------------------------

  return browserify({
    basedir: '.',
    debug: true,
    entries: [paths.srcInitTsFile],
    cache: {},
    packageCache: {}
  })
    .plugin(tsify)
    .transform('babelify', {
      presets: ['es2015'],
      extensions: ['.ts']
    })
//    .pipe(gulp.src(jsSrc + '**/*.js'))
    .bundle()
    .pipe(source(paths.srcTsJsBundleName))
    .pipe(buffer())
//    .pipe(sourcemaps.init({loadMaps: false}))
//    .pipe(uglify())
//    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.srcTsTmp));
});

gulp.task("typescript", ['clean-ts'], function () {
  runSequence('seq-run-tscript', 'pack-js');
});

gulp.task('watch', function() {
  gulp.watch(paths.srcTs + '**/*.ts', ['typescript']);
  gulp.watch(paths.srcJs + '**/*.js', ['clean-js', 'pack-js']);
  gulp.watch(paths.appCss + '**/*.css', ['css']);
  gulp.watch(paths.app + '**/*.html', ['html']);
});

gulp.task('webserver', function () {
  gulp.src(paths.app)
    .pipe(webserver({
      liveload: true,
      open: false,
      port: 8000
    }));
});

//gulp.task('default', ['copylibs']);
//gulp.task('default', ['copylibs', 'typescript']);
//gulp.task('default', ['copylibs', 'watch', 'webserver']);
gulp.task('default', function() {
  runSequence('clean-ts', 'copylibs', 'typescript', 'watch', 'webserver');
});
//gulp.task('default', ['copylibs', 'typescript', 'watch', 'webserver']);