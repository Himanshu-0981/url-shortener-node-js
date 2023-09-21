const ShortUniqueId = require("short-unique-id");
const URL = require("../models/url");

const handleGetAllURL = async (req, res) => {
  try {
    const allURL = await URL.find({});
    res.json(allURL);
  } catch (err) {
    res.json(err);
  }
};

const handleSaveURL = async (req, res) => {
  const body = req.body;
  if (!body.url) return res.status(400).json({ msg: "URL is required" });

  // crating unique url
  const uid = new ShortUniqueId({ length: 8 });
  const uuid = uid.rnd();

  try {
    await URL.create({
      shortURL: uuid,
      redirectedURL: body.url,
      visitedHistory: [],
    });
    return res.render("home", {
      shortId: uuid,
    });
  } catch (err) {
    res.json({ error: err });
  }
};

const handleRedirectUser = async (req, res) => {
  const uniqueId = req.params.shortId;
  try {
    const entry = await URL.findOneAndUpdate(
      {
        shortURL: uniqueId,
      },
      {
        $push: {
          visitedHistory: {
            timestamp: Date.now(),
          },
        },
      }
    );
    res.redirect(entry.redirectedURL);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
};

const handleAnalytics = async (req, res) => {
  const shortId = req.params.shortId;
  try {
    const getAnalytics = await URL.findOne({ shortURL: shortId });
    res.json({
      analytics: getAnalytics,
      totalClicks: getAnalytics.visitedHistory.length,
    });
  } catch (err) {
    res.json(err);
  }
};

module.exports = {
  handleGetAllURL,
  handleSaveURL,
  handleRedirectUser,
  handleAnalytics,
};
