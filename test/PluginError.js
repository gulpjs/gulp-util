var util = require('../');
var should = require('should');
var path = require('path');
require('mocha');

describe('PluginError()', function(){
  it('should print the plugin name in toString', function(){
    var err = new util.PluginError('test', 'something broke');
    err.toString().indexOf('test').should.not.equal(-1);
  });

  it('should not include the stack by default in toString', function(){
    var err = new util.PluginError('test', 'something broke');
    // just check that there are no 'at' lines
    err.toString().indexOf('at').should.equal(-1);
  });

  it('should include the stack when specified in toString', function(){
    var err = new util.PluginError('test', 'something broke', {stack: "at huh", showStack: true});
    // just check that there are 'at' lines
    err.toString().indexOf('at').should.not.equal(-1);
  });

  it('should take arguments as one object', function(){
    var err = new util.PluginError({
      plugin: 'test',
      message: 'something broke'
    });
    err.plugin.should.equal('test');
    err.message.should.equal('something broke');
  });

  it('should take arguments as plugin name and one object', function(){
    var err = new util.PluginError('test', {
      message: 'something broke'
    });
    err.plugin.should.equal('test');
    err.message.should.equal('something broke');
  });

  it('should take arguments as plugin name and message', function(){
    var err = new util.PluginError('test', 'something broke');
    err.plugin.should.equal('test');
    err.message.should.equal('something broke');
  });

  it('should take arguments as plugin name, message, and one object', function(){
    var err = new util.PluginError('test', 'something broke', {showStack: true});
    err.plugin.should.equal('test');
    err.message.should.equal('something broke');
    err.showStack.should.equal(true);
  });

  it('should take arguments as plugin name, error, and one object', function(){
    var realErr = new Error('something broke');
    realErr.fileName = 'original.js';
    var err = new util.PluginError('test', realErr, {showStack: true, fileName: 'override.js'});
    err.plugin.should.equal('test');
    err.message.should.equal('something broke');
    err.fileName.should.equal('override.js');
    err.showStack.should.equal(true);
  });

  it('should take properties from error', function() {
    var realErr = new Error('something broke');
    realErr.abstractProperty = 'abstract';
    var err = new util.PluginError('test', realErr);
    err.plugin.should.equal('test');
    err.message.should.equal('something broke');
    err.abstractProperty.should.equal('abstract');
  });

  it('should be configured to show properties by default', function(){
    var err = new util.PluginError('test', 'something broke');
    err.showProperties.should.be.true;
  });

  it('should not be configured to take option to show properties', function(){
    var err = new util.PluginError('test', 'something broke', {showProperties: false});
    err.showProperties.should.be.false;
  });

  it('should show properties in toString', function() {
    var realErr = new Error('something broke');
    realErr.fileName = 'original.js';
    realErr.lineNumber = 35;
    var err = new util.PluginError('test', realErr, {showProperties: true});
    err.toString().indexOf('message:').should.equal(-1);
    err.toString().indexOf('fileName:').should.not.equal(-1);
  });

  it('should not show properties in toString', function() {
    var realErr = new Error('something broke');
    realErr.fileName = 'original.js';
    realErr.lineNumber = 35;
    var err = new util.PluginError('test', realErr, {showProperties: false});
    err.toString().indexOf('message:').should.equal(-1);
    err.toString().indexOf('fileName:').should.equal(-1);
  });

  it('should show properties and stack in toString', function(){
    var realErr = new Error('something broke');
    realErr.fileName = 'original.js';
    var err = new util.PluginError('test', realErr, {showStack: true});
    err.messageDetails.indexOf('message:').should.equal(-1);
    err.messageDetails.indexOf('fileName:').should.not.equal(-1);
  });

  it('should show properties added after the error is created', function(){
    var realErr = new Error('something broke');
    var err = new util.PluginError('test', realErr);
    err.fileName = 'original.js';
    err.messageDetails.indexOf('message:').should.equal(-1);
    err.messageDetails.indexOf('fileName:').should.not.equal(-1);
  });
});
