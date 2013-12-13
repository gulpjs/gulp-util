var template = require('lodash.template');

var forcedSettings = {
  escape: /<%-([\s\S]+?)%>/g,
  evaluate: /<%([\s\S]+?)%>/g,
  interpolate: /<%=([\s\S]+?)%>/g
};

module.exports = function(tmpl, data){
  var fn = template(tmpl, null, forcedSettings);

  var wrapped = function(o) {
    if (!o.file) throw new Error("Failed to provide the current file as 'file' to the template");
    return fn(o);
  };

  return (data ? wrapped(data) : wrapped);
};