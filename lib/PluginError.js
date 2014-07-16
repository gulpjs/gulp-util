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

  return opt;
};

function PluginError(plugin, message, opt) {
  if (!(this instanceof PluginError)) throw new Error('Call PluginError using new');

  Error.call(this);

  var options = parseOptions(plugin, message, opt);

  this.plugin = options.plugin;
  this.showStack = options.showStack === true;
  this.showProperties = options.showProperties === true || options.showProperties === undefined;

  // if options has an error, grab details from it
  if (options.error) {
    uniq(Object.keys(options.error).concat(nonEnumberableProperties)) // These properties are not enumerable, so we have to add them explicitly.
      .forEach(function(prop) {
        this[prop] = options.error[prop];
      }, this);
  }

  var properties = ['name', 'message', 'fileName', 'lineNumber', 'stack'];

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
        return this.messageDetails + '\nStack:';
      }.bind(this)
    };
    Error.captureStackTrace(safety, arguments.callee || this.constructor);
    this.__safety = safety;
  }

  if (!this.plugin) throw new Error('Missing plugin name');
  if (!this.message) throw new Error('Missing error message');
}

util.inherits(PluginError, Error);

PluginError.prototype.__defineGetter__('messageDetails', function() {
  debugger;
  if (this.showProperties) {
    var res = _(Object.keys(this))
    .filter(function(prop) { return propertiesNotToDisplay.indexOf(prop) === -1; })
    .map(function(prop) { return '\n    ' + prop + ': ' + this[prop]; }, this)
    .reduce(function(properties, next) { return properties + next; });

    return 'Message:\n    ' + this.message + '\nDetails:' + res;
  } else {
    return 'Message:\n    ' + this.message;
  }
});

PluginError.prototype.toString = function () {
  var sig = colors.red(this.name) + ' in plugin \'' + colors.cyan(this.plugin) + '\'';

  if (this.showStack) {
    if (this.__safety) {
      msg = this.__safety.stack;
    } else if (this._stack) {
      msg = this._stack;
    } else {
      msg = this.stack;
    }
  } else {
    msg = this.messageDetails;
  }

  return sig+'\n'+msg;
};

module.exports = PluginError;
