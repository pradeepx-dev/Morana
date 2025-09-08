import React from 'react'
import { Link } from 'react-router-dom'
import { Star, Play, Download, Calendar } from 'lucide-react'
import { formatRating, formatPosterUrl, truncateText } from '../../utils/helpers'

const MovieCard = ({ movie, onClick }) => {
  const rating = formatRating(movie.imdbRating)
  
  const handleCardClick = () => {
    if (onClick) {
      onClick(movie)
    }
  }

  return (
    <div 
      className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer"
      onClick={handleCardClick}
    >
      {/* Movie Poster */}
      <div className="relative">
        <img 
          src={formatPosterUrl(movie.posterUrl, movie.title)} 
          alt={movie.title}
          className="w-full h-64 sm:h-80 object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        
        {/* Overlay on Hover */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
          <Play className="text-white w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        
        {/* Rating Badge */}
        <div className={`absolute top-3 right-3 px-2 py-1 rounded-md font-semibold flex items-center gap-1 ${
          rating.color === 'green' ? 'bg-green-500 text-white' :
          rating.color === 'yellow' ? 'bg-yellow-500 text-black' :
          rating.color === 'orange' ? 'bg-orange-500 text-white' :
          rating.color === 'red' ? 'bg-red-500 text-white' : 'bg-gray-500 text-white'
        }`}>
          <Star className="w-4 h-4" />
          {rating.value}
        </div>

        {/* Quality Badges */}
        {movie.videoQuality && movie.videoQuality.length > 0 && (
          <div className="absolute bottom-3 left-3 flex gap-1">
            {movie.videoQuality.slice(0, 2).map((quality, index) => (
              <span 
                key={index}
                className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium"
              >
                {quality}
              </span>
            ))}
            {movie.videoQuality.length > 2 && (
              <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium">
                +{movie.videoQuality.length - 2}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Movie Info */}
      <div className="p-4">
        {/* Title */}
        <h3 className="text-white text-lg font-bold mb-2 line-clamp-1 group-hover:text-blue-400 transition-colors">
          {movie.title}
        </h3>
        
        {/* Genres */}
        <div className="flex flex-wrap gap-1 mb-3">
          {movie.genre && movie.genre.slice(0, 2).map((genre, index) => (
            <span 
              key={index} 
              className="bg-purple-600 bg-opacity-20 text-purple-300 border border-purple-600 px-2 py-1 rounded text-xs"
            >
              {genre}
            </span>
          ))}
          {movie.genre && movie.genre.length > 2 && (
            <span className="bg-purple-600 bg-opacity-20 text-purple-300 border border-purple-600 px-2 py-1 rounded text-xs">
              +{movie.genre.length - 2}
            </span>
          )}
        </div>

        {/* Director */}
        {movie.director && (
          <p className="text-gray-400 text-sm mb-2">
            Directed by {movie.director}
          </p>
        )}

        {/* Language */}
        {movie.language && (
          <p className="text-gray-400 text-sm mb-3">
            {movie.language}
          </p>
        )}

        {/* Story Preview */}
        {movie.story && (
          <p className="text-gray-300 text-sm mb-3 line-clamp-2">
            {truncateText(movie.story, 80)}
          </p>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-green-400 text-sm">
            <Download className="w-4 h-4" />
            <span>{movie.videoQuality?.length || 0} formats</span>
          </div>
          
          {movie.createdAt && (
            <div className="flex items-center gap-1 text-gray-500 text-xs">
              <Calendar className="w-3 h-3" />
              {new Date(movie.createdAt).getFullYear()}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Compact version for list view
export const MovieCardCompact = ({ movie, onClick }) => {
  const rating = formatRating(movie.imdbRating)
  
  return (
    <div 
      className="bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 group cursor-pointer"
      onClick={() => onClick && onClick(movie)}
    >
      <div className="flex">
        {/* Poster */}
        <div className="relative w-24 sm:w-32 flex-shrink-0">
          <img 
            src={formatPosterUrl(movie.posterUrl, movie.title)} 
            alt={movie.title}
            className="w-full h-32 sm:h-40 object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
            <Play className="text-white w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </div>
        
        {/* Info */}
        <div className="flex-1 p-4">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-white text-lg font-bold line-clamp-1 group-hover:text-blue-400 transition-colors flex-1">
              {movie.title}
            </h3>
            <div className={`ml-2 px-2 py-1 rounded text-sm font-medium flex items-center gap-1 ${
              rating.color === 'green' ? 'bg-green-500 text-white' :
              rating.color === 'yellow' ? 'bg-yellow-500 text-black' :
              rating.color === 'orange' ? 'bg-orange-500 text-white' :
              rating.color === 'red' ? 'bg-red-500 text-white' : 'bg-gray-500 text-white'
            }`}>
              <Star className="w-3 h-3" />
              {rating.value}
            </div>
          </div>
          
          <div className="flex flex-wrap gap-1 mb-2">
            {movie.genre && movie.genre.slice(0, 3).map((genre, index) => (
              <span 
                key={index} 
                className="bg-blue-600 text-white px-2 py-1 rounded text-xs"
              >
                {genre}
              </span>
            ))}
          </div>
          
          {movie.director && (
            <p className="text-gray-400 text-sm mb-2">
              {movie.director}
            </p>
          )}
          
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-green-400">
              <Download className="w-4 h-4" />
              {movie.videoQuality?.join(', ') || 'Multiple formats'}
            </div>
            
            {movie.language && (
              <span className="text-gray-500">{movie.language}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieCard