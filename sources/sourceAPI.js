const express = require("express");
const router = express.Router();
const sourceController = require("./sourceControllers");
const authHeader = require("../middleware/authHeader");

router.get(
  "/getAllSources",
  authHeader.validateUserThroughHeader,
  sourceController.getAllSources
);

router.get("/getSources", sourceController.getSources);

router.get("/getAllCategories", sourceController.getAllCategories);

router.post(
  "/addSource",
  authHeader.validateUserThroughHeader,
  sourceController.addSource
);

router.put(
  "/updateSource",
  authHeader.validateUserThroughHeader,
  sourceController.updateSource
);

module.exports = router;
