// generates "incompatible pointer to integer conversion initializing 'int' with an expression of type 'int *';
// dereference with *" error
#include <stdlib.h>

int main(void)
{
    int *x = NULL;
    int y = x;
    (void)y;
}
