const int pulseAPin = 2; // Pulse A input pin
const int pulseBPin = 3; // Pulse B input pin
const int pulseA2Pin = 18; // Pulse A input pin
const int pulseB2Pin = 19; // Pulse B input pin
const double micrometersPerPulse = 0.5*4.5; // Resolution of linear scale in micrometers per pulse
const double millimetersPerMicrometer = 0.001; // Conversion factor from micrometers to millimeters
const int pulseDuration = 1; // Duration of each pulse, in microseconds


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
}

void loop() {
  double distance = pulseCount * micrometersPerPulse * millimetersPerMicromete+  r;
  double distance2 = pulseCount2 * micrometersPerPulse * millimetersPerMicrometer;
  Serial.print(distance, 5); // Display distance with two decimal places
  Serial.print(" ");
  Serial.println(distance2, 5); // Display distance with two decimal places
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
    pulseCount-=1.125;
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
    pulseCount2-=1.125;
  }
}
