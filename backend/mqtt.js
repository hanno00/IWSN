var mqtt = require("mqtt");
var clientTemp = mqtt.connect("mqtt://test.mosquitto.org");
var clientEnergy = mqtt.connect("mqtt://test.mosquitto.org");

const tempDS = require("./models/TempDS");
const EnergyDS = require("./models/EnergyDS");

//Sensor MQTT
clientTemp.on("connect", function () {
  clientTemp.subscribe("iwsn-hanno-temp", function (err) {});
});

clientTemp.on("message", function (topic, message) {
  // message is Buffer
  if (message != "Connection established!") {
    const obj = JSON.parse(message); //Parsing Data
    const ds = new tempDS({
      //Creating object for sending
      hum: obj.hum,
      temp: obj.temp,
      date: Date.now(),
    });
    try {
      const savedDS = ds.save(); //Saving object to Database
    } catch (err) {
      res.json(err);
    }
  }
});

//Energy MQTT
clientEnergy.on("connect", function () {
  clientEnergy.subscribe("iwsn-hanno-energy", function (err) {});
});

clientEnergy.on("message", function (topic, message) {
  if (message != "Connection established!") {
    try {
      var doc = JSON.parse(message);
      doc = parseDataToJson(doc);
      const ds = new EnergyDS({
        date: doc["date"],
        electricity_delivered_to_client_tariff_1:
          doc["electricity_delivered_to_client_tariff_1"],
        electricity_delivered_to_client_tariff_2:
          doc["electricity_delivered_to_client_tariff_2"],
        electricity_delivered_by_client_tariff_1:
          doc["electricity_delivered_by_client_tariff_1"],
        electricity_delivered_by_client_tariff_2:
          doc["electricity_delivered_by_client_tariff_2"],
        Actual_electricity_power_delivered_plus:
          doc["Actual_electricity_power_delivered_plus"],
        Actual_electricity_power_received_min:
          doc["Actual_electricity_power_received_min"],
        Instantaneous_active_power_L1_plus:
          doc["Instantaneous_active_power_L1_plus"],
        Instantaneous_active_power_L1_min:
          doc["Instantaneous_active_power_L1_min"],
      });
      try {
        console.log(ds);
        const savedDS = ds.save();
        console.log(savedDS);
      } catch (err) {
        res.json(err);
      }

      // console.log("parsed doc:");
      // console.log(doc);
    } catch (error) {
      console.error(error);
    }
  }
});

//#region parser help methods
function parseDataToJson(doc) {
  var json = {};
  var data = doc["datagram"]["p1"].split("\r\n");

  for (var key in doc) {
    if (key != "datagram") {
      json[key] = doc[key];
    }
  }

  var fdata = [];
  data.forEach((element) => {
    if (element.match(":") != null) {
      fdata.push(element);
    }
  });

  fdata.forEach((element) => {
    var key = element.split("(")[0];
    var d = element.slice(key.length);
    if (d.indexOf("(") == d.lastIndexOf("(")) {
      d = d.substring(d.indexOf("(") + 1, d.indexOf(")"));
    } else {
      d = d.split(")(");
      d[0] = d[0].slice(1);
      d[d.length - 1] = d[d.length - 1].substring(0, d.length - 1);
    }
    key = obisRefSwitchTable(key);
    if (key == "date") {
      d = formatString(d);
      json[key] = d;
    } else if (key != null) {
      json[key] = d;
    }
  });

  return json;
}

function formatString(d) {
  let b = d;
  return (
    "20" +
    b.substring(0, 2) +
    "-" +
    b.substring(2, 4) +
    "-" +
    b.substring(4, 6) +
    "T" +
    b.substring(6, 8) +
    ":" +
    b.substring(8, 10) +
    ":" +
    b.substring(10, 12) +
    "Z"
  );
}

function obisRefSwitchTable(code) {
  switch (code) {
    // case "1-3:0.2.8":
    //   return "P1_output_version_information";
    case "0-0:1.0.0":
      return "date";
    // case "0-0:96.1.1":
    //   return "Equipment_id";
    case "1-0:1.8.1":
      return "electricity_delivered_to_client_tariff_1";
    case "1-0:1.8.2":
      return "electricity_delivered_to_client_tariff_2";
    case "1-0:2.8.1":
      return "electricity_delivered_by_client_tariff_1";
    case "1-0:2.8.2":
      return "electricity_delivered_by_client_tariff_2";
    // case "0-0:96.14.0":
    //   return "Tariff_indicator_elextricity";
    case "1-0:1.7.0":
      return "Actual_electricity_power_delivered_plus";
    case "1-0:2.7.0":
      return "Actual_electricity_power_received_min";
    // case "0-0:96.7.21":
    //   return "Number_of_power_failures";
    // case "0-0:96.7.9":
    //   return "Number_of_long_power_failures";
    // case "1-0:99.97.0":
    //   return "Power_Failure_Event_Log";
    // // case "1-0:32.32.0":
    //   return "Number_of_voltage_sags_L1";
    // case "1-0:52.32.0":
    //   return "Number_of_voltage_sags_L2";
    // case "1-0:72.32.0":
    //   return "Number_of_voltage_sags_L3";
    // case "1-0:32.36.0":
    //   return "Number_of_voltage_swells_L1";
    // case "1-0:52.36.0":
    //   return "Number_of_voltage_swells_L2";
    // case "1-0:72.36.0":
    //   return "Number_of_voltage_swells_L3";
    // case "0-0:96.13.0":
    //   return "Text_message_max_1024_characters";
    // case "1-0:31.7.0":
    //   return "Instantaneous_current_L1";
    // case "1-0:51.7.0":
    //   return "Instantaneous_current_L2";
    // case "1-0:71.7.0":
    //   return "Instantaneous_current_L3";
    case "1-0:21.7.0":
      return "Instantaneous_active_power_L1_plus";
    case "1-0:41.7.0":
      return "Instantaneous_active_power_L2_plus";
    case "1-0:61.7.0":
      return "Instantaneous_active_power_L3_plus";
    case "1-0:22.7.0":
      return "Instantaneous_active_power_L1_min";
    case "1-0:42.7.0":
      return "Instantaneous_active_power_L2_min";
    case "1-0:62.7.0":
      return "Instantaneous_active_power_L3_min";
    case "0-1:24.1.0":
    //   return "Device_Type";
    // case "0-1:96.1.0":
    //   return "Equipment_id_Water";
    // case "0-1:24.2.1":
    //   return "Last_5_minute_Meter_reading";
    default:
      return null;
  }
}

//#endregion
