// generates "incompatible pointer types returning 'int *' from a function with result type 'int **'; take the address
// with &" error

int **foo(void)
{
    int x = 3;
    int *y = &x;
    return y;
}

int main(void)
{
}
