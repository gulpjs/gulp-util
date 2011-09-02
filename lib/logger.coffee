require 'colors'
pack = require('./package').load()
  
module.exports =
  log: (str) ->
    console.log str
  
  debug: (str) ->
    console.log '[' + pack.name.magenta, '-', 'DEBUG'.upcase().green.inverse + ']', str	
      
  info: (str) ->
    console.log '[' + pack.name.magenta, '-', 'info'.white + ']', str
      
  warn: (str) ->
    console.log '[' + pack.name.magenta, '-', 'warn'.upcase().yellow + ']', str

  error: (str) ->
    console.log '[' + pack.name.magenta, '-', 'debug'.upcase().red.inverse + ']', str
