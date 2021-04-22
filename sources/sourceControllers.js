const sourceDB = require("./sourceDB");

exports.getSources = async (req, res, next) => {
  const sources = sourceDB.getSourcesFromDB();
  if (sources === 0) {
    res.status(400).json({ message: "something went wrong" });
  } else {
    res.status(200).json({ message: "Returning all sources", sources });
  }
};

exports.addSource = async (req, res, next) => {
  const name = req.body?.name;
  const idSource = req.body?.idSource;
  const sourceImage = req.body?.sourceImage;
  const category = req.body?.category;

  const source = {
    name,
    idSource,
    sourceImage,
    category,
  };

  const checkifErrors = await sourceDB.addSourceToDB(source);
  if (checkifErrors === 0) {
    res.status(404).json({ message: "something went wrong" });
  } else {
    res.status(201).json({ message: "Source added successfully", source });
  }
};

exports.updateSource = async (req, res, next) => {
  const source = ({ name, idSource, sourceImage, category } = req.body);

  const checkIfErrors = await sourceDB.updateSourceInDB(source);
  if (checkIfErrors === 0) {
    res.status(400).json({ message: "something went wrong" });
  } else {
    res.status(200).json({ message: "updated successfully" });
  }
};
