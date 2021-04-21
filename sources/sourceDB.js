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

exports.updateSourceInDB = async (source) => {
  const { name, idSource, sourceImage, category } = source;
  try {
    const foundSource = await Source.findOne({ idSource });
    foundSource.name = name || foundSource.name;
    foundSource.sourceImage = sourceImage || foundSource.sourceImage;
    foundSource.category = category || foundSource.category;
    await foundSource.save();
  } catch (e) {
    return 0;
  }
};
