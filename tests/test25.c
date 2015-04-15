// generates "incompatible integer to pointer conversion returning 'int' from a function with result type 'int *'; take
// the address with &" error

int *foo(void)
{
    int x = 3;
    return x;
}

int main(void)
{
}
