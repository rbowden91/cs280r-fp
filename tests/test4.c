// generates "use of undeclared identifier 'bar'" error

#include <stdio.h>

int main(void)
{
    printf("%s\n", bar);
}
