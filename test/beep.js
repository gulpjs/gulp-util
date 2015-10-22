var util = require('..');
require('should');
require('mocha');

describe('beep()', function() {
  it('should send the right code to stdout', function(done) {
    var writtenValue;

    // Stub process.stdout.write
    var stdoutWrite = process.stdout.write;
    process.stdout.write = function(value) {
      writtenValue = value;
    };

    util.beep();
    writtenValue.should.equal('\x07');

    // Restore process.stdout.write
    process.stdout.write = stdoutWrite;
    done();
  });
});
