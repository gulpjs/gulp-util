var util = require('../');
var should = require('should');
var path = require('path');
require('mocha');

describe('error()', function(){
  it('should print stuff to stderr', function(done){
    var writtenValue;

    // Stub process.stdout.write
    var stderr_write = process.stderr.write;
    process.stderr.write = function(value) {
      writtenValue = value;
    };

    util.error(1, 2, 3, 4, 'five');
    var time = util.date(new Date(), 'HH:MM:ss');
    writtenValue.should.eql('['+util.colors.green('gulp')+'] [' + util.colors.grey(time) + '] 1 2 3 4 five\n');

    // Restore process.stdout.write
    process.stderr.write = stderr_write;
    done();
  });
});
