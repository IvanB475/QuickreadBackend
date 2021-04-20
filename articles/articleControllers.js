const db = require("./articleDB");

exports.addArticle = async (req, res, next) => {
  const idUrl = req.body?.idUrl;
  const source = req.body?.source;
  const idSource = req.body?.idSource;
  const category = req.body?.category;
  const title = req.body?.title;
  const imageUrl = req.body?.imageUrl;
  const publishDate = req.body?.publishDate;
  const author = req.body?.author;
  const summary = req.body?.summary;

  const article = {
    idUrl,
    source,
    idSource,
    category,
    title,
    imageUrl,
    publishDate,
    author,
    summary,
  };

  const checkifErrors = await db.saveArticle(article);

  if (checkifErrors === 0) {
    res.status(400).json({ message: "Article couldn't be added" });
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
    res.status(200).json({ message: "Fetched articleIDs", articleIDs });
  } catch (e) {
    res.status(400).json({ message: "something went wrong" });
  }
};
