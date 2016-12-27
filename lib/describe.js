// Add a description to a task function
// useful for the --tasks option
module.exports = function describe ( description, fn ) {
  fn.description = description;
  return fn;
};
