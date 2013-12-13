var util = require('../');
var should = require('should');
var path = require('path');
var es = require('event-stream');
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
      var writtenValue;

      // Stub process.stdout.write
      var stdout_write = process.stdout.write;
      process.stdout.write = function(value) {
        writtenValue = value;
      };

      util.log(1, 2, 3, 4, "five");
      writtenValue.should.eql('['+util.colors.green('gulp')+'] 1 2 3 4 five\n');

      // Restore process.stdout.write
      process.stdout.write = stdout_write;
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

    it('should ignore modified templateSettings', function(done){
      var templateSettings = require('lodash.templatesettings');
      templateSettings.interpolate = /\{\{([\s\S]+?)\}\}/g;

      var opt = {
        name:"todd",
        file: {
          path: "hi.js"
        }
      };
      var expected = "test {{name}} hi.js";

      var tmpl = util.template('test {{name}} <%= file.path %>');
      should.exist(tmpl);
      'function'.should.equal(typeof(tmpl));

      // eval it now
      var etmpl = tmpl(opt);
      'string'.should.equal(typeof(etmpl));
      etmpl.should.equal(expected);

      done();
    });

    it('should allow ES6 delimiters', function(done){
      var opt = {
        name:"todd",
        file: {
          path: "hi.js"
        }
      };
      var expected = "test todd hi.js";

      var tmpl = util.template('test ${name} ${file.path}');
      should.exist(tmpl);
      'function'.should.equal(typeof(tmpl));

      // eval it now
      var etmpl = tmpl(opt);
      'string'.should.equal(typeof(etmpl));
      etmpl.should.equal(expected);

      done();
    });

  });

  describe('replaceExtension()', function() {
    it('should return a valid replaced extension on nested', function(done) {
      var fname = path.join(__dirname, "./fixtures/test.coffee");
      var expected = path.join(__dirname, "./fixtures/test.js");
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

  describe('File()', function() {
    it('should return a valid file', function(done) {
      var fname = path.join(__dirname, "./fixtures/test.coffee");
      var base = path.join(__dirname, "./fixtures/");
      var file = new util.File({
        base: base,
        cwd: __dirname,
        path: fname
      });
      should.exist(file, 'root');
      should.exist(file.relative, 'relative');
      should.exist(file.path, 'path');
      should.exist(file.cwd, 'cwd');
      should.exist(file.base, 'base');
      file.path.should.equal(fname);
      file.cwd.should.equal(__dirname);
      file.base.should.equal(base);
      file.relative.should.equal("test.coffee");
      done();
    });

    it('should return a valid file 2', function(done) {
      var fname = path.join(__dirname, "./fixtures/test.coffee");
      var base = __dirname;
      var file = new util.File({
        base: base,
        cwd: __dirname,
        path: fname
      });
      should.exist(file, 'root');
      should.exist(file.relative, 'relative');
      should.exist(file.path, 'path');
      should.exist(file.cwd, 'cwd');
      should.exist(file.base, 'base');
      file.path.should.equal(fname);
      file.cwd.should.equal(__dirname);
      file.base.should.equal(base);
      file.relative.should.equal("fixtures/test.coffee");
      done();
    });
  });

  describe('beep()', function(){
    it('should send the right code to stdout', function(done){
      var writtenValue;

      // Stub process.stdout.write
      var stdout_write = process.stdout.write;
      process.stdout.write = function(value) {
        writtenValue = value;
      };

      util.beep();
      writtenValue.should.equal('\x07');

      // Restore process.stdout.write
      process.stdout.write = stdout_write;
      done();
    });
  });

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

});
