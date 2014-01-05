var util = require('../');
var should = require('should');
var path = require('path');
var es = require('event-stream');
require('mocha');

describe('date', function() {
  it('should be a date format instance', function(done) {
    util.date.should.equal(require('dateformat'));
    done();
  });
  it('should return today\'s date', function(done) {
    var time = new Date();
    var dateutil = util.date('HH:MM:ss');
    dateutil.should.equal(time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds());
    done();
  })
});