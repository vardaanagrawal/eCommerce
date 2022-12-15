const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

mongoose.set("strictQuery", true);

app.use(cors());
dotenv.config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const connectDB = require("./backend/config/db");
connectDB();

const Routes = require("./backend/routes/Routes");
app.use("/", Routes);

app.listen(process.env.PORT, () => {
  console.log("Server running successfully");
});
