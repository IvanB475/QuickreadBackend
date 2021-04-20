const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sourceSchema = new Schema({
  name: { type: String, required: true, unique: true },
  idSource: { type: String, required: true, unique: true },
  sourceImage: { type: String, unique: true },
  category: [
    {
      name: { type: String, required: true, unique: true },
      href: { type: String, required: true },
      path: { type: String, required: true },
    },
  ],
});

const source = mongoose.model("Source", sourceSchema);
module.exports = source;
