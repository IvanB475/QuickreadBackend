const express = require("express");
const app = express();
const mongoose = require("mongoose");
const articleAPI = require("./articles/articleAPI");
const sourceAPI = require("./sources/sourceAPI");
require("dotenv").config();
const helmet = require("helmet");

app.use(express.json());
app.use(helmet());

mongoose.connect("mongodb://localhost:27017/article_DB", {
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

app.get("/*", async (req, res, next) => {
  res.status(404).json({ message: "Nothing to see here" });
});

app.listen(8050, () => {
  console.log("Server started successfully on port " + 8050);
});
