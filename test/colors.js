var util = require('..');
require('should');
require('mocha');

describe('colors', function(){
  it('should be a chalk instance', function(done){
    util.colors.should.equal(require('chalk'));
    done();
  });
});
