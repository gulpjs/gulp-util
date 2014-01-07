var es = require('event-stream');

module.exports = function(){
  return es.through(function(data){
    this.emit('data', data);
  });
};
