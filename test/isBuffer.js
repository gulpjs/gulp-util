var util = require('..');
var through = require('through2');
require('should');
require('mocha');

describe('isBuffer()', function(){
  it('should work on a buffer', function(done){
    util.isBuffer(new Buffer('huh')).should.equal(true);
    done();
  });
  it('should not work on a stream', function(done){
    util.isBuffer(through()).should.equal(false);
    done();
  });
});
