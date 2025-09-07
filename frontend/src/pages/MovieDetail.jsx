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

  if (!movie) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Poster */}
          <div className="md:w-1/3">
            <img src={movie.posterUrl} alt={movie.title} className="w-full h-full object-cover" />
          </div>

          {/* Info */}
          <div className="md:w-2/3 p-8">
            <h1 className="text-4xl font-extrabold text-gray-900">{movie.title}</h1>
            <p className="mt-2 text-gray-600">⭐ IMDB: {movie.imdbRating}</p>
            <p className="mt-2"><strong>Genre:</strong> {movie.genre.join(", ")}</p>
            <p className="mt-1"><strong>Director:</strong> {movie.director}</p>
            <p className="mt-1"><strong>Stars:</strong> {movie.cast.join(", ")}</p>
            <p className="mt-1"><strong>Language:</strong> {movie.language}</p>
            <p className="mt-1"><strong>Quality:</strong> {movie.videoQuality.join(", ")}</p>
          </div>
        </div>

        {/* Story */}
        <div className="p-8 border-t">
          <h2 className="text-2xl font-bold mb-3">📖 Story</h2>
          <p className="text-gray-700 leading-relaxed">{movie.story}</p>
        </div>

        {/* Download Links */}
        <div className="p-8 border-t">
          <h2 className="text-2xl font-bold mb-3">⬇️ Download Links</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(movie.downloadLinks).map(([quality, link]) => (
              <a
                key={quality}
                href={link}
                target="_blank"
                rel="noreferrer"
                className="block text-center p-4 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
              >
                {quality} ({link.includes("1080p") ? "2GB" : link.includes("720p") ? "1.1GB" : "450MB"})
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;
