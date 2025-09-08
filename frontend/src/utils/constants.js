// App Configuration
export const APP_CONFIG = {
  name: 'MORANO',
  tagline: 'Premium Movie Experience',
  version: '1.0.0'
}

// API Configuration
export const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  timeout: 10000,
  retryAttempts: 3
}

// UI Constants
export const UI_CONFIG = {
  itemsPerPage: 20,
  maxMovieCardsPerRow: 4,
  searchDebounceTime: 300,
  animationDuration: 300
}

// Movie Quality Options
export const QUALITY_OPTIONS = ['1080p', '720p', '480p', '360p']

// Genre List (common genres)
export const COMMON_GENRES = [
  'Action',
  'Adventure',
  'Animation',
  'Comedy',
  'Crime',
  'Documentary',
  'Drama',
  'Family',
  'Fantasy',
  'Horror',
  'Musical',
  'Mystery',
  'Romance',
  'Sci-Fi',
  'Thriller',
  'War',
  'Western'
]

// Rating Thresholds
export const RATING_CONFIG = {
  excellent: 8.5,
  good: 7.0,
  average: 5.5,
  poor: 0
}

// Breakpoints for responsive design
export const BREAKPOINTS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px'
}

// Error Messages
export const ERROR_MESSAGES = {
  network: 'Network error. Please check your connection.',
  notFound: 'Movie not found.',
  serverError: 'Server error. Please try again later.',
  generic: 'Something went wrong. Please try again.'
}

// Success Messages
export const SUCCESS_MESSAGES = {
  movieAdded: 'Movie added successfully!',
  movieUpdated: 'Movie updated successfully!',
  movieDeleted: 'Movie deleted successfully!'
}