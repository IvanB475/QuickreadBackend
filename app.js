const express = require("express");
const app = express();
const mongoose = require("mongoose");
const articleAPI = require("./articles/articleAPI");
const sourceAPI = require("./sources/sourceAPI");

app.use(express.json());

mongoose.connect("mongodb://localhost:27017/kidsoh_database", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("connected to DB");
});

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(articleAPI);
app.use(sourceAPI);

app.listen(8050, () => {
  console.log("Server started successfully on port " + 8050);
});
