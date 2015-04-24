// generates "incompatible pointer types initializing 'int *' with an expression of type 'int **'; dereference with *" error

int main(void)
{
    int x = 3;
    int *y = &x;
    int **z = &y;
    int *q = z;
    (void)q;
}
