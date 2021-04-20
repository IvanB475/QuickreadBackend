const Article = require("./articleModel");

exports.saveArticle = async (article) => {
  const newArticle = new Article(article);
  try {
    await newArticle.save();
    console.log("Article added successfully");
  } catch (e) {
    return 0;
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
