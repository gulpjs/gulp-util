var chalk = require('chalk');
var date = require('dateformat');

module.exports = function(){
  var sig = '['+chalk.green('gulp')+']';
  var time = '['+chalk.grey(date(new Date(), 'HH:MM:ss'))+']';
  var args = Array.prototype.slice.call(arguments);
  args.unshift(time);
  args.unshift(sig);
  console.log.apply(console, args);
  return this;
};
