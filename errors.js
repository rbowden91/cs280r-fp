// Macros?
// TODO: how should flags be handled?

exports.errors = [{
    "regex" : "(.*?):(\\d*):(\\d*): error: implicit declaration of function '(.*?)' is invalid in C99 \\[-Werror,-Wimplicit-function-declaration\\]\n.*\n.*$",

    "callback": function(error_string, filename, line, char, function_name) {
    }
},
{
    "regex" : "(.*?):(\\d*):(\\d*): error: implicitly declaring library function '(.*?)' with type '(.*?)' \\[-Werror\\]\n.*\n.*\n.*?:\\d*:\\d*: note: please include the header <(.*?)> or explicitly provide a declaration for '.*?'$",

    "callback": function(error_string, filename, line, char, function_name, function_type, header_name) {
    	return error_string;
    }
},
{
    // TODO: did you mean? (string suggests stdio, which is wrong)
    "regex" : "(.*?):(\\d*):(\\d*): error: use of undeclared identifier '(.*?)'\n.*\n.*$",

    "callback": function(error_string, filename, line, char, identifier) {
	// TODO: special cases like NULL
    }
},
{
    "regex" : "(.*?):(\\d*):(\\d*): error: variable '(.*?)' is uninitialized when used here \\[-Werror,-Wuninitialized\\]\n.*\n.*\n.*?:(\\d*):(\\d*): note: initialize the variable '.*?' to silence this warning\n.*\n.*\n.*$",

    "callback": function(error_string, filename, line, char, variable, declaration_line, declaration_char) {
    }
},
{
    "regex" : "(.*?):(\\d*):(\\d*): error: format specifies type '(.*?)' but the argument has type '(.*?)' \\[-Werror,-Wformat\\]\n.*\n.*$",

    "callback": function(error_string, filename, line, char, expected_type, actual_type) {
    }
},
{
    "regex" : "(.*?):(\\d*):(\\d*): error: expected ';' after expression\n.*\n.*\n.*$",

    "callback": function(error_string, filename, line, char) {
	// TODO sometimes you want to check BEFORE this line of code
    }
},
{
    "regex" : "(.*?):(\\d*):(\\d*): error: expression result unused \\[-Werror,-Wunused-value\\]\n.*\n.*$",

    "callback": function(error_string, filename, line, char) {
	// TODO how do you identify expression that's unused?
    }
},
{
    "regex" : "(.*?):(\\d*):(\\d*): error: incompatible integer to pointer conversion initializing '(.*?)' with an expression of type '(.*?)' \\[-Werror,-Wint-conversion\\]\n.*\n.*$",

    "callback": function(error_string, filename, line, char, variable_type, exp_type) {
    }
},
{
    "regex" : "(.*?):(\\d*):(\\d*): error: incompatible pointer to integer conversion initializing '(.*?)' with an expression of type '(.*?)' \\[-Werror,-Wint-conversion\\]\n.*\n.*$",

    "callback": function(error_string, filename, line, char, variable_type, exp_type) {
    }
},
{
    "regex" : "(.*?):(\\d*):(\\d*): error: incompatible pointer to integer conversion returning '(.*?)' from a function with result type '(.*?)' \\[-Werror,-Wint-conversion\\]\n.*\n.*$",

    "callback": function(error_string, filename, line, char, exp_type, function_type) {
    }
},
{
    "regex" : "(.*?):(\\d*):(\\d*): error: incompatible integer to pointer conversion returning '(.*?)' from a function with result type '(.*?)' \\[-Werror,-Wint-conversion\\]\n.*\n.*$",

    "callback": function(error_string, filename, line, char, exp_type, function_type) {
    	return error_string + filename + line + char + exp_type + function_type;
    }
},
{
    "regex" : ".*?: In function `(.*?)':\n(.*?):(\\d*): undefined reference to `(.*?)'\nclang: error: linker command failed with exit code 1 \\(use -v to see invocation\\)$",

    "callback": function(error_string, function_name, filename, line, reference) {
	// note that "filename" is the full path to the file, unlike previous errors
    }
},
{
    "regex" : "(.*?):(\\d*):(\\d*): error: implicit conversion from '(.*?)' to '(.*?)' changes value from (.*?) to (.*?) \\[-Werror,-Wliteral-conversion\\]\n.*\n.*$",

    "callback": function(error_string, filename, line, char, type1, type2, value1, value2) {
    }

},
{
    "regex" : "(.*?):(\\d*):(\\d*): error: unused variable '(.*?)' \\[-Werror,-Wunused-variable\\]$",

    "callback": function(error_string, filename, line, char, variable) {
    }
}]
