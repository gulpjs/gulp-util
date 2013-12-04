module.exports = {
  realBase: require('./lib/realBase'),
  replaceExtension: require('./lib/replaceExtension'),
  prettyTime: require('./lib/prettyTime'),
  colors: require('chalk'),
  log: require('./lib/log'),
  template: require('./lib/template'),
  env: require('optimist').argv
};