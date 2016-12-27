var hasGulplog = require('has-gulplog');

module.exports = function(){
  var args;
  if(arguments) {
    var PluginError = require('./PluginError');
    args = Array.prototype.slice.call(arguments);
    args.forEach(function(currentValue, index, array) {
      if(currentValue.constructor === PluginError) {
        array[index] = currentValue.toString();
      }
    });
  }
  if(hasGulplog()){
    // specifically deferring loading here to keep from registering it globally
    var gulplog = require('gulplog');
    gulplog.info.apply(gulplog, args);
  } else {
    // specifically defering loading because it might not be used
    var fancylog = require('fancy-log');
    fancylog.apply(null, args);
  }
  return this;
};
