var path = require('path');

function File(file) {
  this.cwd = file.cwd || process.cwd();
  this.base = file.base || this.cwd;
  this.path = file.path;

  // stat = fs stats object
  this.stat = file.stat;
  // contents = stream, buffer, or null if not read
  this.contents = file.contents;

  this.__defineGetter__("relative", function(){
    if (!this.base) throw new Error("No base specified! Can not get relative.");
    if (!this.path) throw new Error("No path specified! Can not get relative.");
    return path.relative(this.base, this.path);
  });
}

module.exports = File;