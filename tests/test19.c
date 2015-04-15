// generates "incompatible pointer types returning 'int **' from a function with result type 'int *'; dereference with *" error

int *foo(void)
{
    int x = 3;
    int *y = &x;
    int **z = &y;
    return z;
}

int main(void)
{
}
