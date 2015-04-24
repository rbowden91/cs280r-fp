var extend = require('util')._extend;
var errors = require("./errors");

// clang is annoying and automatically adds line breaks to make errors more readable. So, replace
// spaces in our regex with "\s+", so the regex may also match newlines, and compile it
for (var i in errors.errors) {
    errors.errors[i].compiled = new RegExp(errors.errors[i].regex.replace(/ /g, '\\s+'), "m");
}

exports.suggest = function(terminal_output) {
    var num_errors = 0;

    var num_error_match = /(\d+) errors generated./m.exec(terminal_output);
    if (num_error_match !== null) {
	var num_errors = parseInt(num_error_match[1]);

	for (var i in errors.errors) {
	    var m = errors.errors[i].compiled.exec(terminal_output);
	    if (m !== null && (typeof first_error === 'undefined' || first_error.index > m.index)) {
		var first_error = m;
		first_error.callback = errors.errors[i].callback
	    }
	}

	// TODO: this shouldn't be the case unless we don't know how to handle an error
	if (typeof first_error !== 'undefined') {
	    var ret = "";
	    if (num_errors > 1) {
	    	ret += "You have " + num_errors + " error messages. Let's handle just the first, and then you can try recompiling."
	    }

	    ret += "<div class='error_message'>" + first_error[0] + "</div>";
	    ret += first_error.callback.apply(errors.common, first_error);

	    return ret;
	}
    }

    return false;
}
