// Macros?
// TODO: how should flags be handled?

exports.errors = [{
    "regex" : "(.*?):(\\d*):(\\d*): error: implicit declaration of function '(.*?)' is invalid in C99 \\[-Werror,-Wimplicit-function-declaration\\]\n.*\n.*$",

    "callback": function(error_string, filename, line, char, function_name) {
    	return "<pre class = 'error_message'>" +error_string + "</pre><br>" +
    	"<div class = 'help_message'> It looks like you're trying to use the function <a href='#' class='code-line' data-function='" +
        function_name + "' data-line='" + line + "' data-filename='" + filename + "'>" + function_name + " on line " + line + " of " + filename +
        "</a>. But clang doesn't seem to know what that function is" +
    	" by line " + line + "! Did you definitely spell the function correctly? If so, then clang needs" +
    	"a prototype for the function. You can do this by including the appropriate header at the top of" +
    	" this file. Alternatively, you can manually write a prototype yourself, or if the function is " +
    	"defined in this file, you can just move the function definition of " + function_name + " above " +
    	"that of the function in which you are trying to use it. </div> <div class = 'help_video'>" +
    	" <b> Check out: </b> <br> <br> <iframe class = 'youtube_video' width='960' height='540' src='https://www.youtube.com/embed/CSZLNYF4Klo' frameborder='0' allowfullscreen></iframe> </div>";
    }
},
{
    "regex" : "(.*?):(\\d*):(\\d*): error: implicitly declaring library function '(.*?)' with type '(.*?)' \\[-Werror\\]\n.*\n.*\n.*?:\\d*:\\d*: note: please include the header <(.*?)> or explicitly provide a declaration for '.*?'$",

    "callback" : function(error_string, filename, line, char, function_name, function_type, header_name) {
    	return "It looks like you're trying to use the function " + function_name + " on line " + line + " of " + filename + ". As clang suggests, you probably want to include &lt;" + header_name + "&gt;. To do that, you can add <pre>#include &lt;" + header_name + "&gt;</pre> to the top of " + filename + "!";
    }
},
{
    // TODO: did you mean? (string suggests stdio, which is wrong)
    "regex" : "(.*?):(\\d*):(\\d*): error: use of undeclared identifier '(.*?)'(?: did you mean '(.*?)'\\?)?\n.*\n.*$",

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
    "regex" : "(.*?):(\\d*):(\\d*): error: expected '(.*?)' after expression\n.*\n.*\n.*$",

    "callback": function(error_string, filename, line, char, symbol) {
	   return "Looks like you're missing a " + symbol + " on line " + line + ". It might also be helpful to check line " + (line - 1) + " for errors."
    }
},
{
    "regex" : "(.*?):(\\d*):(\\d*): error: expression result unused \\[-Werror,-Wunused-value\\]\n.*\n.*$",

    "callback": function(error_string, filename, line, char) {
	   return "Looks like you did not use some result on line " + line + ". Is it an unused variable, some magic number etc.? Best to get rid of it to save memory!"
    }
},
{
    // incompatible integer to pointer conversion initializing 'int *' with an expression of type 'int'; take the address with &
    "regex" : "(.*?):(\\d*):(\\d*): error: incompatible integer to pointer conversion initializing '(.*?)' with an expression of type '(.*?)' \\[-Werror,-Wint-conversion\\]\n.*\n.*$",

    "callback": function(error_string, filename, line, char, variable_type, exp_type) {
        return "Looks like on line " + line + "you're trying to allocate memory to type " + variable_type + ". You should probably try type " + exp_type + " if you want to malloc."
    }
},
{
    // incompatible pointer to integer conversion initializing 'int' with an expression of type 'int *'; remove &
    // incompatible pointer to integer conversion initializing 'int' with an expression of type 'int *'; dereference with *
    "regex" : "(.*?):(\\d*):(\\d*): error: incompatible pointer to integer conversion initializing '(.*?)' with an expression of type '(.*?)' \\[-Werror,-Wint-conversion\\]\n.*\n.*$",

    "callback": function(error_string, filename, line, char, variable_type, exp_type) {
        return "Looks like you're trying to store a pointer in type " + variable_type + " on line " + line + ". You should try type " + exp_type;
    }
},
{
    // incompatible pointer to integer conversion returning 'int *' from a function with result type 'int'; dereference with *
    "regex" : "(.*?):(\\d*):(\\d*): error: incompatible pointer to integer conversion returning '(.*?)' from a function with result type '(.*?)' \\[-Werror,-Wint-conversion\\]\n.*\n.*$",

    "callback" : function(error_string, filename, line, char, exp_type, function_type) {
    }
},
{
    // incompatible integer to pointer conversion returning 'int' from a function with result type 'int *'; take the address with &
    "regex" : "(.*?):(\\d*):(\\d*): error: incompatible integer to pointer conversion returning '(.*?)' from a function with result type '(.*?)' \\[-Werror,-Wint-conversion\\]\n.*\n.*$",

    "callback" : function(error_string, filename, line, char, exp_type, function_type) {
    	return error_string + filename + line + char + exp_type + function_type;
    }
},
{
    "regex" : ".*?: In function `(.*?)':\n(.*?):(\\d*): undefined reference to `(.*?)'\nclang: error: linker command failed with exit code 1 \\(use -v to see invocation\\)$",

    "callback" : function(error_string, function_name, filename, line, reference) {
	// note that "filename" is the full path to the file, unlike previous errors
    }
},
{
    "regex" : "(.*?):(\\d*):(\\d*): error: implicit conversion from '(.*?)' to '(.*?)' changes value from (.*?) to (.*?) \\[-Werror,-Wliteral-conversion\\]\n.*\n.*$",

    "callback" : function(error_string, filename, line, char, type1, type2, value1, value2) {
    }

},
{
    "regex" : "(.*?):(\\d*):(\\d*): error: unused variable '(.*?)' \\[-Werror,-Wunused-variable\\]$",

    "callback" : function(error_string, filename, line, char, variable) {
    return "Looks like the variable " + variable + " is unused. Best to remove it if you're not going to use it to save memory!";
    }
},
{
    // incompatible pointer types initializing 'int **' with an expression of type 'int *'; take the address with &
    // incompatible pointer types initializing 'int *' with an expression of type 'int **'; dereference with *
    "regex" : "(.*?):(\\d*):(\\d*): error: incompatible pointer types initializing '(.*?)' with an expression of type '(.*?)' \\[-Werror,-Wincompatible-pointer-types\\]\n.*\n.*$",

    "callback" : function(error_string, filename, line, char, type1, type2) {
    }
},
{
    "regex" : "(.*?):(\\d*):(\\d*): error: address of stack memory associated with local variable '(.*?)' returned \\[-Werror,-Wreturn-stack-address\\]\n.*\n.*$",

    "callback" : function(error_string, filename, line, char, variable) {
    }

},
{
    "regex" : "(.*?):(\\d*):(\\d*): error: expected expression",
    "callback" : function (error_string, filename, line, char) {
        return "Seems like you have a wrong character on line " + line + ". It is either an extraneous character and you can delete it or you need to replace it with the correct character.";
    }
},
{
    "regex" : "(.*?):(\\d*):(\\d*): error: incompatible pointer to integer conversion assigning to '(.*?)' from '(.*?)' \\[-Werror,-Wint-conversion\\]\n.*\n.*$",
    "callback" : function (error_string, filename, line, char, type1, type2) {
        return "Seems like you're trying to convert a pointer variable into an integer variable on line " + line;
    }
},
{
    "regex" : "(.*?):(\\d*):(\\d*): error: extraneous '(.*?)' before '(.*?)'",
    "callback" : function (error_string, filename, line, char, symbol1, symbol2) {
        return "Looks like you have an extraneous symbol " + symbol1 + " before " + symbol2 + " on line " + 
        line + ". It might help to check if " + symbol1 + " is missing its match.";
    }
},
{
    "regex" : "(.*?):(\\d*):(\\d*): error: expected '(.*?)'",
    "callback" : function (error_string, filename, line, char) {
        return "You're missing a brace on line " + line + ". You might want to add a brace on this line to match a brace from earlier in the code.";
    }
},
{
    "regex" : "(.*?):(\\d*):(\\d*): error: division by zero is undefined \\[-Werror,-Wdivision-by-zero\\]\n.*\n.*$",
    "callback" : function (error_string, filename, line, char) {
        return "You're dividing by zero on line " + line + ", but division by zero is an undefined operation.";
    }
}
    // incompatible pointer types returning 'int **' from a function with result type 'int *'; dereference with * (test19)
    // incompatible pointer types returning 'int *' from a function with result type 'int **'; take the address with & (test20)
    // incompatible pointer types returning 'int *' from a function with result type 'int ***' (test21)

    // invalid operands to binary expression ('void' and 'int *') (test28) (test30)

    // integer constant is larger than the largest unsigned integer type (test29)

    // expected '}' (test31)

    // expected identifier or '(' (test 32)

    // expected ';' after top level declarator (test 33)

    // extraneous closing brace ('}') (test 34)
    // extraneous ')' before ';' (test36)
    // expected expression (test37)
    // expected parameter declarator (test38)
    // control reaches end of non-void function (test39)
    // undefined reference to `main' (test40)
    // remainder by zero is undefined (42)

    // struct stuff?

]
