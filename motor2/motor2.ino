int x;
int y;
#define MAX_LENGTH 64   // ความยาวสูงสุดของสตริงที่รับเข้ามา
char inputString[MAX_LENGTH];    // สตริงที่รับมาจาก Serial Monitor
void setup() {
  Serial.begin(115200);
  Serial.setTimeout(1);
  pinMode(7, OUTPUT);
  pinMode(8, OUTPUT);
  digitalWrite(7, 1);
  digitalWrite(8, 1);
}
void loop() {
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
    x=atoi(lastToken);
  }
  analogWrite(3, 1.077*(x/10)+2.792);
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
