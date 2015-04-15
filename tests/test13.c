// generates "incompatible integer to pointer conversion initializing 'int *' with an expression of type 'int'; take the
// address with &" error

int main(void)
{
    int x = 3;
    int *y = x;
    (void)y;
}
