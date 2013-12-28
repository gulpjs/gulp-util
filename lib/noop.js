var es = require('event-stream');

module.exports = function(){
  return es.map(function(data, cb){
    cb(null, data);
  });
};