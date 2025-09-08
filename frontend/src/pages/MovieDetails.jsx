import React, { useState, useEffect } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import { ArrowLeft, Star, Download, Play, Calendar, User, Globe, Film, Share2, Heart } from 'lucide-react'
import { Link } from 'react-router-dom'
import { movieService } from '../services/movieService'
import { formatRating, formatPosterUrl, formatArray } from '../utils/helpers'
import LoadingSpinner from '../components/common/LoadingSpinner'
import MovieGrid from '../components/movie/MovieGrid'

const MovieDetails = () => {
  const { id } = useParams()
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [relatedMovies, setRelatedMovies] = useState([])
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true)
        const data = await movieService.getMovieById(id)
        setMovie(data)
        
        // Simulate related movies (in real app, this would be an API call)
        // For now, we'll just show empty related movies
        setRelatedMovies([])
        
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchMovie()
    }
  }, [id])

  const handleShare = () => {
    if (navigator.share && movie) {
      navigator.share({
        title: movie.title,
        text: `Check out this movie: ${movie.title}`,
        url: window.location.href,
      })
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      alert('Link copied to clipboard!')
    }
  }

  const handleFavoriteToggle = () => {
    setIsFavorite(!isFavorite)
    // In a real app, this would save to user's favorites
  }

  if (loading) {
    return <LoadingSpinner size="lg" text="Loading movie details..." />
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-20">
          <div className="text-red-400 text-xl mb-4">Error Loading Movie</div>
          <p className="text-gray-400 mb-6">{error}</p>
          <Link 
            to="/" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </Link>
        </div>
      </div>
    )
  }

  if (!movie) {
    return <Navigate to="/404" replace />
  }

  const rating = formatRating(movie.imdbRating)

  return (
    <div className="min-h-screen">
      {/* Back Button */}
      <div className="container mx-auto px-4 py-4">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Movies
        </Link>
      </div>

      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent z-10"></div>
        
        <div 
          className="h-96 sm:h-[500px] bg-cover bg-center bg-gray-800"
          style={{
            backgroundImage: `url(${formatPosterUrl(movie.posterUrl, movie.title)})`
          }}
        >
          <div className="container mx-auto px-4 h-full flex items-end pb-8 relative z-20">
            <div className="flex flex-col lg:flex-row items-start lg:items-end gap-6">
              {/* Movie Poster */}
              <div className="flex-shrink-0">
                <img
                  src={formatPosterUrl(movie.posterUrl, movie.title)}
                  alt={movie.title}
                  className="w-48 sm:w-56 lg:w-64 rounded-lg shadow-2xl"
                />
              </div>

              {/* Movie Info */}
              <div className="flex-1">
                <h1 className="text-3xl sm:text-5xl font-bold text-white mb-4 text-shadow">
                  {movie.title}
                </h1>
                
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <div className={`flex items-center gap-1 px-3 py-2 rounded-md font-semibold ${
                    rating.color === 'green' ? 'bg-green-500 text-white' :
                    rating.color === 'yellow' ? 'bg-yellow-500 text-black' :
                    rating.color === 'orange' ? 'bg-orange-500 text-white' :
                    rating.color === 'red' ? 'bg-red-500 text-white' : 'bg-gray-500 text-white'
                  }`}>
                    <Star className="w-5 h-5" />
                    {rating.value}
                  </div>
                  
                  {movie.language && (
                    <div className="flex items-center gap-2 text-white">
                      <Globe className="w-4 h-4" />
                      {movie.language}
                    </div>
                  )}
                  
                  {movie.createdAt && (
                    <div className="flex items-center gap-2 text-white">
                      <Calendar className="w-4 h-4" />
                      {new Date(movie.createdAt).getFullYear()}
                    </div>
                  )}
                </div>

                {/* Genre Tags */}
                {movie.genre && movie.genre.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {movie.genre.map((genre, index) => (
                      <span 
                        key={index} 
                        className="bg-blue-600 bg-opacity-20 text-blue-300 border border-blue-600 px-3 py-1 rounded-full text-sm"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors flex items-center gap-2 font-medium">
                    <Play className="w-5 h-5" />
                    Watch Now
                  </button>
                  
                  <button 
                    onClick={handleFavoriteToggle}
                    className={`px-6 py-3 rounded-lg transition-colors flex items-center gap-2 font-medium ${
                      isFavorite 
                        ? 'bg-red-600 hover:bg-red-700 text-white' 
                        : 'bg-gray-800 hover:bg-gray-700 text-white border border-gray-600'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
                    {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                  </button>
                  
                  <button 
                    onClick={handleShare}
                    className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-colors flex items-center gap-2 font-medium border border-gray-600"
                  >
                    <Share2 className="w-5 h-5" />
                    Share
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Story */}
            {movie.story && (
              <div>
                <h2 className="text-white text-2xl font-bold mb-4 flex items-center gap-2">
                  <Film className="w-6 h-6" />
                  Storyline
                </h2>
                <p className="text-gray-300 leading-relaxed text-lg">{movie.story}</p>
              </div>
            )}

            {/* Cast & Crew */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {movie.director && (
                <div>
                  <h3 className="text-white text-xl font-semibold mb-3 flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Director
                  </h3>
                  <p className="text-gray-300 text-lg">{movie.director}</p>
                </div>
              )}

              {movie.cast && movie.cast.length > 0 && (
                <div>
                  <h3 className="text-white text-xl font-semibold mb-3">Cast</h3>
                  <p className="text-gray-300">{formatArray(movie.cast, 10)}</p>
                </div>
              )}
            </div>

            {/* Quality Info */}
            {movie.videoQuality && movie.videoQuality.length > 0 && (
              <div>
                <h3 className="text-white text-xl font-semibold mb-3">Available Quality</h3>
                <div className="flex flex-wrap gap-3">
                  {movie.videoQuality.map((quality, index) => (
                    <span 
                      key={index} 
                      className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
                    >
                      {quality} Quality
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Download Section */}
            <div className="bg-gray-800 rounded-xl p-6">
              <h3 className="text-white text-xl font-semibold mb-4 flex items-center gap-2">
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
                      className="block w-full bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg transition-colors text-center font-medium"
                    >
                      Download {quality}
                    </a>
                  ))}
                </div>
              ) : (
                <div className="text-gray-400 text-center py-4">
                  Download links will be available soon
                </div>
              )}
            </div>

            {/* Movie Details */}
            <div className="bg-gray-800 rounded-xl p-6">
              <h3 className="text-white text-xl font-semibold mb-4">Movie Details</h3>
              <div className="space-y-3">
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
                
                {movie.genre && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Genres:</span>
                    <span className="text-white text-right">{movie.genre.join(', ')}</span>
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

        {/* Related Movies */}
        {relatedMovies.length > 0 && (
          <section className="mt-16">
            <h2 className="text-white text-2xl font-bold mb-6">Related Movies</h2>
            <MovieGrid 
              movies={relatedMovies} 
              viewMode="grid"
              onMovieClick={(movie) => {
                // Navigate to the new movie
                window.location.href = `/movie/${movie._id}`
              }}
            />
          </section>
        )}
      </section>
    </div>
  )
}

export default MovieDetails