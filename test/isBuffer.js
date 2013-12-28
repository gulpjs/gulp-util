var util = require('../');
var should = require('should');
var path = require('path');
var es = require('event-stream');
require('mocha');

describe('isBuffer()', function(){
  it('should work on a buffer', function(done){
    util.isBuffer(new Buffer('huh')).should.equal(true);
    done();
  });
  it('should not work on a stream', function(done){
    util.isBuffer(es.map(function(){})).should.equal(false);
    done();
  });
});