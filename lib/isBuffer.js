var buf = require('buffer');
var SlowBuffer = buf.SlowBuffer;
var Buffer = buf.Buffer;

module.exports = function(o) {
  return typeof o === 'object' && o instanceof Buffer;
};