var util = require('util');
var colors = require('./colors');
var _ = require('lodash');
var uniq = require('lodash.uniq');

var nonEnumberableProperties = ['name', 'message', 'stack'];
var propertiesNotToDisplay = nonEnumberableProperties.concat(['plugin', 'showStack', 'showProperties', '__safety']);

// wow what a clusterfuck
var parseOptions = function(plugin, message, opt) {
  if (!opt) opt = {};
  if (typeof plugin === 'object') {
    opt = plugin;
  } else {
    if (message instanceof Error) {
      opt.error = message;
    } else if (typeof message === 'object') {
      opt = message;
    } else if (typeof opt === 'object') {
      opt.message = message;
    }
    opt.plugin = plugin;
  }

  _.defaults(opt, {
    showStack: false,
    showProperties: true
  })

  return opt;
};

function PluginError(plugin, message, opt) {
  if (!(this instanceof PluginError)) throw new Error('Call PluginError using new');

  Error.call(this);

  var options = parseOptions(plugin, message, opt);

  // if options has an error, grab details from it
  if (options.error) {
    // These properties are not enumerable, so we have to add them explicitly.
    uniq(Object.keys(options.error).concat(nonEnumberableProperties))
      .forEach(function(prop) {
        this[prop] = options.error[prop];
      }, this);
  }

  var properties = ['name', 'message', 'fileName', 'lineNumber', 'stack', 'showStack', 'showProperties', 'plugin'];

  // options object can override
  properties.forEach(function(prop) {
    if (prop in options) this[prop] = options[prop];
  }, this);

  // defaults
  if (!this.name) this.name = 'Error';

  if (!this.stack) {
    // Error.captureStackTrace appends a stack property which relies on the toString method of the object it is applied to.
    // Since we are using our own toString method which controls when to display the stack trace if we don't go through this
    // safety object, then we'll get stack overflow problems.
    var safety = {
      toString: function() {
        return this._messageWithDetails() + '\nStack:';
      }.bind(this)
    };
    Error.captureStackTrace(safety, arguments.callee || this.constructor);
    this.__safety = safety;
  }

  if (!this.plugin) throw new Error('Missing plugin name');
  if (!this.message) throw new Error('Missing error message');
}

util.inherits(PluginError, Error);

PluginError.prototype._messageWithDetails = function() {
  var details = this._messageDetails();

  if (details === '') {
    return 'Message:\n    ' + this.message;
  }

  return 'Message:\n    ' + this.message + '\n' + details;
};

PluginError.prototype._messageDetails = function() {
  if (this.showProperties) {
    var res = _(Object.keys(this))
      .filter(function(prop) { return propertiesNotToDisplay.indexOf(prop) === -1; })
      .map(function(prop) { return '\n    ' + prop + ': ' + this[prop]; }, this)
      .reduce(function(properties, next) { return properties + next; });

    return 'Details:' + res;
  } else {
    return '';
  }
};

PluginError.prototype.toString = function () {
  var sig = colors.red(this.name) + ' in plugin \'' + colors.cyan(this.plugin) + '\'';

  if (this.showStack) {
    if (this.__safety) { // There is no wrapped error, use the stack captured in the PluginError ctor
      msg = this.__safety.stack;
    } else if (this._stack) {
      msg = this._messageWithDetails() + '\n' + this._stack;
    } else { // Stack from wrapped error
      msg = this._messageWithDetails() + '\n' + this.stack;
    }
  } else {
    msg = this._messageWithDetails();
  }

  return sig+'\n'+msg;
};

module.exports = PluginError;
