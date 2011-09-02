fs = require 'fs'
path = require 'path'

# Singleton for the contents of package.json
exports.load = ->
  if !@package
    location = path.join(__dirname, '../', 'package.json')
    @package = JSON.parse fs.readFileSync(location)
    return @package
  else
    return @package
