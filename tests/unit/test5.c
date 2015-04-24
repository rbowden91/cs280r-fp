// generates "variable 'bar' is uninitialized when used here" error

#include <stdio.h>

int main(void)
{
    char *bar;
    printf("%s\n", bar);
}
