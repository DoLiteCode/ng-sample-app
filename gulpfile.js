var gulp = require('gulp'),
  webserver = require('gulp-webserver'),
  //typescript = require('gulp-typescript'),
  sourcemaps = require('gulp-sourcemaps'),
  //tsConfig = require('./tsconfig.json')
  browserify = require("browserify"),
  source = require('vinyl-source-stream'),
  tsify = require("tsify"),
  uglify = require('gulp-uglify'),
  buffer = require('vinyl-buffer')

  //tsProject = typescript.createProject('./tsconfig.json')//require('./tsconfig.json')
;


var appSrc = 'app/',
  tsSrc = 'src/typescript/';

gulp.task('html', function() {
  gulp.src(appSrc + '**/*.html');
});

gulp.task('css', function() {
  gulp.src(appSrc + '**/*.css');
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

gulp.task("typescript", function () {

//  return gulp
//    .src(tsSrc + '**/*.ts')
//    .pipe(sourcemaps.init())
//    .pipe(typescript(tsConfig.compilerOptions))
//    .pipe(sourcemaps.write('./'))
//    .pipe(gulp.dest(appSrc + '/js'));



//  return tsProject.src()
//    .pipe(tsProject())
//    .js.pipe(gulp.dest(appSrc + '/js'));

  return browserify({
    basedir: '.',
    debug: true,
    entries: [tsSrc + "boot.ts"],
    cache: {},
    packageCache: {}
  })
    .plugin(tsify)
    .transform('babelify', {
      presets: ['es2015'],
      extensions: ['.ts']
    })
    .bundle()
    .pipe(source('app-scripts-bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(appSrc + '/js'));
});

gulp.task('watch', function() {
  gulp.watch(tsSrc + '**/*.ts', ['typescript']);
  gulp.watch(appSrc + 'css/*.css', ['css']);
  gulp.watch(appSrc + '**/*.html', ['html']);
});

gulp.task('webserver', function () {
  gulp.src(appSrc)
    .pipe(webserver({
      liveload: true,
      open: true,
      port: 8000
    }));
});

//gulp.task('default', ['copylibs']);
//gulp.task('default', ['copylibs', 'typescript']);
//gulp.task('default', ['copylibs', 'watch', 'webserver']);
gulp.task('default', ['copylibs', 'typescript', 'watch', 'webserver']);
//gulp.task('default', ['copylibs', 'typescript', 'watch', 'webserver']);