//Guardado en variables de todos los plugins instalados
var gulp = require('gulp');
var webserver = require('gulp-webserver');
var stylus = require('gulp-stylus');
var nib = require('nib');
var minifyCSS = require('gulp-minify-css');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');

var config = {
  styles: {
    main: './src/styles/main.styl',
    watch: './src/styles/**/*.styl',
    output: './build/css'
  },
  html: {
    watch: '.build/*.html'
  },
  scripts: {
    main: './src/scripts/main.js',
    watch: './src/scripts/**/*.js',
    output: './build/js'
  }
}

// Configuracion del webserver
gulp.task('server', function() {
  return browserify(config.scripts.main).bundle()
});


// Tarea para el preprocesado de STYL a CSS
gulp.task('build:css', function() {
  gulp.src(config.styles.main)
    .pipe(stylus({
      use: nib(), /* Uso de nib para agregar los prefijos */
      'include css': true, /* Porpieadad para que tambien incluya los archivos .css en el archivo final. Va entre '' por que lleva espacio.  */
    }))
    .pipe(minifyCSS())
    .pipe(gulp.dest(config.styles.output));
});



gulp.task('build:js', function() {
  return browserify(config.scripts.main)
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest(config.scripts.output));

});

// Tarea para vijilar cuando se produscan cambios en los ficheros especificados y ejecute las tareas de build.
gulp.task('watch', function(){
  gulp.watch(config.styles.watch, ['build:css']);
  gulp.watch(config.scripts.watch,['build:js']);
  gulp.watch(config.html.watch,['build']);

});

// Tarea para ejecutar el arreglo de tareas de build
gulp.task('build', ['build:css','build:js']);

// Tarea por defecto que se ejecuta con el comando gulp a solas.
gulp.task('default', ['server', 'watch', 'build'])