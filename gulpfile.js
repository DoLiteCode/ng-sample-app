var gulp = require('gulp'),
  webserver = require('gulp-webserver'),
  sourcemaps = require('gulp-sourcemaps'),
  sass = require('gulp-sass'),
  cleanCSS = require('gulp-clean-css'),
  del = require('del'),
  rename = require('gulp-rename'),
  uglify = require('gulp-uglify'),
  typescript = require('gulp-typescript'),
  imagemin = require('gulp-imagemin');


var path = {},
  gulpObj = {};

gulpObj.tsProject = typescript.createProject('tsconfig.json')

path.root = '';
path.app = path.root + 'app/';

path.build = path.app + 'build/';
path.buildJs = path.build + 'js/';
path.buildNgJs = path.app + 'node_modules/';
//path.buildNodeModelues = path.app + 'node_modules/';
path.buildCss = path.build + 'css/';
path.buildImg = path.build + 'images/';

path.src = path.app + 'src/';
path.srcTs = path.src + 'typescript/';
path.srcInitTsFile = path.srcTs + 'boot.ts';
path.srcJs = path.src + 'javascript/';

path.srcSass = path.src + 'sass/';
path.srcCss = path.src + 'css/';


path.srcImg = path.src + 'images/';

gulpObj.removeEndSlash = function(str) {
  return str.replace(/\/$/, '');
};

gulp.task('clean-css', function() {
  return del.sync([
    path.buildCss + '/**', '!' + gulpObj.removeEndSlash(path.buildCss)
  ]);
});

gulp.task('clean-js', function() {
  return del.sync([
    path.buildJs + '/**', '!' + gulpObj.removeEndSlash(path.buildJs),
    path.buildNgJs + '/**', '!' + gulpObj.removeEndSlash(path.buildNgJs)
  ]);
});

gulp.task('html', function() {
  gulp.src(path.app + '**/*.html');
});

gulpObj.cssMinifier = function() {
  return gulp
    .src([path.buildCss + '**/*.css', '!' + path.buildCss + '**/*.min.css'])
    //.pipe(sourcemaps.init())
    .pipe(
      cleanCSS({
        compatibility: 'ie8',
        debug: true
      }, function(details) {
        console.log(details.name + ': ' + details.stats.originalSize);
        console.log(details.name + ': ' + details.stats.minifiedSize);
      })
    )
    .pipe(rename({
      suffix: '.min'
    }))
    //.pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(path.buildCss));
};

gulpObj.jsMinifier = function() {
  return false;

  return gulp
    .src([path.buildJs + '**/*.js', '!' + path.buildJs + '**/*.min.js'])
    //.pipe(sourcemaps.init())
    .pipe(uglify({
      compress: {},
      toplevel: true,
      ie8: true
    }))
    .pipe(rename({
      suffix: '.min'
    }))
    //.pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(path.buildJs));
};


gulp.task('css', function() {
  return gulp.src(path.srcCss + '**/*.css')
    .pipe(gulp.dest(path.buildCss))
    .on('end', gulpObj.cssMinifier);
});

gulp.task('sass', function() {
  return gulp.src([path.srcSass + '**/*.scss', '!' + path.srcSass + '**/_*.scss'])
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(path.buildCss))
    .on('end', gulpObj.cssMinifier);
});

gulp.task('typescript', function() {
  /*
  return browserify({
      basedir: '.',
      debug: true,
      entries: [path.srcInitTsFile],
      cache: {},
      packageCache: {}
    })
    .plugin(tsify)
    .transform('babelify', {
      presets: ['es2015'],
      extensions: ['.js', '.ts']
    })
    .bundle()
    .pipe(rename({
      extname: '.js'
    }))
    .pipe(gulp.dest(path.buildJs));

    */

  return gulpObj.tsProject.src()
    .pipe(sourcemaps.init())
    .pipe(gulpObj.tsProject())
    .js
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(path.buildJs))
    .on('end', gulpObj.jsMinifier);
});

gulp.task('javascript', function() {

  return gulp.src(path.srcJs + '**/*.js')
    .pipe(gulp.dest(path.buildJs))
    .on('end', gulpObj.jsMinifier);
});

