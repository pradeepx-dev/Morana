import React, { useState, useRef, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { 
  Star, 
  Play, 
  Download, 
  Calendar, 
  Edit, 
  Trash2, 
  MoreVertical, 
  Eye,
  Clock,
  ImageIcon
} from 'lucide-react'
import { formatRating, formatPosterUrl, truncateText } from '../../utils/helpers'
import DeleteDialog from '../ui/DeleteDialog'

// Image cache to store loaded images
const imageCache = new Set()

// Preload images for better performance
const preloadImage = (src) => {
  return new Promise((resolve, reject) => {
    if (imageCache.has(src)) {
      resolve(src)
      return
    }
    
    const img = new Image()
    img.onload = () => {
      imageCache.add(src)
      resolve(src)
    }
    img.onerror = reject
    img.src = src
  })
}

const OptimizedImage = ({ src, alt, className, onLoad, onError, placeholder }) => {
  const [imageState, setImageState] = useState('loading')
  const [imageSrc, setImageSrc] = useState('')
  const imgRef = useRef(null)

  useEffect(() => {
    let isCancelled = false
    
    const loadImage = async () => {
      try {
        setImageState('loading')
        
        // Check if image is already cached
        if (imageCache.has(src)) {
          if (!isCancelled) {
            setImageSrc(src)
            setImageState('loaded')
            onLoad && onLoad()
          }
          return
        }

        // Preload image
        await preloadImage(src)
        
        if (!isCancelled) {
          setImageSrc(src)
          setImageState('loaded')
          onLoad && onLoad()
        }
      } catch (error) {
        if (!isCancelled) {
          setImageState('error')
          onError && onError()
        }
      }
    }

    if (src) {
      loadImage()
    }

    return () => {
      isCancelled = true
    }
  }, [src, onLoad, onError])

  if (imageState === 'loading') {
    return (
      <div className={`${className} bg-gray-700 animate-pulse flex items-center justify-center`}>
        {placeholder || (
          <div className="text-center text-gray-500">
            <ImageIcon className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <div className="text-xs">Loading...</div>
          </div>
        )}
      </div>
    )
  }

  if (imageState === 'error') {
    return (
      <div className={`${className} bg-gray-700 flex items-center justify-center`}>
        <div className="text-center text-gray-500">
          <div className="text-4xl mb-2">🎬</div>
          <div className="text-xs px-2">{alt}</div>
        </div>
      </div>
    )
  }

  return (
    <img 
      ref={imgRef}
      src={imageSrc} 
      alt={alt}
      className={className}
      loading="lazy"
      decoding="async"
    />
  )
}

const MovieCard = ({ movie, onClick, onDelete, showActions = true, isDeleting = false }) => {
  const [showMenu, setShowMenu] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const menuRef = useRef(null)
  const rating = formatRating(movie.imdbRating)
  
  // Optimize poster URL for faster loading
  const optimizedPosterUrl = useCallback(() => {
    const posterUrl = formatPosterUrl(movie.posterUrl, movie.title)
    
    // Add image optimization parameters if it's from common CDNs
    if (posterUrl.includes('images.unsplash.com')) {
      return `${posterUrl}&w=400&h=600&fit=crop&auto=format&q=75`
    }
    if (posterUrl.includes('via.placeholder.com')) {
      return posterUrl
    }
    
    return posterUrl
  }, [movie.posterUrl, movie.title])

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleCardClick = (e) => {
    // Prevent card click when interacting with action buttons
    if (
      e.target.closest('.action-button') || 
      e.target.closest('.menu-container') ||
      isDeleting
    ) {
      return
    }
    
    if (onClick) {
      onClick(movie)
    }
  }

  const handleDelete = async () => {
    if (!onDelete) return
    
    try {
      await onDelete(movie._id)
      setShowDeleteDialog(false)
    } catch (error) {
      console.error('Error deleting movie:', error)
    }
  }

  return (
    <>
      <div 
        className={`bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer relative ${
          isDeleting ? 'opacity-60 pointer-events-none' : ''
        }`}
        onClick={handleCardClick}
      >
        {/* Deleting Overlay */}
        {isDeleting && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30">
            <div className="bg-gray-900 rounded-lg p-4 flex items-center gap-3">
              <div className="w-5 h-5 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-white font-medium">Deleting...</span>
            </div>
          </div>
        )}

        {/* Desktop Action Menu */}
        {showActions && (
          <div className="menu-container absolute top-3 left-3 z-20" ref={menuRef}>
            <button
              onClick={(e) => {
                e.stopPropagation()
                setShowMenu(!showMenu)
              }}
              className="action-button p-2 bg-black bg-opacity-60 hover:bg-opacity-80 text-white rounded-full transition-all opacity-0 group-hover:opacity-100 backdrop-blur-sm"
              title="More actions"
            >
              <MoreVertical className="w-4 h-4" />
            </button>
            
            {/* Dropdown Menu */}
            {showMenu && (
              <div className="absolute top-full left-0 mt-2 bg-gray-900 border border-gray-700 rounded-lg shadow-xl py-2 min-w-40 z-30 animate-slide-up">
                <div className="px-3 py-1">
                  <p className="text-gray-400 text-xs font-medium uppercase tracking-wide">Actions</p>
                </div>
                <div className="border-t border-gray-700 my-1"></div>
                
                <Link
                  to={`/edit-movie/${movie._id}`}
                  className="action-button flex items-center gap-3 px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation()
                    setShowMenu(false)
                  }}
                >
                  <Edit className="w-4 h-4 text-blue-400" />
                  <span>Edit Movie</span>
                </Link>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setShowMenu(false)
                    onClick(movie)
                  }}
                  className="action-button w-full flex items-center gap-3 px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
                >
                  <Eye className="w-4 h-4 text-green-400" />
                  <span>View Details</span>
                </button>
                
                <div className="border-t border-gray-700 my-1"></div>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setShowMenu(false)
                    setShowDeleteDialog(true)
                  }}
                  className="action-button w-full flex items-center gap-3 px-4 py-2 text-red-400 hover:text-red-300 hover:bg-red-900 hover:bg-opacity-20 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Delete Movie</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* Movie Poster */}
        <div className="relative">
          <OptimizedImage
            src={optimizedPosterUrl()}
            alt={movie.title}
            className="w-full h-48 sm:h-64 lg:h-80 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Play Overlay on Hover */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
            <div className="transform scale-0 group-hover:scale-100 transition-transform duration-300">
              <Play className="text-white w-12 sm:w-16 h-12 sm:h-16 opacity-90" />
            </div>
          </div>
          
          {/* Rating Badge */}
          <div className={`absolute top-3 right-3 px-2 py-1 rounded-md font-semibold flex items-center gap-1 text-xs sm:text-sm backdrop-blur-sm ${
            rating.color === 'green' ? 'bg-green-500 bg-opacity-90 text-white' :
            rating.color === 'yellow' ? 'bg-yellow-500 bg-opacity-90 text-black' :
            rating.color === 'orange' ? 'bg-orange-500 bg-opacity-90 text-white' :
            rating.color === 'red' ? 'bg-red-500 bg-opacity-90 text-white' : 'bg-gray-500 bg-opacity-90 text-white'
          }`}>
            <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-current" />
            {rating.value}
          </div>

          {/* Quality Badges */}
          {movie.videoQuality && movie.videoQuality.length > 0 && (
            <div className="absolute bottom-3 left-3 flex gap-1">
              {movie.videoQuality.slice(0, 2).map((quality, index) => (
                <span 
                  key={index}
                  className="bg-blue-600 bg-opacity-90 text-white px-2 py-1 rounded text-xs font-medium backdrop-blur-sm"
                >
                  {quality}
                </span>
              ))}
              {movie.videoQuality.length > 2 && (
                <span className="bg-blue-600 bg-opacity-90 text-white px-2 py-1 rounded text-xs font-medium backdrop-blur-sm">
                  +{movie.videoQuality.length - 2}
                </span>
              )}
            </div>
          )}

          {/* Quick Action Buttons - Mobile */}
          {showActions && (
            <div className="md:hidden absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Link
                to={`/edit-movie/${movie._id}`}
                onClick={(e) => e.stopPropagation()}
                className="action-button p-2 bg-blue-600 bg-opacity-90 hover:bg-opacity-100 text-white rounded-full transition-all backdrop-blur-sm"
                title="Edit movie"
              >
                <Edit className="w-3 h-3" />
              </Link>
              
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setShowDeleteDialog(true)
                }}
                className="action-button p-2 bg-red-600 bg-opacity-90 hover:bg-opacity-100 text-white rounded-full transition-all backdrop-blur-sm"
                title="Delete movie"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>

        {/* Movie Info */}
        <div className="p-3 sm:p-4">
          {/* Title */}
          <h3 className="text-white text-sm sm:text-lg font-bold mb-2 line-clamp-1 group-hover:text-blue-400 transition-colors">
            {movie.title}
          </h3>
          
          {/* Genres */}
          <div className="flex flex-wrap gap-1 mb-2 sm:mb-3">
            {movie.genre && movie.genre.slice(0, 2).map((genre, index) => (
              <span 
                key={index} 
                className="bg-purple-600 bg-opacity-20 text-purple-300 border border-purple-500 border-opacity-50 px-2 py-1 rounded text-xs"
              >
                {genre}
              </span>
            ))}
            {movie.genre && movie.genre.length > 2 && (
              <span className="bg-purple-600 bg-opacity-20 text-purple-300 border border-purple-500 border-opacity-50 px-2 py-1 rounded text-xs">
                +{movie.genre.length - 2}
              </span>
            )}
          </div>

          {/* Director */}
          {movie.director && (
            <p className="text-gray-400 text-xs sm:text-sm mb-2 line-clamp-1">
              <span className="text-gray-500">Dir:</span> {movie.director}
            </p>
          )}

          {/* Language - Mobile only */}
          {movie.language && (
            <p className="text-gray-400 text-xs sm:text-sm mb-2 sm:mb-3 flex items-center gap-1">
              <span className="text-gray-500">Lang:</span> {movie.language}
            </p>
          )}

          {/* Story Preview - Hidden on mobile for space */}
          {movie.story && (
            <p className="text-gray-300 text-sm mb-3 line-clamp-2 hidden sm:block">
              {truncateText(movie.story, 60)}
            </p>
          )}

          {/* Bottom Info */}
          <div className="flex items-center justify-between text-xs sm:text-sm">
            <div className="flex items-center gap-1 sm:gap-2 text-green-400">
              <Download className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>{movie.videoQuality?.length || 0} formats</span>
            </div>
            
            {movie.createdAt ? (
              <div className="flex items-center gap-1 text-gray-500">
                <Calendar className="w-3 h-3" />
                <span>{new Date(movie.createdAt).getFullYear()}</span>
              </div>
            ) : (
              <div className="flex items-center gap-1 text-gray-500">
                <Clock className="w-3 h-3" />
                <span>New</span>
              </div>
            )}
          </div>
        </div>

        {/* Hover Effects Border */}
        <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-500 group-hover:border-opacity-30 rounded-xl transition-all duration-300 pointer-events-none"></div>
      </div>

      {/* Delete Confirmation Dialog */}
      <DeleteDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={handleDelete}
        title="Delete Movie"
        message="Are you sure you want to delete this movie? This action cannot be undone and will permanently remove all movie data."
        itemName={movie.title}
        loading={false}
      />
    </>
  )
}

