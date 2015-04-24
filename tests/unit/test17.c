// generates "incompatible integer to pointer conversion returning 'int' from a function with result type 'char *'" error

char *foo(void)
{
    return 3;
}

int main(void)
{
}
