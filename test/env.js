var util = require('../');
var should = require('should');
var path = require('path');
var es = require('event-stream');
require('mocha');

describe('env', function(){
  it('should exist', function(done){
    should.exist(util.env);
    should.exist(util.env._);
    done();
  });
});