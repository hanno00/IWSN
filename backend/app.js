const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv/config");

//Middelwares
app.use(cors());
//Parse request
app.use(express.json());

//Import Routes
const dataRoute = require("./routes/data");


app.use("/data", dataRoute);

app.use("/data", () => {
  console.log("This is a middleware running");
});

//ROUTES
app.get("/", (req, res) => {
  res.send("We are on home");
});

//Connect to DB
mongoose.connect(
  process.env.DB_CONNECTION, //url from .env file for security purposes
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to DB!");
  }
);

// How do we start listening to the server
app.listen(3000);
