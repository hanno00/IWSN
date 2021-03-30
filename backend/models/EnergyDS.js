const mongoose = require("mongoose");

const EnergyDataSegmentSchema = mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  electricity_delivered_to_client_tariff_1: {
    type: String,
    required: true,
  },
  electricity_delivered_to_client_tariff_2: {
    type: String,
    required: true,
  },
  electricity_delivered_by_client_tariff_1: {
    type: String,
    required: true,
  },
  electricity_delivered_by_client_tariff_2: {
    type: String,
    required: true,
  },
  Actual_electricity_power_delivered_plus: {
    type: String,
    required: true,
  },
  Actual_electricity_power_received_min: {
    type: String,
    required: true,
  },
  Instantaneous_active_power_L1_plus: {
    type: String,
    required: true,
  },
  Instantaneous_active_power_L1_min: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model("Data/Energy", EnergyDataSegmentSchema);
