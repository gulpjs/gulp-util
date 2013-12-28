var util = require('../');
var should = require('should');
var path = require('path');
var es = require('event-stream');
require('mocha');

describe('colors', function(){
  it('should be a chalk instance', function(done){
    util.colors.should.equal(require('chalk'));
    done();
  });
});