const Article = require("./articleModel");
const schedule = require("node-schedule");

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

exports.addCategoryToArticle = async (idUrl, newCategory) => {
  const article = await Article.findOne({ idUrl });
  let quit = false;
  try {
    article.category.forEach((category) => {
      if (category == newCategory) {
        console.log("matching");
        quit = true;
      }
    });
    if (quit) {
      return 0;
    } else {
      await article.category.push(newCategory);
      article.save();
      return newCategory;
    }
  } catch (e) {
    console.log(e);
    return 0;
  }
};

exports.getArticlesFromDB = async (ITEMS_PER_PAGE, PAGE, FILTER) => {
  const filter = FILTER || {};
  const articleCount = await Article.find(filter).countDocuments();
  const articles = await Article.find(filter)
    .sort({ _id: -1 })
    .skip((PAGE - 1) * ITEMS_PER_PAGE)
    .limit(ITEMS_PER_PAGE);

  return { articles, articleCount };
};

exports.deleteOldArticlesFromDB = async (FILTER) => {
  const filter = FILTER || {};
  try {
    const articlesToDelete = await Article.deleteMany(filter);
    return articlesToDelete.deletedCount;
  } catch (e) {
    throw new Error(e);
  }
};

exports.deleteArticleFromDB = async (idUrl) => {
  try {
    const articleToDelete = await Article.findOneAndDelete({ idUrl: idUrl });
    return articleToDelete;
  } catch (e) {
    throw new Error(e);
  }
};

const automatedDeletion = schedule.scheduleJob("58 * * * *", () => {
  console.log("job was hit");
  Article.deleteMany({
    publishDate: {
      $lt: new Date(Date.now() - 1000 * 60 * 60 * 144),
    },
  }).then((article) => {
    console.log(article);
  });
});

automatedDeletion;
