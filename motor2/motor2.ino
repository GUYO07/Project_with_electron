#include <TimerOne.h>
int x;
int y;
int z = 12800;
#define MAX_LENGTH 64   // ความยาวสูงสุดของสตริงที่รับเข้ามา
char inputString[MAX_LENGTH];    // สตริงที่รับมาจาก Serial Monitor
unsigned long ontime;
unsigned long offtime;
unsigned long period;
float frequency;
float capacitance;
int pulse = 0; // Variable for saving pulses count.
int var = 0;
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
  //while (!Serial.available());
  if (Serial.available()) {
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
    x = atoi(lastToken);
  }
  // x = Serial.readString().toInt();
  y = x % 10;
  //Timer1.initialize(13604 * pow(x / 10, -0.9855));
  Timer1.setPeriod(13604 * pow(x / 10, -0.9855));
  if (y == 4) {
    digitalWrite(8, 0);
  }
  else if (y == 6) {
    digitalWrite(8, 1);
  }
  else if (y == 5) {
    digitalWrite(8, 1);
    Timer1.initialize(0);
  }
  Timer1.pwm(9, 128); // 50% duty cycle
 /* noInterrupts();
  ontime = pulseIn(7, HIGH);
  offtime = pulseIn(7, LOW);
  interrupts();

  period = ontime + offtime;
  frequency = 1000000.0 / period;
  //capacitance = 1 * (1.4427 * 1000000000) / (2545 * frequency); //calculating the Capacitance in nF
  Serial.println(frequency);
  Serial.flush();*/
  if (digitalRead(7) > var)
  {
    var = 1;
    pulse++;

    Serial.print(pulse);
    Serial.print(F(" pulse"));

    // Put an "s" if the amount of pulses is greater than 1.
    if (pulse > 1) {
      Serial.print(F("s"));
    }

    Serial.println(F(" detected."));
  }

  if (digitalRead(7) == 0) {
    var = 0;
  }
}
