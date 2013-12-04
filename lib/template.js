var template = require('lodash.template');

module.exports = function(tmpl, data){
  var fn = template(tmpl);

  var wrapped = function(o) {
    if (!o.file) throw new Error("Failed to provide the current file as 'file' to the template");
    return fn(o);
  };

  return (data ? wrapped(data) : wrapped);
};