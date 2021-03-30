/* How to use the DHT-11 sensor with Arduino uno
   Temperature and humidity sensor
   More info: http://www.ardumotive.com/how-to-use-dht-11-sensor-en.html
   Dev: Michalis Vasilakis // Date: 2/7/2015 // www.ardumotive.com */


#include <dht.h>
dht DHT;
#define DHT11_PIN 2 

int hum; 
int temp; 

void setup()
{
    Serial.begin(9600);
}

void loop()
{
    int chk = DHT.read11(DHT11_PIN);

    hum = DHT.humidity;
    temp= DHT.temperature;

    Serial.print(DHT.humidity);
    Serial.print(", ");
    Serial.print(DHT.temperature);

    delay(2000);
}
