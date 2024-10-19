const express = require("express");
const Url = require("../models/url");
const router = express.Router();

router.get("/", async (req, res) => {
  const allData = Url.find({});
//   const recentLinks = await allData.find().sort({ createdAt: -1 }).limit(3);
  return res.render("home",{
    // recentLinks:recentLinks,
  });
});
module.exports = router;
