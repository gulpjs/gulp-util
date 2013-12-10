var os = require('os');

// win32 is returned for 32-bit and 64-bit version of Windows alike
module.exports = os.EOL || (os.platform() === 'win32' ? '\r\n' : '\n');
