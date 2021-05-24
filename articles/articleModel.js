const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const articleSchema = new Schema({
  idUrl: { type: String, required: true, unique: true },
  idSource: { type: String, required: true },
  category: [{ type: String, required: true }],
  title: { type: String, required: true, unique: true },
  imageUrl: { type: String },
  publishDate: { type: String },
  insertionDate: { type: Date, Default: Date.now },
  author: { type: String },
  summary: { type: String, required: true },
});

articleSchema.methods.toJSON = function () {
  const article = this;
  const articleObject = article.toObject();

  delete articleObject._id;
  delete articleObject.__v;
  delete articleObject.insertionDate;

  return articleObject;
};

const article = mongoose.model("Article", articleSchema);
module.exports = article;
