// generates "integer constant is larger than the largest unsigned integer type" error

int main(void)
{
    long long x = 2000000000000000000000000000000000000000;
}
