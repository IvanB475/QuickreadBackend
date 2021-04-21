const express = require("express");
const router = express.Router();
const sourceController = require("./sourceControllers");
const authHeader = require("../middleware/authHeader");

router.get(
  "/getAllSources",
  authHeader.validateUserThroughHeader,
  sourceController.getSources
);

router.post(
  "/addSource",
  authHeader.validateUserThroughHeader,
  sourceController.addSource
);

module.exports = router;
