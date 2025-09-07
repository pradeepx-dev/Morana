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
    <div>
      <h1 className="text-2xl font-bold mb-4">Movies</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {movies.map((movie) => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default Home;
