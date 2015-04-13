// Macros?
// TODO: how should flags be handled?

exports.errors = [{
    "regex" : "(.*?):(\\d*):(\\d*): error: implicit declaration of function '(.*?)' is invalid in C99 \\[-Werror,-Wimplicit-function-declaration\\]\n.*\n.*$",

    "callback": function(error_string, filename, line, char, function_name) {
    	return "<pre class = 'error_message'>" +error_string + "</pre><br>It looks like you're trying to use the function " + function_name + " on line " + line + " of " + filename + ". But clang doesn't seem to know what that function is by line " + line + "! Did you definitely spell the function correctly? If so, then clang needs a prototype for the function. You can do this by including the appropriate header at the top of this file. Alternatively, you can manually write a prototype yourself, or if the function is defined in this file, you can just move the function definition of " + function_name + " above that of the function in which you are trying to use it. Check out: <br><iframe width='960' height='540' src='https://www.youtube.com/embed/bQnyxpf0vk0?list=PLhQjrBD2T380JCGC3qD3nGpqt8iIjx2fV' frameborder='0' allowfullscreen></iframe>";
    }
},
{
    "regex" : "(.*?):(\\d*):(\\d*): error: implicitly declaring library function '(.*?)' with type '(.*?)' \\[-Werror\\]\n.*\n.*\n.*?:\\d*:\\d*: note: please include the header <(.*?)> or explicitly provide a declaration for '.*?'$",

    "callback": function(error_string, filename, line, char, function_name, function_type, header_name) {
    	return "It looks like you're trying to use the function " + function_name + " on line " + line + " of " + filename + ". As clang suggests, you probably want to include <" + header_name + ">. To do that, you can add `#include <stdio.h>` to the top of " + filename + "!";
    }
},
{
    // TODO: did you mean? (string suggests stdio, which is wrong)
    "regex" : "(.*?):(\\d*):(\\d*): error: use of undeclared identifier '(.*?)'\n.*\n.*$",

    "callback": function(error_string, filename, line, char, identifier) {
       if (identifier == "NULL")
        return "For NULL, don't forget to include stdio.h at the top of your file";
       else if (identifier == "bool" || identifier == "true" || identifier == "false")
        return "For boolean operators, don't forget to include stdbool.h at the top of your file.";
       else
        return "It looks like you have not defined the identifier:" + identifier + " on line " + line + "in file " + filename;
    }
},
{
    "regex" : "(.*?):(\\d*):(\\d*): error: variable '(.*?)' is uninitialized when used here \\[-Werror,-Wuninitialized\\]\n.*\n.*\n.*?:(\\d*):(\\d*): note: initialize the variable '.*?' to silence this warning\n.*\n.*\n.*$",

    "callback": function(error_string, filename, line, char, variable, declaration_line, declaration_char) {
        // TODO
    }
},
{
    "regex" : "(.*?):(\\d*):(\\d*): error: format specifies type '(.*?)' but the argument has type '(.*?)' \\[-Werror,-Wformat\\]\n.*\n.*$",

    "callback": function(error_string, filename, line, char, expected_type, actual_type) {
        return "It looks like on line " + line + ", you're trying to print a variable of type: " + expected_type + "but the same variable in your code has been declared as: " + actual_type;
    }
},
{
    "regex" : "(.*?):(\\d*):(\\d*): error: expected ';' after expression\n.*\n.*\n.*$",

    "callback": function(error_string, filename, line, char) {
	   return "Looks like you're missing a semi-colon (;) on line " + line + ". It might also be helpful to check line " + (line - 1) + " for errors."
    }
},
{
    "regex" : "(.*?):(\\d*):(\\d*): error: expression result unused \\[-Werror,-Wunused-value\\]\n.*\n.*$",

    "callback": function(error_string, filename, line, char) {
	   return "Looks like you did not use some result on line " + line + ". Is it an unused variable, some magic number etc.? Best to get rid of it to save memory!"
    }
},
{
    "regex" : "(.*?):(\\d*):(\\d*): error: incompatible integer to pointer conversion initializing '(.*?)' with an expression of type '(.*?)' \\[-Werror,-Wint-conversion\\]\n.*\n.*$",

    "callback": function(error_string, filename, line, char, variable_type, exp_type) {
        return "Looks like on line " + line + "you're trying to allocate memory to type " + variable_type + ". You should probably try type " + exp_type + " if you want to malloc."
    }
},
{
    "regex" : "(.*?):(\\d*):(\\d*): error: incompatible pointer to integer conversion initializing '(.*?)' with an expression of type '(.*?)' \\[-Werror,-Wint-conversion\\]\n.*\n.*$",

    "callback": function(error_string, filename, line, char, variable_type, exp_type) {
        return "Looks like you're trying to store a pointer in type " + variable_type + " on line " + line + ". You should try type " + exp_type;
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
