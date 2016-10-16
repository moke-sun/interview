'use strict';

// 引入 gulp
var gulp = require('gulp');

// 引入组件
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var browserSync = require('browser-sync').create(); //实时刷新
var reload = browserSync.reload;
var watchify = require('watchify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var assign = require('lodash.assign');
var del = require('del');
var gulpSequence = require('gulp-sequence')

// 在这里添加自定义 browserify 选项
var customOpts = {
  entries: ['./src/main.js'],
  debug: true
};

var opts = assign({}, watchify.args, customOpts);
var b = watchify(browserify(opts));

// 在这里加入变换操作
// 比如： b.transform(coffeeify);

// 这样你就可以运行 `gulp build` 来编译文件了
gulp.task('build', bundle);
b.on('update', bundle); // 当任何依赖发生改变的时候，运行打包工具
b.on('log', gutil.log); // 输出编译日志到终端

function bundle() {
  return b.bundle()
    // 如果有错误发生，记录这些错误
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('bundle.js'))
    // 可选项，如果你不需要缓存文件内容，就删除
    .pipe(buffer())
    // 可选项，如果你不需要 sourcemaps，就删除
    .pipe(sourcemaps.init({loadMaps: true})) // 从 browserify 文件载入 map
    // 压缩
    .pipe(uglify())
    // 在这里将变换操作加入管道
    .pipe(sourcemaps.write('./')) // 写入 .map 文件
    .pipe(gulp.dest('./dist'));
}

// 刷新
gulp.task('refresh', function(cb){
  reload();
  cb();
});

// 实时刷新
gulp.task('dev', ['build'], function () {
  browserSync.init({
    server:{
      baseDir:'./dist'  //设置服务器的根目录
    },
    logLevel: "debug",
    logPrefix:"dev",
    browser:'chrome',
    notify:false //开启静默模式
  });
  //使用gulp的监听功能，实现编译修改过后的文件
  gulp.watch(['js/*.js'], function(){
    gulpSequence('build','refresh')(function (err) {
      if (err) console.log(err)
    })
  });
  gulp.watch(['tpl/*.html'], function(){
    gulpSequence('static:tpl','refresh')(function (err) {
      if (err) console.log(err)
    })
  });
  gulp.watch(['css/*.css'], function(){
    gulpSequence('static:css','refresh')(function (err) {
      if (err) console.log(err)
    })
  });
  gulp.watch(['img/'], function(){
    gulpSequence('static:img','refresh')(function (err) {
      if (err) console.log(err)
    })
  });
});

// copy静态资源文件到dist目录
gulp.task('static:css', function(cb) {
  gulp.src('./css/*.css')
    .pipe(concat('interview.css'))
    .pipe(gulp.dest('./dist/css'));
  gulp.src('./vendor/**/*.css')
    .pipe(gulp.dest('./dist/css/vendor'));
  gulp.src('./fonts/*.css')
    .pipe(gulp.dest('./dist/fonts'));
  cb();
});

// copy静态资源文件到dist目录
gulp.task('static:img', function(cb) {
  gulp.src('./img/*')
    .pipe(gulp.dest('./dist/img'));
  cb();
});

// copy静态资源文件到dist目录
gulp.task('static:tpl', function(cb) {
  gulp.src('./tpl/*.html')
    .pipe(gulp.dest('./dist/tpl'));
  cb();
});

// 清空dist目录
gulp.task('clean', function (cb) {
  //del(['dist/']);
  cb();
});


