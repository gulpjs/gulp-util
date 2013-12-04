module.exports = {
  realBase: require('./lib/realBase'),
  replaceExtension: require('./lib/replaceExtension'),
  colors: require('chalk'),
  log: require('./lib/log'),
  template: require('./lib/template'),
  env: require('optimist').argv
};