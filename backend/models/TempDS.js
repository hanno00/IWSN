const mongoose = require("mongoose");

var options = {};
options.timeZone = 'UTC';
options.timeZoneName = 'short';

const TempDSSchema = mongoose.Schema({
  hum: {
    type: Number,
    required: true,
  },
  temp: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('Data/Temp',TempDSSchema);
