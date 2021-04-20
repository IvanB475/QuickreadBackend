const express = require("express");
const router = express.Router();
const sourceController = require("./sourceControllers");

router.get("/getAllSources", sourceController.getSources);

router.post("/addSource", sourceController.addSource);

module.exports = router;
