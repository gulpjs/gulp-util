var colors = require('./colors');
var date = require('./date');

module.exports = function(logger){
  // Default logging function
  if (!logger) {
    logger = console.log;
  }

  var logFunction = function () {
    var sig = '['+colors.green('gulp')+']',
        time = '['+colors.grey(date(new Date(), 'HH:MM:ss'))+']',
        args = Array.prototype.slice.call(arguments);
    args.unshift(time);
    args.unshift(sig);
    logger.apply(console, args);
    return this;
  }
  return logFunction;
};
