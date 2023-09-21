const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema(
  {
    shortURL: {
      type: String,
      required: true,
      unique: true,
    },
    redirectedURL: {
      type: String,
      require: true,
    },
    visitedHistory: [],
  },
  { timestamps: true }
);

const URL = mongoose.model("url", urlSchema);

module.exports = URL;
