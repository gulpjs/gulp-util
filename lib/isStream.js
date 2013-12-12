module.exports = function(o) {
  return typeof o !== 'undefined' && typeof o.pipe === 'function';
};