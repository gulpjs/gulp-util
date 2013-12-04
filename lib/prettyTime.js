module.exports = function(seconds){
  if (seconds > 1) return {
    value: seconds,
    unit: "seconds",
    shortUnit: "s"
  };
  return {
    value: seconds*1000,
    unit: "milliseconds",
    shortUnit: "ms"
  };
};