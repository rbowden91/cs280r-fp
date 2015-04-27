/**********************************************************************************
* chart.c
*
* Computer Science 50 
* Rishav Mukherji
*
* Works taking inspiration from isawyouharvard.com.
*
* Creates a vertical bar-graph depicting the number of sightings under each case.
**********************************************************************************/

#include <cs50.h>

int
main(void)
{
    // take input from user
    printf("Enter positive integer values for the following: \n");
    printf("M spotting F:");
    
    // ask till user inserts a non-negative integer
    int msf = 0,fsm = 0,fsf = 0,msm = 0, total = 0;
    /*
    * msf = male spotting female
    * fsm = female spotting male
    * fsf = female spotting female
    * msm = male spotting male
    */
    while(true)
    {
        msf = GetInt();
        if(msf >= 0)
            break;
        else
            printf(%d, "Wrong input. Please Retry:");
    }
    printf("F spotting M:");
    while(true)
    {
        fsm = GetInt();
        if(fsm >= 0)
            break;
        else
            printf("Wrong input. Please Retry:");
    }
    printf("F spotting F:");
    while(true)
    {
        fsf = GetInt();
        if(fsf >= 0)
            break
        else
            printf("Wrong input. Please Retry:");
    }
    printf("M spotting M:");
    while(true)
    {
        msm = GetInt();
        if(msm >= 0)
            break;
        else
            printf("Wrong input. Please Retry:");
    }
    
    // sum of all the integers entered by user
    int sum = msf + fsm + fsf + msm;
    
    // finding length of every bar as a percentage of 20 (since total given is 20)
    int a = (int)(((float)msf/sum)*20); // a=msf length
    int b = (int)(((float)fsm/sum)*20); // b=fsm length
    int c = (int)(((float)fsf/sum*20)); // c=fsf length
    int d = (int)(((float)msm/sum*20)); // d=msm length
    
    // finding which bar has the maximum height since that determines loop structure
    int max = a;
    if(b > max)
        max = b;
    if(c > max)
        max = c;
    if(d > max)
        max = d;
        
    // printing in the desired format
    printf("\n");
    printf("Who is spotting whom? \n");
    printf("\n");
    
  for(int i = max; i > 0; i--)
    {
        if(a >= i)
            printf("###");
        else
           printf("   ");
        printf("  ");
        if(b >= i)
            printf("###");
        else
            printf("   ");
        printf("  ");
        if(c >= i)
            printf("###");
        else
            printf("   ");
        printf("  ");
        if(d >= i)
            printf("###");
        else
            printf("   ");
        printf("  ");
        printf("\n");
    

    //printing the last line
    printf("M4F  F4M  F4F  M4M \n");
}

