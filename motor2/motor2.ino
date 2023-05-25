int x;
int y;
void setup() {
  Serial.begin(115200);
  Serial.setTimeout(1);
  pinMode(7, OUTPUT);
  pinMode(8, OUTPUT);
  digitalWrite(7, 1);
  digitalWrite(8, 1);
}
void loop() {
  if (Serial.available() > 0) {  //ถ้าคอมพิวเตอร์ส่งข้อมูลมาใหจะทำใน if นี้
    x = Serial.readString().toInt();        //Arduino ส่งค่าในตัวแปร key เข้าคอมพิวเตอร์ Serial Monitor
    Serial.println(x);
  }
  analogWrite(3, x/10);
  y=x%10;
  if (y == 4) {
    digitalWrite(8, 0);
    digitalWrite(7, 1);
  }
  else if (y == 6) {
    digitalWrite(7, 0);
    digitalWrite(8, 1);
  }
  else if (y == 5) {
    digitalWrite(7, 1);
    digitalWrite(8, 1);
  }
}
