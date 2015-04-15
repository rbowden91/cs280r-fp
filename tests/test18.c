// generates "address of stack memory associated with local variable 'x' returned" error

int *foo(void)
{
    int x = 3;
    return &x;
}

int main(void)
{
}
