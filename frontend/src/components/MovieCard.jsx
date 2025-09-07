import { Link } from "react-router-dom";

function MovieCard({ movie }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <Link to={`/movie/${movie._id}`}>
        <img src={movie.posterUrl} alt={movie.title} className="w-full h-64 object-cover" />
      </Link>
      <div className="p-2 text-center">
        <Link to={`/movie/${movie._id}`} className="text-lg font-semibold hover:text-blue-600">
          {movie.title}
        </Link>
      </div>
    </div>
  );
}

export default MovieCard;
