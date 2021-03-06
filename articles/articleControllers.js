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
  const idSource = req.query?.idSource;
  const category = req.query?.category;
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
  const getTotalPages = req.query.getTotalPages || false;
  const { articles, articleCount } = await db.getArticlesFromDB(
    ITEMS_PER_PAGE,
    PAGE
  );
  if (getTotalPages) {
    const totalPages = await utils.getTotalPages(articleCount, ITEMS_PER_PAGE);
    res.status(200).json({ articles, totalPages });
  } else {
    res.status(200).json({ articles });
  }
};

exports.getAllArticlesFromSource = async (req, res, next) => {
  const ITEMS_PER_PAGE = +req.query.items || 10;
  const PAGE = +req.query.page || 1;
  const getTotalPages = req.query.getTotalPages || false;
  const idSource = req.query.idSource;
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
    if (getTotalPages) {
      const totalPages = await utils.getTotalPages(
        articleCount,
        ITEMS_PER_PAGE
      );
      res.status(200).json({ articles, totalPages });
    } else {
      res.status(200).json({ articles });
    }
  }
};

exports.getAllArticlesFromSourceCategory = async (req, res, next) => {
  const ITEMS_PER_PAGE = +req.query.items || 10;
  const PAGE = +req.query.page || 1;
  const getTotalPages = req.query.getTotalPages || false;
  const idSource = req.query.idSource;
  const category = req.query.category;
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
    if (getTotalPages) {
      const totalPages = await utils.getTotalPages(
        articleCount,
        ITEMS_PER_PAGE
      );
      res.status(200).json({ articles, totalPages });
    } else {
      res.status(200).json({ articles });
    }
  }
};

exports.getAllArticlesForCategory = async (req, res, next) => {
  const ITEMS_PER_PAGE = +req.query.items || 10;
  const PAGE = +req.query.page || 1;
  const getTotalPages = req.query.getTotalPages || false;
  const category = req.query.category;
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
    if (getTotalPages) {
      const totalPages = await utils.getTotalPages(
        articleCount,
        ITEMS_PER_PAGE
      );
      res.status(200).json({ articles, totalPages });
    } else {
      res.status(200).json({ articles });
    }
  }
};

exports.deleteOldArticles = async (req, res, next) => {
  const daysAgo = req.body?.daysAgo || 5;
  const today = new Date();
  const beforeDay = new Date(today.setDate(today.getDate() - daysAgo));
  const filter = { insertionDate: { $lte: beforeDay } };
  try {
    const deletedDocuments = await db.deleteOldArticlesFromDB(filter);
    res.status(200).json({ deletedDocuments });
  } catch (e) {
    res.status(400).json({ message: "something went wrong" });
  }
};

exports.deleteArticle = async (req, res, next) => {
  const idUrl = req.body.idUrl;
  if (!idUrl) {
    res.status(400).json({ message: "nothing for you to delete here" });
  } else {
    try {
      const deletedArticle = await db.deleteArticleFromDB(idUrl);
      if (!deletedArticle) {
        res.status(400).json({ message: "article with that id doesn't exist" });
      } else {
        res.status(200).json({ message: "successfully deleted" });
      }
    } catch (e) {
      res.status(400).json({ message: "something went wrong" });
    }
  }
};
