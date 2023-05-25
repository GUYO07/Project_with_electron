const int pulseAPin = 2; // Pulse A input pin
const int pulseBPin = 3; // Pulse B input pin
const int referencePin = 4; // Reference mark input pin
const double micrometersPerPulse = 0.5*4.5; // Resolution of linear scale in micrometers per pulse
const double millimetersPerMicrometer = 0.001; // Conversion factor from micrometers to millimeters
const int pulseDuration = 1; // Duration of each pulse, in microseconds


volatile long pulseCount = 0; // Keeps track of the number of pulses received
volatile bool referenceDetected = false; // Indicates whether the reference mark has been detected
volatile bool direction = false; // Keeps track of the direction of movement

void setup() {
  Serial.begin(115200); // Initialize serial communication
  pinMode(pulseAPin, INPUT_PULLUP); // Set Pulse A pin as input with pull-up resistor
  pinMode(pulseBPin, INPUT_PULLUP); // Set Pulse B pin as input with pull-up resistor
  pinMode(referencePin, INPUT_PULLUP); // Set reference mark pin as input with pull-up resistor
  attachInterrupt(digitalPinToInterrupt(pulseAPin), handlePulseA, RISING); // Attach interrupt for Pulse A rising edge
  attachInterrupt(digitalPinToInterrupt(referencePin), handleReference, RISING); // Attach interrupt for Reference mark rising edge
}

void loop() {
  double distance = pulseCount * micrometersPerPulse * millimetersPerMicrometer;
/*if (direction) {
    distance = -distance;
  }
*/
  // Output distance to the serial monitor
  Serial.println(distance, 5); // Display distance with two decimal places
  delay(1);
  //Serial.println(position);
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

void handleReference() {
  // Reset the pulse count and indicate that the reference mark has been detected
  pulseCount = 0;
  referenceDetected = true;
}
