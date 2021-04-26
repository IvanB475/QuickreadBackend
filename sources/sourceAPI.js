const express = require("express");
const router = express.Router();
const sourceController = require("./sourceControllers");
const authHeader = require("../middleware/authHeader");
const authToken = require("../middleware/authToken");

router.get(
  "/getAllSources",
  authHeader.validateUserThroughHeader,
  sourceController.getAllSources
);

router.get("/getSources", authToken.validateToken, sourceController.getSources);

router.get(
  "/getAllCategories",
  authToken.validateToken,
  sourceController.getAllCategories
);

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
