const gulp = require("gulp");
const ts = require('gulp-typescript');
const nodemon = require("gulp-nodemon");

// While development
// gulp.task("default", ["watch", "compile", "nodemon"]);

// While deployment


//Watch chosen files
gulp.task("watch", function() {
  return gulp.watch("src/**/*.*", ["compile"]);
});

//Compile chosen files from .ts to .js
gulp.task("compile", function() {
  return gulp
    .src("src/**/*.ts")
    .pipe(ts({
      "module": "commonjs",
      "esModuleInterop": true,
      "target": "es6",
      //"noImplicitAny": true,
      "moduleResolution": "node",
      "baseUrl": ".",
      "paths": {
        "*": [
          "node_modules/*",
          "src/types/*"
        ]
      },
      "lib": [ "es2015" ]
    }))
    .pipe(gulp.dest("dist"));
});

//Monitor application bootstrap file
gulp.task("nodemon", function() {
  nodemon({ script: "dist/server.js" });
});

gulp.task("default",  gulp.series("compile"));