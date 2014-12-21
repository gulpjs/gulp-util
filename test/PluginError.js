var util = require('..');
require('should');
require('mocha');

describe('PluginError()', function(){
  it('should default name to Error', function() {
    var err = new util.PluginError('test', 'something broke');
    err.name.should.equal('Error');
  });

  it('should default name to Error, even when wrapped error has no name', function() {
    var realErr = { message: 'something broke' };
    var err = new util.PluginError('test', realErr);
    err.name.should.equal('Error');
  });

  it('should print the plugin name in toString', function(){
    var err = new util.PluginError('test', 'something broke');
    err.toString().should.containEql('test');
  });

  it('should not include the stack by default in toString', function(){
    var err = new util.PluginError('test', 'something broke');
    // just check that there are no 'at' lines
    err.toString().should.not.containEql('at');
  });

  it('should include the stack when specified in toString', function(){
    var err = new util.PluginError('test', 'something broke', {stack: 'at huh', showStack: true});
    // just check that there are 'at' lines
    err.toString().should.containEql('at');
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

  it('should show properties', function() {
    var err = new util.PluginError('test', 'it broke', {showProperties: true});
    err.fileName = 'original.js';
    err.lineNumber = 35;
    err.toString().should.containEql('it broke');
    err.toString().should.not.containEql('message:');
    err.toString().should.containEql('fileName:');
  });

  it('should show properties', function() {
    var realErr = new Error('something broke');
    realErr.fileName = 'original.js';
    realErr.lineNumber = 35;
    var err = new util.PluginError('test', realErr, {showProperties: true});
    err.toString().should.not.containEql('message:');
    err.toString().should.containEql('fileName:');
  });

  it('should not show properties', function() {
    var realErr = new Error('something broke');
    realErr.fileName = 'original.js';
    realErr.lineNumber = 35;
    var err = new util.PluginError('test', realErr, {showProperties: false});
    err.toString().should.not.containEql('message:');
    err.toString().should.not.containEql('fileName:');
  });

  it('should not show properties, but should show stack', function() {
    var err = new util.PluginError('test', 'it broke', {stack: 'test stack', showStack: true, showProperties: false});
    err.fileName = 'original.js';
    err.lineNumber = 35;
    err.toString().should.not.containEql('message:');
    err.toString().should.not.containEql('fileName:');
    err.toString().should.containEql('test stack');
  });

  it('should not show properties, but should show stack for real error', function() {
    var realErr = new Error('something broke');
    realErr.fileName = 'original.js';
    realErr.lineNumber = 35;
    realErr.stack = 'test stack';
    var err = new util.PluginError('test', realErr, {showStack: true, showProperties: false});
    err.toString().indexOf('message:').should.equal(-1);
    err.toString().indexOf('fileName:').should.equal(-1);
    err.toString().indexOf('test stack').should.not.equal(-1);
  });

  it('should not show properties, but should show stack for _stack', function() {
    var realErr = new Error('something broke');
    realErr.fileName = 'original.js';
    realErr.lineNumber = 35;
    realErr._stack = 'test stack';
    var err = new util.PluginError('test', realErr, {showStack: true, showProperties: false});
    err.toString().indexOf('message:').should.equal(-1);
    err.toString().indexOf('fileName:').should.equal(-1);
    err.toString().indexOf('test stack').should.not.equal(-1);
  });

  it('should show properties and stack', function(){
    var realErr = new Error('something broke');
    realErr.fileName = 'original.js';
    realErr.stack = 'test stack';
    var err = new util.PluginError('test', realErr, {showStack: true});
    err.toString().indexOf('message:').should.equal(-1);
    err.toString().indexOf('fileName:').should.not.equal(-1);
    err.toString().indexOf('test stack').should.not.equal(-1);
  });

  it('should show properties added after the error is created', function(){
    var realErr = new Error('something broke');
    var err = new util.PluginError('test', realErr);
    err.fileName = 'original.js';
    err.toString().indexOf('message:').should.equal(-1);
    err.toString().indexOf('fileName:').should.not.equal(-1);
  });

  it('should toString quickly', function(done) {
    this.timeout(100);

    var err = new util.PluginError('test', 'it broke', {showStack: true});
    err.toString();

    done();
  });

  it('should toString quickly with original error', function(done) {
    this.timeout(100);

    var realErr = new Error('it broke');
    var err = new util.PluginError('test', realErr, {showStack: true});
    err.toString();

    done();
  });

  it('should not show "Details:" if there are no properties to show', function() {
    var err = new util.PluginError('plugin', 'message');
    err.toString().indexOf('Details:').should.equal(-1);
  });
});
