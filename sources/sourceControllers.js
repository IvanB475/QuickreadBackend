const sourceDB = require("./sourceDB");

exports.getAllSources = async (req, res, next) => {
  const sources = await sourceDB.getSourcesFromDB();
  if (sources === 0) {
    res.status(400).json({ message: "something went wrong" });
  } else {
    res.status(200).json({ sources });
  }
};

exports.getSources = async (req, res, next) => {
  const sources = await sourceDB.getSourcesFromDB();
  if (sources === 0) {
    res.status(400).json({ message: "something went wrong" });
  } else {
    const allSources = [];
    sources.forEach((source) => {
      allSources.push(source.idSource);
    });
    res.status(200).json({ sources: allSources });
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
    res.status(201).json({ source });
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

exports.getAllCategories = async (req, res, next) => {
  const sources = await sourceDB.getSourcesFromDB();
  const arrOfCategories = [];

  sources.forEach((source) => {
    source.category.forEach((category) => {
      if (!arrOfCategories.includes(category.name))
        arrOfCategories.push(category.name);
    });
  });

  res.status(200).json({ categoryList: arrOfCategories });
};
