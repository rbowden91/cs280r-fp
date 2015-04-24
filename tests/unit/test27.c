// generates "implicit conversion from 'double' to 'int' changes value from 3.14 to 3" error

int main(void)
{
    int x = 3.14;
    (void)x;
}
