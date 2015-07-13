var util = require('..');
var should = require('should');
require('mocha');

describe('glob', function(){
  it('should exist', function(done){
    should.exist(util.glob);
    should.exist(util.glob.sync);
    done();
  });  
});
