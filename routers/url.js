const express = require("express");
const {
  handleGetAllURL,
  handleSaveURL,
  handleRedirectUser,
} = require("../controllers/url");

const router = express.Router();

router.route("/").get(handleGetAllURL);
router.route("/url").post(handleSaveURL);
router.route("/:shortId").get(handleRedirectUser);

module.exports = router;
