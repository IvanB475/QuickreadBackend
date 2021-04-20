const Source = require("./sourceModel");

exports.getSourcesFromDB = async () => {
  try {
    const sources = await Source.find({});
    return sources;
  } catch (e) {
    return 0;
  }
};

exports.addSourceToDB = async (source) => {
  const newSource = new Source(source);
  try {
    await newSource.save();
  } catch (e) {
    return 0;
  }
};
