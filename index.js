var deprecated = require('deprecated');

var gutil = {
  log: require('./lib/log'),
  buffer: require('./lib/buffer'),
  PluginError: require('./lib/PluginError')
};

deprecated.field('gutil.File() has been deprecated. ' +
  'Use the `vinyl` module directly.',
  console.warn,
  gutil,
  'File',
  require('vinyl')
);

deprecated.field('gutil.replaceExtension() has been deprecated. ' +
  'Set the `extname` property of vinyl objects instead.',
  console.warn,
  gutil,
  'replaceExtension',
  require('replace-ext')
);

deprecated.field('gutil.colors has been deprecated. ' +
  'Use the `chalk` module directly.',
  console.warn,
  gutil,
  'colors',
  require('chalk')
);

deprecated.field('gutil.date() has been deprecated. ' +
  'Use the `dateformat` module directly.',
  console.warn,
  gutil,
  'date',
  require('dateformat')
);

deprecated.field('gutil.template() has been deprecated. ' +
  'Use the `lodash.template` module directly.',
  console.warn,
  gutil,
  'template',
  require('./lib/template')
);

deprecated.field('gutil.beep() has been deprecated. ' +
  'Use the `beeper` module directly.',
  console.warn,
  gutil,
  'beep',
  require('beeper')
);

deprecated.field('gutil.env has been deprecated. ' +
  'Use the `minimist` module directly.',
  console.warn,
  gutil,
  'env',
  require('./lib/env')
);

deprecated.field('gutil.noop() has been deprecated. ' +
  'Use the `through2` module directly with the `through.obj()` method',
  console.warn,
  gutil,
  'noop',
  require('./lib/noop')
);

deprecated.field('gutil.isStream() has been deprecated. ' +
  'Use the `isStream()` method of vinyl objects instead.',
  console.warn,
  gutil,
  'isStream',
  require('./lib/isStream')
);

deprecated.field('gutil.isBuffer() has been deprecated. ' +
  'Use the `isBuffer()` method of vinyl objects instead.',
  console.warn,
  gutil,
  'isBuffer',
  require('./lib/isBuffer')
);

deprecated.field('gutil.isNull() has been deprecated. ' +
  'Use the `isNull()` method of vinyl objects instead.',
  console.warn,
  gutil,
  'isNull',
  require('./lib/isNull')
);

deprecated.field('gutil.linefeed has been deprecated. ' +
  'Use the string `\n` instead.',
  console.warn,
  gutil,
  'linefeed',
  '\n'
);

deprecated.field('gutil.combine() has been deprecated. ' +
  'Use the `multipipe` module directly.',
  console.warn,
  gutil,
  'combine',
  require('./lib/combine')
);

module.exports = gutil;