gulp.task('image-minify', function() {
  return gulp.src(path.srcImg + '**/*')
    .pipe(imagemin([
      imagemin.gifsicle({ interlaced: true }),
      imagemin.jpegtran({ progressive: true }),
      imagemin.optipng({ optimizationLevel: 5 }),
      imagemin.svgo({
        plugins: [
          { removeViewBox: true },
          { cleanupIDs: false }
        ]
      })
    ]))
    .pipe(gulp.dest(path.buildImg));
});
gulp.task('copylibs', function() {
  /*
  return gulp
    .src([
      'node_modules/core-js/client/shim.min.js',
      'node_modules/zone.js/dist/zone.js',
      'node_modules/systemjs/dist/system.src.js',
      'node_modules/@angular/core/bundles/core.umd.js',
      'node_modules/@angular/common/bundles/common.umd.js',
      'node_modules/@angular/compiler/bundles/compiler.umd.js',
      'node_modules/@angular/platform-browser/bundles/platform-browser.umd.js',
      'node_modules/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
      'node_modules/@angular/http/bundles/http.umd.js',
      'node_modules/@angular/router/bundles/router.umd.js',
      'node_modules/@angular/forms/bundles/forms.umd.js',
      'node_modules/rxjs/bundles/Rx.js',
      'node_modules/angular-in-memory-web-api/bundles/in-memory-web-api.umd.js'
    ])
    .pipe(gulp.dest(path.buildNgJs));
*/

  gulp.src([
      'node_modules/core-js/client/shim.min.js',
      'node_modules/zone.js/dist/zone.js',
      'node_modules/systemjs/dist/system.src.js'
    ])
    .pipe(gulp.dest(path.buildJs));
  /*
  gulp.src([
      'node_modules/@angular/**'
    ])
    .pipe(gulp.dest(path.buildNgJs + '@angular'));


  gulp.src([
      'node_modules/angular-in-memory-web-api/**'
    ])
    .pipe(gulp.dest(path.buildNgJs + 'angular-in-memory-web-api'));

  gulp.src([
      'node_modules/rxjs/**'
    ])
    .pipe(gulp.dest(path.buildNgJs + 'rxjs'));
  */

  gulp
    .src([
      'node_modules/@angular/core/bundles/core.umd.js',
      'node_modules/@angular/common/bundles/common.umd.js',
      'node_modules/@angular/compiler/bundles/compiler.umd.js',
      'node_modules/@angular/platform-browser/bundles/platform-browser.umd.js',
      'node_modules/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
      'node_modules/@angular/http/bundles/http.umd.js',
      'node_modules/@angular/router/bundles/router.umd.js',
      'node_modules/@angular/forms/bundles/forms.umd.js',
      'node_modules/angular-in-memory-web-api/bundles/in-memory-web-api.umd.js'
    ])
    .pipe(gulp.dest(path.buildNgJs + '@angular/'));
  /*
    gulp.src([
        'node_modules/angular-in-memory-web-api/**'
      ])
      .pipe(gulp.dest(path.buildNgJs + 'angular-in-memory-web-api'));
    */
  gulp.src([
      'node_modules/rxjs/**'
    ])
    .pipe(gulp.dest(path.buildNgJs + 'rxjs'));

});

gulp.task('watch', function() {
  gulp.watch(path.srcTs + '**/*.ts', ['typescript']);
  gulp.watch(path.srcJs + '**/*.js', ['javascript']);
  gulp.watch(path.srcSass + '**/*.scss', ['sass']);
  gulp.watch(path.srcCss + '**/*.css', ['css']);
  gulp.watch(path.srcImg + '**/*', ['image-minify']);
  gulp.watch(path.app + '**/*.html', ['html']);
});


gulp.task('webserver', function() {
  //return false;
  //path.app
  gulp.src(path.app)
    .pipe(webserver({
      liveload: true,
      open: false,
      port: 8000
    }));

});


/*gulp.task('default', function() {
  runSequence('clean-css', 'typescript', 'sass', 'css', 'watch', 'webserver');
});*/

gulp.task('default', ['clean-css', 'clean-js', 'copylibs', 'sass', 'css', 'javascript', 'typescript', 'image-minify', 'watch', 'webserver']);