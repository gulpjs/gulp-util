var colors = require('./colors');
var date = require('./date');

module.exports = function(){
  var sig = '['+colors.green('gulp')+']';
  var time = '['+colors.grey(date(new Date(), 'HH:MM:ss'))+']';
  var args = Array.prototype.slice.call(arguments);
  args.unshift(time);
  args.unshift(sig);
  console.log.apply(console, args);
  return this;
};
