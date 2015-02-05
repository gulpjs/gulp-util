var template = require('lodash.template');
var reEscape = require('lodash._reescape');
var reEvaluate = require('lodash._reevaluate');
var reInterpolate = require('lodash._reinterpolate');

var forcedSettings = {
  escape: reEscape,
  evaluate: reEvaluate,
  interpolate: reInterpolate
};

module.exports = function(tmpl, data){
  var fn = template(tmpl, forcedSettings);

  var wrapped = function(o) {
    if (typeof o === 'undefined') throw new Error('You must provide an Object containing the keys for the template string.');
    return fn(o);
  };

  return (data ? wrapped(data) : wrapped);
};
