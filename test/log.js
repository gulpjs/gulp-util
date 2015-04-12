var util = require('..');
require('should');
require('mocha');

describe('log()', function(){
  it('should work i guess', function(done){
    var writtenValue;

    // Stub process.stdout.write
    var stdout_write = process.stdout.write;
    process.stdout.write = function(value) {
      writtenValue = value;
    };

    util.log(1, 2, 3, 4, 'five');
    var time = util.date(new Date(), 'HH:MM:ss');
    writtenValue.should.eql('[' + util.colors.grey(time) + '] 1 2 3 4 five\n');

    // Restore process.stdout.write
    process.stdout.write = stdout_write;
    done();
  });

  it('should accept formatting', function(done){
    var writtenValue;

    // Stub process.stdout.write
    var stdout_write = process.stdout.write;
    process.stdout.write = function(value) {
      writtenValue = value;
    };

    util.log('%s %d %j', 'something', 0.1, {key: 'value'});
    var time = util.colors.grey(util.date(new Date(), 'HH:MM:ss'));
    writtenValue.should.eql(
      '[' + time + '] something 0.1 {\"key\": \"value\"}\n'
    );

    // Restore process.stdout.write
    process.stdout.write = stdout_write;
    done();
  });
});
