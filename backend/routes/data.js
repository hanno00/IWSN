const express = require("express");
const router = express.Router();
const TempDS = require("../models/TempDS");
const EnergyDS = require("../models/EnergyDS");

const mqttHandler = require('../mqtt.js');

//GET BACK ALL POSTS
router.get("/temp", async (req, res) => { // GET /data/temp
  try {
    const segments = await TempDS.find(); // find all datapoints in database and return them
    res.json(segments);
  } catch (err) {
    res.json(err);
  }
});

router.get("/temp/latest", async (req, res) => {
  try {
    const segments = await TempDS.find().sort({date: -1}).limit(1);
    res.json(segments);
  } catch (err) {
    res.json(err);
  }
  console.log("We are on datasegments");
});

//GET BACK ALL ENERGY
router.get("/energy", async (req, res) => {
  try {
    const segments = await EnergyDS.find();
    res.json(segments);
  } catch (err) {
    res.json(err);
  }
  console.log("We are on energysegments");
});

//GET BACK RECENT LIMITED ENERGY
router.get("/energy/limited", async (req, res) => {
  try {
    const segments = await EnergyDS.find().sort({date: -1}).limit(180);
    res.json(segments);
  } catch (err) {
    res.json(err);
  }
  console.log("We are on energysegments");
});

router.get("/energy/latest", async (req, res) => {
  try {
    const segments = await EnergyDS.find().sort({date: -1}).limit(1);
    res.json(segments);
  } catch (err) {
    res.json(err);
  }
  console.log("We are on energysegments");
});

//SUBMIT POST
router.post("/", async (req, res) => {
    console.log(req.body);
    const tempds = new TempDS({
      hum: req.body.hum,
      temp: req.body.temp,
    });
    try {
      const savedTempDS = await ds.save();
      res.json(savedTempDS);
    } catch (err) {
      res.json(err);
    }
  });

module.exports = router;