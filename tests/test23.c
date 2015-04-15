// generates "incompatible pointer to integer conversion returning 'int *' from a function with result type 'int';
// dereference with *" error

int foo(void)
{
    int x = 3;
    int *y = &x;
    return y;
}

int main(void)
{
}
