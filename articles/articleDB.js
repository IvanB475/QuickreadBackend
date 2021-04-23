const Article = require("./articleModel");

exports.saveArticle = async (article) => {
  const newArticle = new Article(article);
  try {
    await newArticle.save();
  } catch (e) {
    return e;
  }
};

exports.getIdsOfArticlesForSourceCategoryFromDB = async (
  idSource,
  category
) => {
  const articles = await Article.find({
    idSource,
    category,
  });

  return articles;
};

exports.getArticlesFromDB = async (ITEMS_PER_PAGE, PAGE, FILTER) => {
  const filter = FILTER || {};
  const articles = await Article.find(filter)
    .skip((PAGE - 1) * ITEMS_PER_PAGE)
    .limit(ITEMS_PER_PAGE);
  console.log(articles);
  return articles;
};
