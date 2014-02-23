var util = require('../');
var should = require('should');
var path = require('path');
var date = require('dateformat');
var chalk = require('chalk');
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
    var time = date(new Date(), 'HH:MM:ss');
    writtenValue.should.eql('['+chalk.green('gulp')+'] [' + chalk.grey(time) + '] 1 2 3 4 five\n');

    // Restore process.stdout.write
    process.stdout.write = stdout_write;
    done();
  });
});
