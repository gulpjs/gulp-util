var util = require('util');
var colors = require('./colors');
var uniq = require('lodash.uniq');

// wow what a clusterfuck
var parseOptions = function(plugin, message, opt) {
  if (!opt) opt = {};
  if (typeof plugin === 'object') {
    opt = plugin;
  } else if (message instanceof Error) {
    opt.error = message;
    opt.plugin = plugin;
    if (!opt.properties) {
      opt.properties = Object.keys(message);
    }
  } else if (typeof message === 'object') {
    opt = message;
    opt.plugin = plugin;
  } else if (typeof opt === 'object') {
    opt.plugin = plugin;
    opt.message = message;
  }

  var defaultProperties = ['name', 'message', 'fileName', 'lineNumber', 'stack'];

  if (!opt.properties) {
    opt.properties = [];
  }

  opt.properties = uniq(defaultProperties.concat(opt.properties));

  return opt;
};

function PluginError(plugin, message, opt) {
  if (!(this instanceof PluginError)) throw new Error('Call PluginError using new');

  Error.call(this);

  var options = parseOptions(plugin, message, opt);

  this.plugin = options.plugin;
  this.showStack = options.showStack === true;

  // if options has an error, grab details from it
  if (options.error) {
    options.properties.forEach(function(prop) {
      if (prop in options.error) this[prop] = options.error[prop];
    }, this);
  }

  // options object can override
  options.properties.forEach(function(prop) {
    if (prop in options) this[prop] = options[prop];
  }, this);

  // defaults
  if (!this.name) this.name = 'Error';

  // TODO: figure out why this explodes mocha
  if (!this.stack) Error.captureStackTrace(this, arguments.callee || this.constructor);

  if (!this.plugin) throw new Error('Missing plugin name');
  if (!this.message) throw new Error('Missing error message');
}

util.inherits(PluginError, Error);

PluginError.prototype.toString = function () {
  var sig = this.name+' in plugin \''+colors.cyan(this.plugin)+'\'';
  var msg = this.showStack ? (this._stack || this.stack) : this.message;
  return sig+'\n'+msg;
};

module.exports = PluginError;
