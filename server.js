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

if (process.env.NODE_ENV == "production") {
  const path = require("path");

  app.get("/", (req, res) => {
    app.use(express.static(path.resolve(__dirname, "frontend", "build")));
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}

app.listen(process.env.PORT || 7000, () => {
  console.log("Server running successfully");
});
