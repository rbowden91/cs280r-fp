// generates "format specifies type 'char *' but the argument has type 'int'" error

#include <stdio.h>

int main(void)
{
    int bar = 6;
    printf("%s\n", bar);
}
