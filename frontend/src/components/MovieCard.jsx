import { Link } from "react-router-dom";

function MovieCard({ movie }) {
  return (
    <Link to={`/movie/${movie._id}`} className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition">
      <img
        src={movie.posterUrl}
        alt={movie.title}
        className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 flex items-end">
        <h3 className="text-white text-lg font-bold p-4">{movie.title}</h3>
      </div>
    </Link>
  );
}

export default MovieCard;
