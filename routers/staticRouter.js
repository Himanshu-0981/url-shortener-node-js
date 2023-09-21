const express = require("express");
const URL = require("../models/url");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const allURLs = await URL.find({});
    return res.render("home", {
      urls: allURLs,
    });
  } catch (error) {
    res.json(error);
  }
});
module.exports = router;
