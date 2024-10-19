const URL = require("../models/url");
const shortid = require("shortid");

async function handleShortIdAndRedirect(req, res) {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    { $push: { visitHistory: { timeStamp: Date.now() } } }
  );
  res.redirect(entry.redirectUrl);
}

async function handleGenerateNewShortUrl(req, res) {
  const body = req.body;
  if (!body.url)
    return res.status(400).json({ error: "Please provide the url" });

  const shortIds = shortid();
  await URL.create({
    shortId: shortIds,
    redirectUrl: body.url,
    visitHistory: [],
  });

  return res.render("home", {
    id: shortIds,
  });
}


async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  return res.json({
    totalClick: result.visitHistory.length,
    History: result.visitHistory,
  });
}

module.exports = {
  handleGenerateNewShortUrl,
  handleShortIdAndRedirect,
  handleGetAnalytics,
};
