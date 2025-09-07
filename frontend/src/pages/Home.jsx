import { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "../components/MovieCard";

function Home() {
  const [movies, setMovies] = useState([]);
  const query = new URLSearchParams(window.location.search).get("search");

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        let url = "http://localhost:5000/api/movies";
        if (query) url += `?search=${query}`;
        const res = await axios.get(url);
        setMovies(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchMovies();
  }, [query]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <h1 className="text-3xl font-extrabold mb-8 text-gray-800 text-center">🎬 Explore Movies</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 container mx-auto">
        {movies.length > 0 ? (
          movies.map((movie) => <MovieCard key={movie._id} movie={movie} />)
        ) : (
          <p className="col-span-full text-center text-gray-600">No movies found.</p>
        )}
      </div>
    </div>
  );
}

export default Home;
