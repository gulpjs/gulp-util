var through = require('through2');

module.exports = function(cb) {
  var buf = [];
  var end = function() {
    this.emit('data', buf);
    this.emit('end');
    if(cb) cb(null, buf);
  };
  var push = function(data, enc, cb) {
    buf.push(data);
    cb();
  };
  return through.obj(push, end);
};