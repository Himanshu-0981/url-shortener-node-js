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
    await URL.create({ shortURL: uuid, redirectedURL: body.url });
    res.json({ shortId: uuid });
  } catch (err) {
    res.json({ error: err });
  }
};

const handleRedirectUser = async (req, res) => {
  const uniqueId = req.params.shortId;
  try {
    const findURL = await URL.findOne({ shortURL: uniqueId });
    res.redirect(findURL.redirectedURL);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
};

module.exports = {
  handleGetAllURL,
  handleSaveURL,
  handleRedirectUser,
};
