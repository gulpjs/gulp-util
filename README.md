![status](https://secure.travis-ci.org/wearefractal/gulp-util.png?branch=master)

## Information

<table>
<tr> 
<td>Package</td><td>gulp-util</td>
</tr>
<tr>
<td>Description</td>
<td>Utility functions for gulp plugins</td>
</tr>
<tr>
<td>Node Version</td>
<td>>= 0.8</td>
</tr>
</table>

## Usage

```javascript
var gutil = require('gulp-util');

gutil.log("stuff happened", "Really it did", gutil.colors.cyan("123"));
gutil.beep();

gutil.replaceExtension("file.coffee", ".js"); // file.js

var opt = {
  name: "todd",
  file: someGulpFile
};
gutil.template("test <%= name %> <%= file.path %>", opt) // test todd /js/hi.js
```

### log(msg...)

Logs stuff. Already prefixed with [gulp] and all that. Use the right colors for values. If you pass in multiple arguments it will join them by a space.

```
values (files, module names, etc.) = magenta
numbers (times, counts, etc) = cyan
```

### colors

This is an instance of [chalk](https://github.com/sindresorhus/chalk)

### replaceExtension(path, newExtension)

Replaces a file extension in a path. Returns the new path.

### isStream(obj)

Returns true or false if an object is a stream.

### isBuffer(obj)

Returns true or false if an object is a Buffer.

### template(string[, data])

This is a lodash.template function wrapper. You must pass in a valid gulp file object so it is available to the user or it will error. You can not configure any of the delimiters. Look at the [lodash docs](http://lodash.com/docs#template) for more info.

## new File(obj)

path and base attributes are required. Other attributes are stat, cwd, contents. The relative attribute is read-only and is based on the base+path relativity.

```javascript
var file = new gulp.File({
  base: join(__dirname, "./fixtures/"),
  cwd: __dirname,
  path: join(__dirname, "./fixtures/test.coffee")
});
```

## LICENSE

(MIT License)

Copyright (c) 2013 Fractal <contact@wearefractal.com>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
