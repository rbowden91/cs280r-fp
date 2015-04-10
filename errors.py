# Macros?
# TODO: how should flags be handled?

class Error1:
    expression = "(.*?):(\d*):(\d*): error: implicit declaration of function '(.*?)' is invalid in C99 \[-Werror,-Wimplicit-function-declaration\]\n.*\n.*$"

    @staticmethod
    def handle_result(error_string, filename, line, char, function_name):
	print error_string

class Error2:
    expression = "(.*?):(\d*):(\d*): error: implicitly declaring library function '(.*?)' with type '(.*?)' \[-Werror\]\n.*\n.*\n.*?:\d*:\d*: note: please include the header <(.*?)> or explicitly provide a declaration for '.*?'$"

    @staticmethod
    def handle_result(error_string, filename, line, char, function_name, function_type, header_name):
	print error_string

class Error3:
    # TODO: did you mean? (string suggests stdio, which is wrong)
    expression = "(.*?):(\d*):(\d*): error: use of undeclared identifier '(.*?)'\n.*\n.*$"

    @staticmethod
    def handle_result(error_string, filename, line, char, identifier):
	# TODO: special cases like NULL
	print error_string

class Error4:
    expression = "(.*?):(\d*):(\d*): error: variable '(.*?)' is uninitialized when used here \[-Werror,-Wuninitialized\]\n.*\n.*\n.*?:(\d*):(\d*): note: initialize the variable '.*?' to silence this warning\n.*\n.*\n.*$"

    @staticmethod
    def handle_result(error_string, filename, line, char, variable, declaration_line, declaration_char):
	print error_string

class Error5:
    expression = "(.*?):(\d*):(\d*): error: format specifies type '(.*?)' but the argument has type '(.*?)' \[-Werror,-Wformat\]\n.*\n.*$"

    @staticmethod
    def handle_result(error_string, filename, line, char, expected_type, actual_type):
	print error_string

class Error6:
    expression = "(.*?):(\d*):(\d*): error: expected ';' after expression\n.*\n.*\n.*$"

    @staticmethod
    def handle_result(error_string, filename, line, char):
	# TODO sometimes you want to check BEFORE this line of code
	print error_string

class Error7:
    expression = "(.*?):(\d*):(\d*): error: expression result unused \[-Werror,-Wunused-value\]\n.*\n.*$"

    @staticmethod
    def handle_result(error_string, filename, line, char):
	# TODO how do you identiy expression that's unused?
	print error_string

class Error8:
    expression = "(.*?):(\d*):(\d*): error: incompatible integer to pointer conversion initializing '(.*?)' with an expression of type '(.*?)' \[-Werror,-Wint-conversion\]\n.*\n.*$"

    @staticmethod
    def handle_result(error_string, filename, line, char, variable_type, expression_type):
	print error_string

class Error9:
    expression = "(.*?):(\d*):(\d*): error: incompatible pointer to integer conversion initializing '(.*?)' with an expression of type '(.*?)' \[-Werror,-Wint-conversion\]\n.*\n.*$"

    @staticmethod
    def handle_result(error_string, filename, line, char, variable_type, expression_type):
	print error_string

class Error10:
    expression = "(.*?):(\d*):(\d*): error: incompatible pointer to integer conversion returning '(.*?)' from a function with result_type '(.*?)' \[-Werror,-Wint-conversion\]\n.*\n.*$"

    @staticmethod
    def handle_result(error_string, filename, line, char, expression_type, function_type):
	print error_string

class Error11:
    expression = "(.*?):(\d*):(\d*): error: incompatible integer to pointer conversion returning '(.*?)' from a function with result_type '(.*?)' \[-Werror,-Wint-conversion\]\n.*\n.*$"

    @staticmethod
    def handle_result(error_string, filename, line, char, expression_type, function_type):
	print error_string

class Error12:
    expression = ".*?: In function `(.*?)':\n(.*?):(\d*): undefined reference to `(.*?)'\nclang: error: linker command failed with exit code 1 \\(use -v to see invocation\\)$"

    @staticmethod
    def handle_result(error_string, function, filename, line, reference):
	# note that "filename" is the full path to the file, unlike previous errors
	print error_string

class Error13:
    expression = "(.*?):(\d*):(\d*): error: implicit conversion from '(.*?)' to '(.*?)' changes value from (.*?) to (.*?) \[-Werror,-Wliteral-conversion\]\n.*\n.*$"

    @staticmethod
    def handle_result(error_string, filename, line, char, type1, type2, value1, value2):
	print error_string

class Error14:
    expression = "(.*?):(\d*):(\d*): error: unused variable '(.*?)' \[-Werror,-Wunused-variable\]$"

    @staticmethod
    def handle_result(error_string, filename, line, char, variable):
	print error_string
