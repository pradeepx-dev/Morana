const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const Movie = require("./models/Movie");

dotenv.config();
connectDB();

const movies = [
  {
    title: "Morano: The Hidden Truth",
    posterUrl: "https://via.placeholder.com/300x450.png?text=Morano",
    imdbRating: "N/A",
    genre: ["Action", "Drama", "Thriller"],
    director: "Harsha",
    cast: ["Sonam Bajwa", "Tiger Shroff", "Sanjay Dutt"],
    language: "Hindi",
    videoQuality: ["1080p", "720p", "480p"],
    story: "After surviving an attempted suicide by train, a grief-stricken man descends into chaos as reality blurs. His loved ones question what’s real while a hidden truth draws him into a web of obsession and enduring love.",
    downloadLinks: {
      "1080p": "https://example.com/morano-1080p.mp4",
      "720p": "https://example.com/morano-720p.mp4",
      "480p": "https://example.com/morano-480p.mp4",
    },
  },
  {
    title: "Shadow Hunt",
    posterUrl: "https://via.placeholder.com/300x450.png?text=Shadow+Hunt",
    imdbRating: "7.8",
    genre: ["Thriller", "Crime"],
    director: "Rohit Mehra",
    cast: ["John Abraham", "Radhika Apte"],
    language: "Hindi",
    videoQuality: ["1080p", "720p"],
    story: "An undercover cop hunts down a crime syndicate but finds himself questioning loyalty and justice.",
    downloadLinks: {
      "1080p": "https://example.com/shadowhunt-1080p.mp4",
      "720p": "https://example.com/shadowhunt-720p.mp4",
    },
  },
  {
    title: "Galactic Wars",
    posterUrl: "https://via.placeholder.com/300x450.png?text=Galactic+Wars",
    imdbRating: "8.5",
    genre: ["Sci-Fi", "Action"],
    director: "Karan Malhotra",
    cast: ["Hrithik Roshan", "Alia Bhatt"],
    language: "English",
    videoQuality: ["1080p", "720p", "480p"],
    story: "In a distant galaxy, rebels rise against an oppressive empire in a war for freedom.",
    downloadLinks: {
      "1080p": "https://example.com/galacticwars-1080p.mp4",
      "720p": "https://example.com/galacticwars-720p.mp4",
      "480p": "https://example.com/galacticwars-480p.mp4",
    },
  },
];

const importData = async () => {
  try {
    await Movie.deleteMany(); // Clear old data
    const createdMovies = await Movie.insertMany(movies);
    console.log("Sample movies imported!", createdMovies);
    process.exit();
  } catch (error) {
    console.error("Error with seeding:", error);
    process.exit(1);
  }
};

importData();
