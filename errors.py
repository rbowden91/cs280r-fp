class Error1:
    expression = "(.*?):(\d*):(\d*): error: implicit declaration of function '(.*?)' is invalid in C99 \[-Werror,-Wimplicit-function-declaration\]\n.*\n.*$"

    @staticmethod
    def handle_result(string, filename, line, char, function_name):
	print string

class Error2:
    expression = "(.*?):(\d*):(\d*): error: implicitly declaring library function '(.*?)' with type '(.*?)' \[-Werror\]\n.*\n.*\n.*?:\d*:\d*: note: please include the header <(.*?)> or explicitly provide a declaration for '.*?'$"

    @staticmethod
    def handle_result(string, filename, line, char, function_name, function_type, header_name):
	print string
