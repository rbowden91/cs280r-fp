// generates "incompatible pointer to integer conversion initializing 'int' with an expression of type 'int *'; remove &" error

int main(void)
{
    int x = 3;
    int y = &x;
    (void)y;
}
