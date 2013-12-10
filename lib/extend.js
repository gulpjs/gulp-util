module.exports = function(dest) {
	var i, prop, source;
	for (i = 1; i < arguments.length; i++) {
		source = arguments[i];
		for (prop in source) {
			dest[prop] = source[prop];
		}
	}
	return dest;
};
