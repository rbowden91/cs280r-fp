// generates "undefined reference to `foo'" linker error

int foo(void);

int main(void)
{
    foo();
}
