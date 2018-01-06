"use strict";

var gulp = require('gulp'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    less = require('gulp-less'),
    pixrem = require('pixrem'),
    color_rgba_fallback = require('postcss-color-rgba-fallback'),        
    concat = require('gulp-concat'),
    imagemin = require('gulp-imagemin')
;

// css
gulp.task('css', function () {
  var processors = [
    /*
    > 1%: prohlížeče, které používá více než jedno procento lidí na celém světě
    last 3 versions: poslední tři verze všech prohlížečů, sledovaných CanIUse.com
    Firefox ESR: nejnovější verze Firefox
    Firefox už dávno nevyžaduje -moz- prefix (naposled byl potřeba ve verzi 15)
    viz také aktuálně potřebné vendor prefixy https://autoprefixer.github.io/
    */
    autoprefixer({browsers: ['> 1%', 'last 3 versions', 'ios 6', 'Firefox ESR']}),
    pixrem,
    color_rgba_fallback
  ];
  return gulp.src('lib/less/vyznamslova.less')
    .pipe(less())
    .pipe(postcss(processors))
    .pipe(gulp.dest('css'));
});

gulp.task('imagemin', function () {
  gulp
    .src(['**/*.png','**/*.jpg','**/*.gif','**/*.jpeg'])    
    .pipe(imagemin({
        progressive: true
    }))
    .pipe(gulp.dest('./'));
    // možnost vygenerovat minifikované obrázky do jiné složky 
    //.pipe(gulp.dest('dist'));
});

// watch
gulp.task('watch', function() {
  //gulp.watch('lib/less/*.less', ['css']);
  gulp.watch('lib/**/*.less', ['css']);
  gulp.watch('lib/js/*.js', ['scripts']);
})

// default
gulp.task('default', ['css', 'imagemin', 'watch']);
