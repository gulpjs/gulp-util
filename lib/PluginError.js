var util = require('util');
var colors = require('./colors');

function PluginError(plugin, message, opt) {
  if (!(this instanceof PluginError)) return new PluginError(plugin, message, opt);

  Error.call(this);

  // wow what a clusterfuck
  // plzhelp
  if (typeof plugin === 'object') {
    opt = plugin;
  } else if (typeof message === 'object') {
    opt = message;
    opt.plugin = plugin;
  } else if (typeof opt === 'object') {
    opt.plugin = plugin;
    opt.message = message;
  } else if (typeof opt === 'undefined') {
    opt = {
      plugin: plugin,
      message: message
    };
  }

  this.plugin = opt.plugin;
  this.showStack = opt.showStack;

  // if message is an Error grab crap off it
  // otherwise check opt
  if (opt.message.name) this.name = opt.message.name;
  if (opt.name) this.message = opt.name;
  if (!this.name) this.message = 'Error';

  if (opt.message.message) this.message = opt.message.message;
  if (!this.message) this.message = opt.message;

  if (opt.message.fileName) this.fileName = opt.message.fileName;
  if (opt.fileName) this.fileName = opt.fileName;

  if (opt.message.lineNumber) this.lineNumber = opt.message.lineNumber;
  if (opt.lineNumber) this.lineNumber = opt.lineNumber;

  if (opt.message.stack) this.stack = opt.message.stack;
  if (opt.stack) this.stack = opt.stack;

  // TODO: figure out why this explodes mocha
  if (!this.stack) Error.captureStackTrace(this, arguments.callee || this.constructor);
}

util.inherits(PluginError, Error);

PluginError.prototype.toString = function () {
  var sig = '['+colors.green('gulp')+'] '+this.name+' in plugin \''+colors.cyan(this.plugin)+'\'';
  var msg = this.showStack ? (this._stack || this.stack) : this.message;
  return sig+": "+msg;
};

module.exports = PluginError;