var gulp=  require('gulp');
var ts = require('gulp-typescript');
var sass = require('gulp-sass');
var copy = require('copy');
var browserSync = require('browser-sync').create();


var tsProject = ts.createProject('tsconfig.json');

gulp.task('browserSync', function () {
    browserSync.init({
        server: {
            baseDir: './'
        },
    })
});

gulp.task("typescript",()=>{
    return gulp.src("ts/**/*.ts")
	.pipe(tsProject())
	.pipe(gulp.dest("js"))
    .pipe(browserSync.reload({
        stream: true
    }))


	});

gulp.task("watch", ['browserSync','typescript', 'sass', ], function () {
    gulp.watch('scss/**/*.scss', ['sass']);
    gulp.watch('ts/**/*.ts', ['typescript']);
    gulp.watch('/*.html', ['browserSync']);
    gulp.watch("js/*.js", browserSync.reload);
    gulp.watch('./**/*.html', browserSync.reload);


});


gulp.task('sass', function () {
    return gulp.src('./scss/all.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('./css'))
     .pipe(browserSync.reload({
        stream: true
    }))
});
gulp.task('copy', function () {
   
    gulp.src([
    'node_modules/bootstrap/dist/**/*',
    '!**/npm.js',
    '!**/bootstrap-theme.*',
    '!**/*.map'
    ])
  .pipe(gulp.dest('vendor/bootstrap'))

    gulp.src(['./node_modules/jquery/dist/jquery.js'])
      .pipe(gulp.dest('vendor/jquery'))

    gulp.src(['./node_modules/@types/jquery/jquery.d.ts'])
      .pipe(gulp.dest('vendor/jquery'))
});

gulp.task('default', ['sass', 'typescript','copy']);
