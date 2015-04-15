// generates "use of undeclared identifier 'foo'; did you mean 'for'" error

#include <stdio.h>

int main(void)
{
    printf("%s\n", foo);
}
