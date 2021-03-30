#include <Arduino.h>
#include <SoftwareSerial.h>
#include <ESP8266WiFi.h>
#include <PubSubClient.h>
#include <ArduinoJson.h>

#include "network.h"

SoftwareSerial ss(TX,RX);
WiFiClient client;
PubSubClient mqtt;

String text = "";
String getValue(String, char, int);
JsonObject create_json(String);

/* 
  Dit is alleen zodat mijn SSID en Password niet in de code hoeven.
  
  in een network.h:
  #define networkSSID *netwerk SSID*
  #define networkPSWD *netwerk password*
  
*/

const char* ssid = networkSSID;
const char* password = networkPSWD;

// Serveradres en Port van de MQTT Server

const char* mqttServer = "test.mosquitto.org";
const int mqttPort = 1883;

const char* publisherName = "wemos-d1";
const char* mqttTopic = "iwsn-hanno-temp";

//const char* mqttUser = "test";
//const char* mqttPassword = "test";

void setup() {
  Serial.begin(9600);
  DynamicJsonDocument doc(1024);
  WiFi.begin(ssid, password);

  Serial.print("Connecting to WiFi");
  while(WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(1000);
  }
  Serial.print("\nConnected as ");
  Serial.println(WiFi.localIP());

  ss.begin(9600);

  mqtt.setClient(client);
  mqtt.setBufferSize(256);
  mqtt.setServer(mqttServer, mqttPort);
  
  while(!mqtt.connected()) 
  {
    mqtt.connect(publisherName);
    
    if(mqtt.connected()) 
    {
      Serial.println("MQTT Online");
      mqtt.publish(mqttTopic, "Connection established!");
      break;
    }
  }
}

void loop() {
  if (ss.available()) {

    text = ss.readString();

    String hum = getValue(text, ',', 0);
    String temp = getValue(text, ',', 1);

    String jsonText = "{ \"hum\": " +  hum +
    ", \"temp\": " + temp + "}";
  
    mqtt.publish(mqttTopic, jsonText.c_str());
  }
}

JsonObject create_json(String string) {
  // 31.00, 23.00
  StaticJsonDocument<JSON_OBJECT_SIZE(2)> doc;
  JsonObject obj = doc.to<JsonObject>();
  obj["hum"] = getValue(string, ',', 0);
  obj["temp"] = getValue(string, ',', 1);
  
  return obj;
}


// // https://stackoverflow.com/questions/9072320/split-string-into-string-array
String getValue(String data, char separator, int index)
{
  int found = 0;
  int strIndex[] = {0, -1};
  int maxIndex = data.length()-1;

  for(int i=0; i<=maxIndex && found<=index; i++){
    if(data.charAt(i)==separator || i==maxIndex){
        found++;
        strIndex[0] = strIndex[1]+1;
        strIndex[1] = (i == maxIndex) ? i+1 : i;
    }
  }

  return found>index ? data.substring(strIndex[0], strIndex[1]) : "";
}