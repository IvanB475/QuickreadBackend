const express = require("express");
const router = express.Router();
const articleController = require("./articleControllers");

router.get(
  "/getIdsOfArticlesForSourceCategory",
  articleController.getIdsOfArticlesForSourceCategory
);

router.post("/addArticle", articleController.addArticle);

module.exports = router;
