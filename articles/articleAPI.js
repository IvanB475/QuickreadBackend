const express = require("express");
const router = express.Router();
const articleController = require("./articleControllers");

router
  .get(
    "/getIdsOfArticlesForSourceCategory",
    articleController.getIdsOfArticlesForSourceCategory
  )
  .get("/getAllArticles", articleController.getAllArticles)
  .get("/getAllArticlesFromSource", articleController.getAllArticlesFromSource)
  .get(
    "/getAllArticlesFromSourceCategory",
    articleController.getAllArticlesFromSourceCategory
  );

router.post("/addArticle", articleController.addArticle);

module.exports = router;
