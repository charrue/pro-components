/* eslint-disable  */
/**
 * npm run build:style <name>
 * 打包组件的样式
 * 样式必须是src/style/index.scss
 * 如果带上了组件名，则只打包该组件，否则打包全部的组件
 */
const gulp = require('gulp')
const scss = require('gulp-dart-sass')
const autoprefixer = require('gulp-autoprefixer')
const rename = require('gulp-rename')
const cleanCss = require('gulp-clean-css')
const cssmin = require('gulp-cssmin')
const { resolve } = require('path')
const fs = require('fs')
const { getPackagesSync } = require('@lerna/project')

function css(done) {
  gulp.src('../packages/layout/src/styles/index.scss')
    .pipe(scss())
    .pipe(autoprefixer())
    .pipe(cleanCss())
    .pipe(cssmin())
    .pipe(rename('index.css'))
    .pipe(gulp.dest('../lib/styles'))
  done()
}

const compName = process.argv[4]
const styles = getPackagesSync()
  .map(pkg => {
    return pkg.name.replace(/@charrue\//, '')
  })
  .filter(name => {
    if (name === 'example') return false
    return name ? name === compName : true
  })
  .map(name => {
    const scssPath = resolve(__dirname, `../packages/${name}/src/styles/index.scss`)
    if (!fs.existsSync(scssPath)) return
    const task = done => {
      gulp.src(scssPath, { allowEmpty: true })
        .pipe(scss())
        .pipe(autoprefixer())
        .pipe(cleanCss())
        .pipe(rename('index.css'))
        .pipe(
          gulp.dest(resolve(__dirname, `../packages/${name}/dist/style`))
        )
      done()
    }

    gulp.task(name, task)
    return task
  })
  .filter(t => t)

exports.default = gulp.series(css, ...styles)
