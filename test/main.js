var util = require('../');
var should = require('should');
var join = require('path').join;
require('mocha');

describe('gulp-util', function() {
  describe('colors', function(){
    it('should be a chalk instance', function(done){
      util.colors.should.equal(require('chalk'));
      done();
    });
  });

  describe('log()', function(){
    it('should work i guess', function(done){
      util.log(1, 2, 3, 4, "five");
      done();
    });
  });

  describe('prettyTime()', function(){
    it('should work with seconds', function(done){
      util.prettyTime(1.5).should.eql({
        value: 1.5,
        unit: "seconds",
        shortUnit: "s"
      });
      done();
    });

    it('should work with milliseconds', function(done){
      util.prettyTime(0.5).should.eql({
        value: 500,
        unit: "milliseconds",
        shortUnit: "ms"
      });
      done();
    });

    it('should work with milliseconds', function(done){
      util.prettyTime(0.01).should.eql({
        value: 10,
        unit: "milliseconds",
        shortUnit: "ms"
      });
      done();
    });

  });

  describe('template()', function(){
    it('should work with just a template', function(done){
      var opt = {
        name:"todd",
        file: {
          path: "hi.js"
        }
      };
      var expected = "test todd hi.js";

      var tmpl = util.template('test <%= name %> <%= file.path %>');
      should.exist(tmpl);
      'function'.should.equal(typeof(tmpl));

      // eval it now
      var etmpl = tmpl(opt);
      'string'.should.equal(typeof(etmpl));
      etmpl.should.equal(expected);
      done();
    });
    it('should work with a template and data', function(done){
      var opt = {
        name:"todd",
        file: {
          path: "hi.js"
        }
      };
      var expected = "test todd hi.js";
      var tmpl = util.template('test <%= name %> <%= file.path %>', opt);
      should.exist(tmpl);
      'string'.should.equal(typeof(tmpl));
      tmpl.should.equal(expected);
      done();
    });

    it('should throw an error when no file object is passed', function(done){
      var opt = {
        name:"todd"
      };
      try {
        var tmpl = util.template('test <%= name %> <%= file.path %>', opt);
      } catch (err) {
        should.exist(err);
        done();
      }
    });

  });

  describe('realBase()', function() {
    it('should return a valid shortened name', function(done) {
      var fname = join(__dirname, "./fixtures/test.coffee");
      var dname = join(__dirname, "./fixtures/");
      var shortened = util.realBase(dname, fname);
      should.exist(shortened);
      shortened.should.equal("test.coffee");
      done();
    });
  });

  describe('replaceExtension()', function() {
    it('should return a valid replaced extension on nested', function(done) {
      var fname = join(__dirname, "./fixtures/test.coffee");
      var expected = join(__dirname, "./fixtures/test.js");
      var nu = util.replaceExtension(fname, ".js");
      should.exist(nu);
      nu.should.equal(expected);
      done();
    });

    it('should return a valid replaced extension on flat', function(done) {
      var fname = "test.coffee";
      var expected = "test.js";
      var nu = util.replaceExtension(fname, ".js");
      should.exist(nu);
      nu.should.equal(expected);
      done();
    });

  });
});
