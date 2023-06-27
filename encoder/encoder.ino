
const int pulseAPin = 2; // Pulse A input pin
const int pulseBPin = 3; // Pulse B input pin
const double micrometersPerPulse = 10; // Resolution of linear scale in micrometers per pulse
const double millimetersPerMicrometer = 0.001; // Conversion factor from micrometers to millimeters
const int pulseDuration = 1; // Duration of each pulse, in microseconds
int x = 0;
volatile long pulseCount = 0; // Keeps track of the number of pulses received
volatile bool referenceDetected = false; // Indicates whether the reference mark has been detected
volatile bool direction = false; // Keeps track of the direction of movement

void setup() {
  Serial.begin(115200); // Initialize serial communication
  pinMode(pulseAPin, INPUT_PULLUP); // Set Pulse A pin as input with pull-up resistor
  pinMode(pulseBPin, INPUT_PULLUP); // Set Pulse B pin as input with pull-up resistor
  attachInterrupt(digitalPinToInterrupt(pulseAPin), handlePulseA, RISING); // Attach interrupt for Pulse A rising edge

}

void loop() {
  if (Serial.available() > 0) {  //ถ้าคอมพิวเตอร์ส่งข้อมูลมาใหจะทำใน if นี้
    x = Serial.readString().toInt();
  }
  if (x % 10 == 1) {
    pulseCount = 0;
  }
  double distance = pulseCount * micrometersPerPulse * millimetersPerMicrometer;
  Serial.println(distance, 5); // Display distance with two decimal places
  delay(1);
}

void handlePulseA() {
  // Read Pulse B to determine the direction of movement
  bool pulseBValue = digitalRead(pulseBPin);
  direction = pulseBValue;
  // Increment or decrement the pulse count depending on the direction of movement
  if (direction) {
    pulseCount--;
  } else {
    pulseCount++;
  }
}
