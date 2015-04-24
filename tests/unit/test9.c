// generates "incompatible integer to pointer conversion initializing 'char *' with an expression of type 'int'" error

int main(void)
{
    char *x = 3;
    (void)x;
}
