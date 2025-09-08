const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const Movie = require("./models/Movie");

dotenv.config();
connectDB();

const movies = [
    {
      title: "Lokah Chapter 1",
      posterUrl: "https://myimg.click/images/2025/09/03/Lokah-Chapter-1-Chandra-2025.jpg", // No poster found on the page
      imdbRating: "8.3/10",
      genre: ["Action", "Fantasy"],
      director: "Dominic Arun",
      cast: ["Kalyani Priyadarshan", "Dulquer Salmaan", "Tovino Thomas"],
      language: "Hindi",
      videoQuality: ["1080p", "720p", "480p"],
      story: "A young woman discovers supernatural abilities while facing personal challenges. As evil emerges, she must accept her powers and destiny in a transforming world. Her journey launches a new superhero saga.",
      downloadLinks: {
        "1080p": "https://photo/download/W4hq9WHM-a2",
        "720p": "https://photo/download/GGWd1FWzzww",
        "480p": "https://photo/download/HH0L8Z1WbAr"
      }
    },

];

const importData = async () => {
  try {
    // await Movie.deleteMany();
    const createdMovies = await Movie.insertMany(movies);
    console.log("Movies imported!", createdMovies);
    process.exit();
  } catch (error) {
    console.error("Error with seeding:", error);
    process.exit(1);
  }
};

importData();