// Optimized Compact Version for List View
export const MovieCardCompact = ({ movie, onClick, onDelete, showActions = true, isDeleting = false }) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const rating = formatRating(movie.imdbRating)
  
  const handleDelete = async () => {
    if (!onDelete) return
    
    try {
      await onDelete(movie._id)
      setShowDeleteDialog(false)
    } catch (error) {
      console.error('Error deleting movie:', error)
    }
  }

  const optimizedPosterUrl = useCallback(() => {
    const posterUrl = formatPosterUrl(movie.posterUrl, movie.title)
    
    // Smaller size for compact view
    if (posterUrl.includes('images.unsplash.com')) {
      return `${posterUrl}&w=200&h=300&fit=crop&auto=format&q=75`
    }
    
    return posterUrl
  }, [movie.posterUrl, movie.title])

  return (
    <>
      <div 
        className={`bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 group cursor-pointer relative ${
          isDeleting ? 'opacity-60 pointer-events-none' : ''
        }`}
        onClick={() => !isDeleting && onClick && onClick(movie)}
      >
        {/* Deleting Overlay */}
        {isDeleting && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
            <div className="bg-gray-900 rounded p-3 flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-white text-sm">Deleting...</span>
            </div>
          </div>
        )}

        <div className="flex">
          {/* Poster */}
          <div className="relative w-24 sm:w-32 flex-shrink-0">
            <OptimizedImage
              src={optimizedPosterUrl()}
              alt={movie.title}
              className="w-full h-32 sm:h-40 object-cover group-hover:scale-105 transition-transform duration-300"
              placeholder={
                <div className="text-center text-gray-500">
                  <div className="text-2xl mb-1">🎬</div>
                  <div className="text-xs px-1">Loading</div>
                </div>
              }
            />
            
            {/* Play Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
              <Play className="text-white w-6 h-6 sm:w-8 sm:h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </div>
          
          {/* Info Section */}
          <div className="flex-1 p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-white text-lg font-bold line-clamp-1 group-hover:text-blue-400 transition-colors flex-1 mr-2">
                  {movie.title}
                </h3>
                
                {/* Rating */}
                <div className={`px-2 py-1 rounded text-sm font-medium flex items-center gap-1 flex-shrink-0 ${
                  rating.color === 'green' ? 'bg-green-500 text-white' :
                  rating.color === 'yellow' ? 'bg-yellow-500 text-black' :
                  rating.color === 'orange' ? 'bg-orange-500 text-white' :
                  rating.color === 'red' ? 'bg-red-500 text-white' : 'bg-gray-500 text-white'
                }`}>
                  <Star className="w-3 h-3 fill-current" />
                  {rating.value}
                </div>
              </div>
              
              {/* Genres */}
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
              
              {/* Director */}
              {movie.director && (
                <p className="text-gray-400 text-sm mb-2 line-clamp-1">
                  <span className="text-gray-500">Director:</span> {movie.director}
                </p>
              )}
            </div>
            
            {/* Bottom Section */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-green-400 text-sm">
                <Download className="w-4 h-4" />
                <span>{movie.videoQuality?.length || 0} formats</span>
              </div>
              
              {/* Action Buttons */}
              {showActions && (
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Link
                    to={`/edit-movie/${movie._id}`}
                    onClick={(e) => e.stopPropagation()}
                    className="action-button p-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
                    title="Edit movie"
                  >
                    <Edit className="w-4 h-4" />
                  </Link>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setShowDeleteDialog(true)
                    }}
                    className="action-button p-2 bg-red-600 hover:bg-red-700 text-white rounded transition-colors"
                    title="Delete movie"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )}
              
              {/* Language */}
              {movie.language && !showActions && (
                <span className="text-gray-500 text-sm">{movie.language}</span>
              )}
            </div>
          </div>
        </div>

        {/* Hover Border Effect */}
        <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-500 group-hover:border-opacity-30 rounded-lg transition-all duration-300 pointer-events-none"></div>
      </div>

      {/* Delete Confirmation Dialog */}
      <DeleteDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={handleDelete}
        title="Delete Movie"
        message="Are you sure you want to delete this movie? This action cannot be undone."
        itemName={movie.title}
        loading={false}
      />
    </>
  )
}

export default MovieCard