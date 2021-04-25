const db = require("./articleDB");
const utils = require("./utils/getTotalPages");

exports.addArticle = async (req, res, next) => {
  const article = ({
    idUrl,
    idSource,
    category,
    title,
    imageUrl,
    publishDate,
    author,
    summary,
  } = req.body);

  const checkifErrors = await db.saveArticle(article);
  if (checkifErrors !== undefined) {
    if (checkifErrors.code === 11000) {
      const newCategory = await db.addCategoryToArticle(idUrl, category);
      res.status(400).json({
        message: "Article with that id already exists, category added",
        addedCategory: newCategory,
      });
    } else {
      res.status(400).json({ message: "something went wrong" });
    }
  } else {
    res.status(201).json({ message: "Article was added" });
  }
};

exports.getIdsOfArticlesForSourceCategory = async (req, res, next) => {
  const idSource = req.body?.idSource;
  const category = req.body?.category;
  const articleIDs = [];

  try {
    const articles = await db.getIdsOfArticlesForSourceCategoryFromDB(
      idSource,
      category
    );
    articles.forEach((article) => {
      articleIDs.push(article.idUrl);
    });
    res.status(200).json({ articleIDs });
  } catch (e) {
    res.status(400).json({ message: "something went wrong" });
  }
};

exports.getAllArticles = async (req, res, next) => {
  const ITEMS_PER_PAGE = +req.query.items || 10;
  const PAGE = +req.query.page || 1;
  const { articles, articleCount } = await db.getArticlesFromDB(
    ITEMS_PER_PAGE,
    PAGE
  );
  const totalPages = utils.getTotalPages(articleCount, ITEMS_PER_PAGE);
  res.status(200).json({ articles });
};

exports.getAllArticlesFromSource = async (req, res, next) => {
  const ITEMS_PER_PAGE = +req.query.items || 10;
  const PAGE = +req.query.page || 1;
  const idSource = req.body?.idSource;
  if (!idSource) {
    res.status(400).json({
      message: "something went wrong, make sure to input all required data",
    });
  } else {
    const FILTER = { idSource };
    const { articles, articleCount } = await db.getArticlesFromDB(
      ITEMS_PER_PAGE,
      PAGE,
      FILTER
    );
    const totalPages = utils.getTotalPages(articleCount, ITEMS_PER_PAGE);
    res.status(200).json({ articles });
  }
};

exports.getAllArticlesFromSourceCategory = async (req, res, next) => {
  const ITEMS_PER_PAGE = +req.query.items || 10;
  const PAGE = +req.query.page || 1;
  const idSource = req.body?.idSource;
  const category = req.body?.category;
  if (!idSource || !category) {
    res.status(400).json({
      message: "something went wrong, make sure to input all required data",
    });
  } else {
    const FILTER = { idSource, category };
    const { articles, articleCount } = await db.getArticlesFromDB(
      ITEMS_PER_PAGE,
      PAGE,
      FILTER
    );
    const totalPages = utils.getTotalPages(articleCount, ITEMS_PER_PAGE);
    res.status(200).json({ articles });
  }
};

exports.getAllArticlesForCategory = async (req, res, next) => {
  const ITEMS_PER_PAGE = +req.query.items || 10;
  const PAGE = +req.query.page || 1;
  const category = req.body?.category;
  if (!category) {
    res.status(400).json({
      message: "something went wrong, make sure to input all required data",
    });
  } else {
    const FILTER = { category };
    const { articles, articleCount } = await db.getArticlesFromDB(
      ITEMS_PER_PAGE,
      PAGE,
      FILTER
    );
    const totalPages = utils.getTotalPages(articleCount, ITEMS_PER_PAGE);
    res.status(200).json({ articles });
  }
};
