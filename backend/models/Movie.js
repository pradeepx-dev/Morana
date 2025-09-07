const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  posterUrl: String,
  imdbRating: { type: String, default: "N/A" },
  genre: [String],
  director: String,
  cast: [String],
  language: String,
  videoQuality: [String],
  story: String,
  downloadLinks: {
    "1080p": String,
    "720p": String,
    "480p": String,
  },
}, { timestamps: true });

module.exports = mongoose.model("Movie", movieSchema);
