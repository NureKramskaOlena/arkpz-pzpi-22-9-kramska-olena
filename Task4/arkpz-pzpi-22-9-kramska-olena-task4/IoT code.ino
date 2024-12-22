const int tempPin = A0; 

// Ініціалізація початкових значень
float currentTemperature = 25.0; 
float currentSugarLevel = 10.0; 
float currentAlcoholLevel = 8.0; 

// Функція для плавного зміщення значення
float adjustValue(float currentValue, float minChange, float maxChange, float minValue, float maxValue) {
  float change = random(minChange * 100, maxChange * 100) / 100.0; // Генерація змін
  if (random(0, 2) == 0) change = -change; 
  float newValue = currentValue + change;
  if (newValue < minValue) newValue = minValue;
  if (newValue > maxValue) newValue = maxValue;
  return newValue;
}

void setup() {
  Serial.begin(9600); 
  randomSeed(analogRead(0));
}

void loop() {
  // Оновлення значень з розширеним діапазоном
  currentTemperature = adjustValue(currentTemperature, 0.5, 2.0, 15.0, 40.0);
  currentSugarLevel = adjustValue(currentSugarLevel, 0.5, 2.0, 2.0, 20.0);   
  currentAlcoholLevel = adjustValue(currentAlcoholLevel, 0.5, 1.0, 5.0, 15.0); 

  // Перевірка на допустимі межі та виведення сповіщень
  if (currentTemperature < 18.0) {
    Serial.println("Warning: Temperature is low!");
  } else if (currentTemperature > 35.0) {
    Serial.println("Warning: Temperature is high!");
  }

  if (currentSugarLevel < 3.0) {
    Serial.println("Warning: Sugar level is low!");
  } else if (currentSugarLevel > 18.0) {
    Serial.println("Warning: Sugar level is high!");
  }

  if (currentAlcoholLevel < 6.0) {
    Serial.println("Warning: Alcohol level is low!");
  } else if (currentAlcoholLevel > 14.0) {
    Serial.println("Warning: Alcohol level is high!");
  }

  // Виведення значень у Serial Monitor
  Serial.print("Temperature: ");
  Serial.print(currentTemperature);
  Serial.println(" C");

  Serial.print("Sugar: ");
  Serial.print(currentSugarLevel);
  Serial.println(" %");

  Serial.print("Alcohol: ");
  Serial.print(currentAlcoholLevel);
  Serial.println(" %");

  Serial.println("----------------------");
  delay(1000); // затримка 1с
}
