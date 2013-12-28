var util = require('../');
var should = require('should');
var path = require('path');
var es = require('event-stream');
require('mocha');

describe('isStream()', function(){
  it('should work on a stream', function(done){
    util.isStream(es.map(function(){})).should.equal(true);
    done();
  });
  it('should not work on a buffer', function(done){
    util.isStream(new Buffer('huh')).should.equal(false);
    done();
  });
});