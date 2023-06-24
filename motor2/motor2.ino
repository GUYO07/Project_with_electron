#include <TimerOne.h>
unsigned long x;
unsigned long d;
int y;
int z = 12800;
int f = 0;
int a = 0;
#define MAX_LENGTH 64   // ความยาวสูงสุดของสตริงที่รับเข้ามา
char inputString[MAX_LENGTH];    // สตริงที่รับมาจาก Serial Monitor
void setup() {
  // Set the PWM output pin
  pinMode(9, OUTPUT);
  pinMode(8, OUTPUT);
  pinMode(7, INPUT);
  Serial.begin(115200);
  //Timer1.pwm(9, 128);
  Timer1.initialize(12800);
  Serial.setTimeout(1);
}

void loop() {
 // while (!Serial.available());
  if (Serial.available() ) {
     // รับสตริงจาก Serial Monitor
     String input = Serial.readStringUntil('\n');
     input.toCharArray(inputString, MAX_LENGTH);

     // แยกคำ
     char *token;
     char *lastToken = NULL;
     token = strtok(inputString, " ");
     while (token != NULL) {
       lastToken = token;
       token = strtok(NULL, " ");
     }
     x=atoi(lastToken);
     
    }
  //x = Serial.readString().toInt();
  y = (x % 10);
  //y = 4;
  //Timer1.setPeriod(x);
  f = 996710 * pow(x / 10, -1);
  //f=315.84*pow(e, -7*x*pow(10, -6));
  Timer1.setPeriod(x/10);
  if (y == 4) {
    digitalWrite(8, 0);
  }
  else if (y == 6) {
    digitalWrite(8, 1);
  }
  else if (y == 5) {
    //digitalWrite(8, 1);
    Timer1.initialize(0);
  }
  Timer1.pwm(9, 128); // 50% duty cycle
  Serial.flush();
  
}
