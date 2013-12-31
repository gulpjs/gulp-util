var es = require('event-stream');

module.exports = function(cb) {
  var buf = [];
  var end = function() {
    this.emit('data', buf);
    this.emit('end');
    if(cb) cb(null, buf);
  };
  return es.through(buf.push.bind(buf), end);
};