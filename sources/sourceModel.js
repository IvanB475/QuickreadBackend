const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sourceSchema = new Schema({
  name: { type: String, required: true, unique: true },
  idSource: { type: String, required: true, unique: true },
  sourceImage: { type: String, unique: false },
  category: [
    {
      _id: false,
      name: { type: String, required: true, unique: false },
      href: { type: String, required: true },
      path: { type: String, required: true },
    },
  ],
});

sourceSchema.methods.toJSON = function () {
  const source = this;
  const sourceObject = source.toObject();

  delete sourceObject._id;
  delete sourceObject.__v;

  return sourceObject;
};

const source = mongoose.model("Source", sourceSchema);
module.exports = source;
