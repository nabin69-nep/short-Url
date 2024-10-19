const express = require("express");
const {
  handleGenerateNewShortUrl,
  handleGetAnalytics,
  handleShortIdAndRedirect,
  handleShowResult
} = require("../controllers/url");
const router = express.Router();
router.post("/", handleGenerateNewShortUrl);
router.get("/:shortId", handleShortIdAndRedirect);
router.get("/anayltics/:shortId", handleGetAnalytics)
module.exports = router;
