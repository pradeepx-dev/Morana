import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/movies/${id}`);
        setMovie(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchMovie();
  }, [id]);

  if (!movie) return <p>Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
      <div className="flex flex-col md:flex-row">
        <img src={movie.posterUrl} alt={movie.title} className="w-64 h-96 object-cover rounded-lg" />
        <div className="md:ml-6 mt-4 md:mt-0">
          <h1 className="text-3xl font-bold">{movie.title}</h1>
          <p><strong>IMDB Rating:</strong> {movie.imdbRating}</p>
          <p><strong>Genre:</strong> {movie.genre.join(", ")}</p>
          <p><strong>Director:</strong> {movie.director}</p>
          <p><strong>Stars:</strong> {movie.cast.join(", ")}</p>
          <p><strong>Language:</strong> {movie.language}</p>
          <p><strong>Quality:</strong> {movie.videoQuality.join(", ")}</p>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold">Story</h2>
        <p className="mt-2">{movie.story}</p>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold">Download Links</h2>
        <ul className="list-disc ml-6 mt-2">
          {Object.entries(movie.downloadLinks).map(([quality, link]) => (
            <li key={quality}>
              <a href={link} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                {quality} - {link.includes("1080p") ? "2GB" : link.includes("720p") ? "1.1GB" : "450MB"}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default MovieDetail;
