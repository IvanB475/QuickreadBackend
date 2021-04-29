const express = require("express");
const router = express.Router();
const articleController = require("./articleControllers");
const authHeader = require("../middleware/authHeader");
const authToken = require("../middleware/authToken");

router
  .get(
    "/getIdsOfArticlesForSourceCategory",
    authHeader.validateUserThroughHeader,
    articleController.getIdsOfArticlesForSourceCategory
  )
  .get(
    "/getAllArticles",
    authToken.validateToken,
    articleController.getAllArticles
  )
  .get(
    "/getAllArticlesFromSource",
    authToken.validateToken,
    articleController.getAllArticlesFromSource
  )
  .get(
    "/getAllArticlesFromSourceCategory",
    authToken.validateToken,
    articleController.getAllArticlesFromSourceCategory
  )
  .get(
    "/getAllArticlesForCategory",
    authToken.validateToken,
    articleController.getAllArticlesForCategory
  );

router.post(
  "/addArticle",
  authHeader.validateUserThroughHeader,
  articleController.addArticle
);

router
  .delete("/deleteArticle", articleController.deleteArticle)
  .delete("/deleteOldArticles", articleController.deleteOldArticles);

module.exports = router;
