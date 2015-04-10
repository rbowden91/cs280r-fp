#include <stdio.h>
#include <math.h>

char * foo() {
    return 3;
}


int main()
{
    char * z = 3;
    int y = z;
    char * x = foo();
    printf("hello, world %s\n", x);
}
