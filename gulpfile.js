"use strict";

var gulp = require("gulp");
var gutil = require("gulp-util");
var jsdoc2md = require("gulp-jsdoc-to-markdown");
var rename = require("gulp-rename");

gulp.task("doc", function(){
    return gulp.src("lib/*.js")
        .pipe(jsdoc2md())
        .on("error", function(err){
            gutil.log(gutil.colors.red("jsdoc2md failed"), err.message);
        })
        .pipe(rename(function(path){
            path.extname = ".md";
        }))
        .pipe(gulp.dest("doc"));
});
