module.exports = {
  File: require('vinyl'),
  replaceExtension: require('replace-ext'),
  colors: require('chalk'),
  date: require('dateformat'),
  log: require('./lib/log'),
  template: require('./lib/template'),
  env: require('./lib/env'),
  beep: require('./lib/beep'),
  noop: require('./lib/noop'),
  isStream: require('./lib/isStream'),
  isBuffer: require('./lib/isBuffer'),
  isNull: require('./lib/isNull'),
  linefeed: '\n',
  combine: require('./lib/combine'),
  buffer: require('./lib/buffer'),
  PluginError: require('./lib/PluginError')
};
