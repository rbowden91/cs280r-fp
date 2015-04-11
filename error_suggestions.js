var extend = require('util')._extend;
var errors = require("./errors").errors;

// clang is annoying and automatically adds line breaks to make errors more readable. So, replace
// spaces in our regex with "\s+", so the regex may also match newlines, and compile it
for (var i in errors) {
    errors[i].compiled = new RegExp(errors[i].regex.replace(/ /g, '\\s+'), "m");
}

exports.suggest = function(terminal_output) {
    for (var i in errors) {
	var m = errors[i].compiled.exec(terminal_output);
	if (m !== null && (typeof first_error === 'undefined' || first_error.index > m.index)) {
	    var first_error = m;
	    first_error.callback = errors[i].callback
	}
    }

    if (typeof first_error !== 'undefined') {
    	return first_error.callback.apply(null, first_error);
    }

    // TODO what if an error exists but is unrecognized?
    return false;
}
