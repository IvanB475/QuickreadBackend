const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const articleSchema = new Schema({
  idUrl: { type: String, required: true, unique: true },
  idSource: { type: String, required: true },
  category: { type: String, required: true },
  title: { type: String, required: true },
  imageUrl: { type: String },
  publishDate: { type: String, Default: Date.now },
  author: { type: String },
  summary: { type: String, required: true },
});

const article = mongoose.model("Article", articleSchema);
module.exports = article;
