const express = require("express");
const {
  handleGetAllURL,
  handleSaveURL,
  handleRedirectUser,
  handleAnalytics,
} = require("../controllers/url");

const router = express.Router();

router.route("/").get(handleGetAllURL);
router.route("/url").post(handleSaveURL);
router.route("/:shortId").get(handleRedirectUser);
router.route("/analytics/:shortId").get(handleAnalytics);

module.exports = router;
