import { RATING_CONFIG } from './constants'

// Format movie rating with appropriate styling
export const formatRating = (rating) => {
  const numRating = parseFloat(rating)
  if (isNaN(numRating)) return { value: 'N/A', color: 'gray' }
  
  let color = 'gray'
  if (numRating >= RATING_CONFIG.excellent) color = 'green'
  else if (numRating >= RATING_CONFIG.good) color = 'yellow'
  else if (numRating >= RATING_CONFIG.average) color = 'orange'
  else color = 'red'
  
  return { value: numRating.toFixed(1), color }
}

// Truncate text to specified length
export const truncateText = (text, maxLength = 100) => {
  if (!text) return ''
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}

// Format array to comma-separated string
export const formatArray = (arr, maxItems = 3) => {
  if (!Array.isArray(arr) || arr.length === 0) return 'N/A'
  
  if (arr.length <= maxItems) {
    return arr.join(', ')
  }
  
  return arr.slice(0, maxItems).join(', ') + ` and ${arr.length - maxItems} more`
}

// Debounce function for search
export const debounce = (func, wait) => {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Check if image URL is valid
export const isValidImageUrl = (url) => {
  if (!url) return false
  
  // Basic URL validation
  const urlPattern = /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)(\?.*)?$/i
  return urlPattern.test(url)
}

// Generate placeholder image URL
export const getPlaceholderImage = (width = 400, height = 600, text = 'Movie') => {
  return `https://via.placeholder.com/${width}x${height}/1f2937/ffffff?text=${encodeURIComponent(text)}`
}

// Format movie poster URL with fallback
export const formatPosterUrl = (url, title = 'Movie') => {
  if (isValidImageUrl(url)) return url
  return getPlaceholderImage(400, 600, title)
}

// Calculate time ago
export const timeAgo = (date) => {
  const now = new Date()
  const diffTime = Math.abs(now - new Date(date))
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
  if (diffDays === 1) return '1 day ago'
  if (diffDays < 7) return `${diffDays} days ago`
  if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`
  if (diffDays < 365) return `${Math.ceil(diffDays / 30)} months ago`
  return `${Math.ceil(diffDays / 365)} years ago`
}

// Validate movie data
export const validateMovieData = (movie) => {
  const errors = []
  
  if (!movie.title || movie.title.trim().length === 0) {
    errors.push('Title is required')
  }
  
  if (!movie.director || movie.director.trim().length === 0) {
    errors.push('Director is required')
  }
  
  if (!movie.genre || !Array.isArray(movie.genre) || movie.genre.length === 0) {
    errors.push('At least one genre is required')
  }
  
  if (movie.imdbRating && (isNaN(parseFloat(movie.imdbRating)) || parseFloat(movie.imdbRating) < 0 || parseFloat(movie.imdbRating) > 10)) {
    errors.push('IMDB rating must be between 0 and 10')
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

// Sort movies by different criteria
export const sortMovies = (movies, sortBy = 'title') => {
  const moviesCopy = [...movies]
  
  switch (sortBy) {
    case 'title':
      return moviesCopy.sort((a, b) => a.title.localeCompare(b.title))
    case 'rating':
      return moviesCopy.sort((a, b) => parseFloat(b.imdbRating || 0) - parseFloat(a.imdbRating || 0))
    case 'year':
      return moviesCopy.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
    case 'director':
      return moviesCopy.sort((a, b) => a.director.localeCompare(b.director))
    default:
      return moviesCopy
  }
}

// Generate movie URL slug
export const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
}