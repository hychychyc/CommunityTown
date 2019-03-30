var fs = require('fs');
var postcss = require('postcss');
var pxtorem = require('postcss-pxtorem');
var css = fs.readFileSync('all.css', 'utf8');
var options = {
  rootValue: 100,
  unitPrecision: 5,
  propList: ['*'],
  selectorBlackList: [],
  replace: true,
  mediaQuery: false,
  minPixelValue: 0
};
var processedCss = postcss(pxtorem(options)).process(css).css;

fs.writeFile('all-rem.css', processedCss, function (err) {
  if (err) {
    throw err;
  }
  console.log('Rem file written.');
});