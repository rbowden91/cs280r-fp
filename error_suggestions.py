import re
import sys
from errors import *

errors = []

i = 1
while True:
    class_name = "Error%d" % i
    if class_name not in globals():
    	break
    errors.append(globals()[class_name])
    i += 1


if __name__ == "__main__":
    for error in errors:
    	error.compiled = re.compile(error.expression, re.M)

    test = r"""test.c:3:5: error: implicitly declaring library function 'printf' with type 'int (const char *, ...)' [-Werror]
    printf("hello, world\n");
    ^
test.c:3:5: note: please include the header <stdio.h> or explicitly provide a declaration for 'printf'"""

    for error in errors:
	m = error.compiled.match(test)
	if m != None:
	    error.handle_result(m.group(0), *m.groups())
	    break
