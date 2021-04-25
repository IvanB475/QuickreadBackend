const express = require("express");
const router = express.Router();
const articleController = require("./articleControllers");
const authHeader = require("../middleware/authHeader");

router
  .get(
    "/getIdsOfArticlesForSourceCategory",
    authHeader.validateUserThroughHeader,
    articleController.getIdsOfArticlesForSourceCategory
  )
  .get("/getAllArticles", articleController.getAllArticles)
  .get("/getAllArticlesFromSource", articleController.getAllArticlesFromSource)
  .get(
    "/getAllArticlesFromSourceCategory",
    articleController.getAllArticlesFromSourceCategory
  )
  .get(
    "/getAllArticlesForCategory",
    articleController.getAllArticlesForCategory
  );

router.post(
  "/addArticle",
  authHeader.validateUserThroughHeader,
  articleController.addArticle
);

module.exports = router;
