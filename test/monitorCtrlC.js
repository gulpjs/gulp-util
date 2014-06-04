var should = require('should');
var gutil = require('../');
require('mocha');

// We can't use mocha's 'beforeEach' and 'afterEach' because we're hijacking
// system behaviour and need to restore the original one as soon as possible
function hijackSystemCalls(consoleBuffer, cb) {
  process.stdin.should.be.ok;
  process.stdin.listeners('data').length.should.equal(0);

  var originalIsTTY = process.stdin.isTTY;
  process.stdin.isTTY = true;

  var originalSetRawMode = process.stdin.setRawMode;
  process.stdin.setRawMode = function () { consoleBuffer.push('setRawMode'); };

  var originalProcessExit = process.exit;
  process.exit = function () { consoleBuffer.push('exit'); };

  var originalConsoleLog = console.log;
  console.log = function () { consoleBuffer.push(Array.prototype.slice.call(arguments, 0)); };

  try {
    cb();
  } finally {
    console.log = originalConsoleLog;
    process.exit = originalProcessExit;
    process.stdin.setRawMode = originalSetRawMode;
    process.stdin.isTTY = originalIsTTY;
    process.stdin.removeAllListeners('data');
  }
}


describe('monitorCtrlC()', function () {

  it('should use default handler', function () {
    var consoleBuffer = [];
    hijackSystemCalls(consoleBuffer, function () {
      gutil.monitorCtrlC();
      process.stdin.emit('data', new Buffer('\u0003')); // fake ^C

      consoleBuffer.length.should.equal(3);
      consoleBuffer[0].should.equal('setRawMode');
      consoleBuffer[1].join(' ').should.endWith('exitting');
      consoleBuffer[2].should.equal('exit');
    });
  });

  it('should use specified handler', function () {
    var consoleBuffer = [];
    hijackSystemCalls(consoleBuffer, function () {
      gutil.monitorCtrlC(function () { consoleBuffer.push('custom'); });
      process.stdin.emit('data', new Buffer('\u0003')); // fake ^C

      consoleBuffer.length.should.equal(2);
      consoleBuffer[0].should.equal('setRawMode');
      consoleBuffer[1].should.equal('custom');
    });
  });

});
