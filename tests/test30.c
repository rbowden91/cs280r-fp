// generates "invalid operands to binary expression ('int *' and 'int')" error

int main(void)
{
    int x = 3;
    int *y = &x;
    int *z = y * 3;
    (void)z;
}
