#include <ezButton.h>

ezButton limitSwitch1(14);  // create ezButton object that attach to pin 7;
ezButton limitSwitch2(15);  // create ezButton object that attach to pin 7;
ezButton limitSwitch3(16);  // create ezButton object that attach to pin 7;
ezButton limitSwitch4(17);  // create ezButton object that attach to pin 7;
const int pulseAPin = 2; // Pulse A input pin
const int pulseBPin = 3; // Pulse B input pin
const int pulseA2Pin = 18; // Pulse A input pin
const int pulseB2Pin = 19; // Pulse B input pin
const double micrometersPerPulse = 0.5*4.5; // Resolution of linear scale in micrometers per pulse
const double millimetersPerMicrometer = 0.001; // Conversion factor from micrometers to millimeters
const int pulseDuration = 1; // Duration of each pulse, in microseconds
int l1=0;
int l2=0;
int l3=0;
int l4=0;
int x=0;
volatile long pulseCount = 0; // Keeps track of the number of pulses received
volatile long pulseCount2 = 0; // Keeps track of the number of pulses received
volatile bool referenceDetected = false; // Indicates whether the reference mark has been detected
volatile bool direction = false; // Keeps track of the direction of movement
volatile bool direction2 = false; // Keeps track of the direction of movement

void setup() {
  Serial.begin(115200); // Initialize serial communication
  pinMode(pulseAPin, INPUT_PULLUP); // Set Pulse A pin as input with pull-up resistor
  pinMode(pulseBPin, INPUT_PULLUP); // Set Pulse B pin as input with pull-up resistor
  pinMode(pulseA2Pin, INPUT_PULLUP); // Set Pulse A pin as input with pull-up resistor
  pinMode(pulseB2Pin, INPUT_PULLUP); // Set Pulse B pin as input with pull-up resistor
  attachInterrupt(digitalPinToInterrupt(pulseAPin), handlePulseA, RISING); // Attach interrupt for Pulse A rising edge
  attachInterrupt(digitalPinToInterrupt(pulseA2Pin), handlePulseA2, RISING); // Attach interrupt for Pulse A rising edge
  limitSwitch1.setDebounceTime(50); // set debounce time to 50 milliseconds
  limitSwitch2.setDebounceTime(50); // set debounce time to 50 milliseconds
  limitSwitch3.setDebounceTime(50); // set debounce time to 50 milliseconds
  limitSwitch4.setDebounceTime(50); // set debounce time to 50 milliseconds
}

void loop() {
   if (Serial.available() > 0) {  //ถ้าคอมพิวเตอร์ส่งข้อมูลมาใหจะทำใน if นี้
      x = Serial.readString().toInt();       
  }
  limitSwitch1.loop(); // MUST call the loop() function first
  limitSwitch2.loop(); // MUST call the loop() function first
  limitSwitch3.loop(); // MUST call the loop() function first
  limitSwitch4.loop(); // MUST call the loop() function first
  if(limitSwitch1.isPressed()){
    l1=1;
  }
  if(limitSwitch1.isReleased()){
    l1=0;
  }
  if(limitSwitch2.isPressed()){
    l2=1;
  }
  if(limitSwitch2.isReleased()){
    l2=0;
  }
  if(limitSwitch3.isPressed()){
    l3=1;
  }
  if(limitSwitch3.isReleased()){
    l3=0;
  }
  if(limitSwitch4.isPressed()){
    l4=1;
  }
  if(limitSwitch4.isReleased()){
    l4=0;
  }
  if(x%10==1){
   pulseCount=0;
   }
  double distance = pulseCount * micrometersPerPulse * millimetersPerMicrometer;
  double distance2 = pulseCount2 * micrometersPerPulse * millimetersPerMicrometer*5.8;
  
  Serial.print(distance, 5); // Display distance with two decimal places
  Serial.print(" ");
  Serial.print(distance2, 5); // Display distance with two decimal places
  Serial.print(" ");
  Serial.print(l1); // Display distance with two decimal places
  Serial.print(" ");
  Serial.print(l2); // Display distance with two decimal places
  Serial.print(" ");
  Serial.print(l3); // Display distance with two decimal places
  Serial.print(" ");
  Serial.println(l4); // Display distance with two decimal places
  delay(1);
}

void handlePulseA() {
  // Read Pulse B to determine the direction of movement
  bool pulseBValue = digitalRead(pulseBPin);
  direction = pulseBValue;

  // Increment or decrement the pulse count depending on the direction of movement
  if (direction) {
    pulseCount++;
  } else {
    pulseCount--;
  }
}

void handlePulseA2() {
  // Read Pulse B to determine the direction of movement
  bool pulseBValue2 = digitalRead(pulseB2Pin);
  direction2 = pulseBValue2;

  // Increment or decrement the pulse count depending on the direction of movement
  if (direction2) {
    pulseCount2++;
  } else {
    pulseCount2-=1;
  }
}
