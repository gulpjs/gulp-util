var util = require('..');
require('should');
require('mocha');

describe('describe', function(){
  it('should add a description to a function and return it', function(done){
	var fn = function () {};
    util.describe('full description', fn).description.should.equal('full description');
    done();
  });
});
