import React, { useEffect } from 'react'
import { X, Star, Download, Play, Calendar, User, Globe, Film } from 'lucide-react'
import { formatRating, formatPosterUrl, formatArray } from '../../utils/helpers'

const MovieModal = ({ movie, isOpen, onClose }) => {
  const rating = formatRating(movie?.imdbRating)

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen || !movie) return null

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-gray-900 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-slide-up">
        {/* Header Image */}
        <div className="relative">
          <img 
            src={formatPosterUrl(movie.posterUrl, movie.title)} 
            alt={movie.title}
            className="w-full h-64 sm:h-80 object-cover"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
          
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 bg-black bg-opacity-50 hover:bg-opacity-75 text-white w-10 h-10 rounded-full flex items-center justify-center transition-all"
          >
            <X className="w-6 h-6" />
          </button>
          
          {/* Movie Title and Basic Info */}
          <div className="absolute bottom-4 left-4 right-4">
            <h1 className="text-white text-2xl sm:text-4xl font-bold mb-2 text-shadow">
              {movie.title}
            </h1>
            <div className="flex items-center gap-4 text-white">
              <div className={`flex items-center gap-1 px-3 py-1 rounded-md ${
                rating.color === 'green' ? 'bg-green-500' :
                rating.color === 'yellow' ? 'bg-yellow-500 text-black' :
                rating.color === 'orange' ? 'bg-orange-500' :
                rating.color === 'red' ? 'bg-red-500' : 'bg-gray-500'
              }`}>
                <Star className="w-5 h-5" />
                {rating.value}
              </div>
              
              {movie.language && (
                <div className="flex items-center gap-1">
                  <Globe className="w-4 h-4" />
                  {movie.language}
                </div>
              )}
              
              {movie.createdAt && (
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(movie.createdAt).getFullYear()}
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Story */}
              {movie.story && (
                <div className="mb-6">
                  <h2 className="text-white text-xl font-bold mb-3 flex items-center gap-2">
                    <Film className="w-5 h-5" />
                    Story
                  </h2>
                  <p className="text-gray-300 leading-relaxed">{movie.story}</p>
                </div>
              )}
              
              {/* Movie Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                {/* Director */}
                {movie.director && (
                  <div>
                    <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Director
                    </h3>
                    <p className="text-gray-300">{movie.director}</p>
                  </div>
                )}
                
                {/* Genres */}
                {movie.genre && movie.genre.length > 0 && (
                  <div>
                    <h3 className="text-white font-semibold mb-2">Genre</h3>
                    <div className="flex flex-wrap gap-2">
                      {movie.genre.map((genre, index) => (
                        <span 
                          key={index} 
                          className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm"
                        >
                          {genre}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              {/* Cast */}
              {movie.cast && movie.cast.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-white font-semibold mb-2">Cast</h3>
                  <p className="text-gray-300">{formatArray(movie.cast, 5)}</p>
                </div>
              )}
              
              {/* Video Quality */}
              {movie.videoQuality && movie.videoQuality.length > 0 && (
                <div>
                  <h3 className="text-white font-semibold mb-2">Available Quality</h3>
                  <div className="flex flex-wrap gap-2">
                    {movie.videoQuality.map((quality, index) => (
                      <span 
                        key={index} 
                        className="bg-green-600 text-white px-3 py-1 rounded text-sm font-medium"
                      >
                        {quality}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Sidebar - Download Links */}
            <div className="lg:col-span-1">
              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <Download className="w-5 h-5" />
                  Download Links
                </h3>
                
                {movie.downloadLinks && Object.keys(movie.downloadLinks).length > 0 ? (
                  <div className="space-y-3">
                    {Object.entries(movie.downloadLinks).map(([quality, link]) => (
                      <a 
                        key={quality}
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg transition-colors group"
                      >
                        <Download className="w-5 h-5 group-hover:animate-bounce" />
                        <div className="flex-1">
                          <div className="font-medium">{quality}</div>
                          <div className="text-green-200 text-sm">Click to download</div>
                        </div>
                      </a>
                    ))}
                  </div>
                ) : (
                  <div className="text-gray-400 text-center py-4">
                    Download links not available
                  </div>
                )}
                
                {/* Watch Online Button */}
                <div className="mt-4 pt-4 border-t border-gray-700">
                  <button className="w-full flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg transition-colors group">
                    <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span className="font-medium">Watch Online</span>
                  </button>
                </div>
              </div>
              
              {/* Movie Stats */}
              <div className="bg-gray-800 rounded-lg p-6 mt-4">
                <h3 className="text-white font-semibold mb-4">Movie Info</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">IMDB Rating:</span>
                    <span className="text-white font-medium">{rating.value}/10</span>
                  </div>
                  
                  {movie.language && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">Language:</span>
                      <span className="text-white">{movie.language}</span>
                    </div>
                  )}
                  
                  {movie.videoQuality && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">Quality:</span>
                      <span className="text-white">{movie.videoQuality.join(', ')}</span>
                    </div>
                  )}
                  
                  {movie.createdAt && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">Added:</span>
                      <span className="text-white">
                        {new Date(movie.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieModal