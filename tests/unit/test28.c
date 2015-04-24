// generates "invalid operands to binary expression ('void' and 'int *')" error

int main(void)
{
    int x = 3;
    int *y = &x;
    (void)x + y;
}
