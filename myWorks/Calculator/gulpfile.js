let gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    uglify = require('gulp-uglify'),  // для уменьшения файлов js
    concat = require('gulp-concat'),  // для конкатенации файлов js
    rename = require('gulp-rename');  // для переименования файла

gulp.task('scss', function(){
    return gulp.src([
        'app/scss/style.scss'
    ])
    .pipe(sass({outputStyle:"compressed"})) //преобразование scss  в css
    .pipe(rename('main.min.css'))          //строка переименовывает файл и добавляет суфикс .min
    .pipe(gulp.dest('app/css/'))            // перемещение файла в папку css
    .pipe(browserSync.reload({stream:true}))
});
gulp.task('html', function(){
    return gulp.src('app/*.html')
    .pipe(browserSync.reload({stream:true})) 
});
gulp.task('script', function(){
    return gulp.src('app/js/*.js')
    .pipe(browserSync.reload({stream:true})) 
});
gulp.task('js',function(){
    return gulp.src([                    //  [] поиск более одного файла
        'app/js/layout/jquery-3.5.1.js',
        'app/js/layout/main.js'
    ])
    .pipe(concat('main.min.js'))  // slick.js и jquery.magnific-popup и main.jsконкотинируем в main.min.js
    .pipe(gulp.dest('app/js')) // готовый файл помещаем в app/js
    .pipe(browserSync.reload({stream:true})) 
});
gulp.task('browser-sync', function() { 
    browserSync.init({               //перезагрузка стр
        server: {
            baseDir: "app/"
        }
    });
});
gulp.task('watch',function(){            //отслеживание в папках
    gulp.watch('app/scss/*.scss', gulp.parallel('scss')) 
    gulp.watch('app/*.html', gulp.parallel('html'))
    gulp.watch('app/js/layout/main.js', gulp.parallel('script'))
});
gulp.task('default', gulp.parallel('scss','js','browser-sync','watch')); //по умолчанию выполняет перелельно таски
