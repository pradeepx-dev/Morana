import React from 'react'
import MovieCard, { MovieCardCompact } from './MovieCard'
import { Grid, List } from 'lucide-react'

const MovieGrid = ({ 
  movies, 
  onMovieClick, 
  viewMode = 'grid',
  onViewModeChange,
  loading = false 
}) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }, (_, index) => (
          <MovieCardSkeleton key={index} />
        ))}
      </div>
    )
  }

  if (!movies || movies.length === 0) {
    return <EmptyState />
  }

  return (
    <div>
      {/* View Mode Toggle */}
      <div className="flex items-center justify-between mb-6">
        <div className="text-white">
          <span className="text-xl font-semibold">
            {movies.length} {movies.length === 1 ? 'Movie' : 'Movies'}
          </span>
        </div>
        
        {onViewModeChange && (
          <div className="flex bg-gray-800 rounded-lg border border-gray-700">
            <button
              className={`p-3 rounded-l-lg transition-colors ${
                viewMode === 'grid' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
              onClick={() => onViewModeChange('grid')}
              title="Grid view"
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              className={`p-3 rounded-r-lg transition-colors ${
                viewMode === 'list' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
              onClick={() => onViewModeChange('list')}
              title="List view"
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      {/* Movies Grid/List */}
      <div className={`${
        viewMode === 'grid' 
          ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' 
          : 'space-y-4'
      }`}>
        {movies.map(movie => (
          viewMode === 'grid' ? (
            <MovieCard 
              key={movie._id} 
              movie={movie} 
              onClick={onMovieClick}
            />
          ) : (
            <MovieCardCompact 
              key={movie._id} 
              movie={movie} 
              onClick={onMovieClick}
            />
          )
        ))}
      </div>
    </div>
  )
}

// Skeleton loader for movie cards
const MovieCardSkeleton = () => (
  <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg animate-pulse">
    <div className="w-full h-64 sm:h-80 bg-gray-700"></div>
    <div className="p-4 space-y-3">
      <div className="h-6 bg-gray-700 rounded w-3/4"></div>
      <div className="flex space-x-2">
        <div className="h-6 bg-gray-700 rounded w-16"></div>
        <div className="h-6 bg-gray-700 rounded w-20"></div>
      </div>
      <div className="h-4 bg-gray-700 rounded w-1/2"></div>
      <div className="h-4 bg-gray-700 rounded w-full"></div>
    </div>
  </div>
)

// Empty state component
const EmptyState = () => (
  <div className="text-center py-20">
    <div className="max-w-md mx-auto">
      <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
        <Grid className="w-12 h-12 text-gray-600" />
      </div>
      <h3 className="text-gray-400 text-xl mb-4">No movies found</h3>
      <p className="text-gray-500 mb-6">
        We couldn't find any movies matching your criteria. Try adjusting your search or filter settings.
      </p>
      <div className="space-y-2 text-gray-600 text-sm">
        <p>• Check your spelling</p>
        <p>• Try different keywords</p>
        <p>• Clear your filters</p>
      </div>
    </div>
  </div>
)

// Featured movies section
export const FeaturedMovies = ({ movies, onMovieClick, title = "Featured Movies" }) => {
  if (!movies || movies.length === 0) return null

  return (
    <section className="mb-12">
      <h2 className="text-white text-2xl font-bold mb-6">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {movies.slice(0, 4).map(movie => (
          <MovieCard 
            key={movie._id} 
            movie={movie} 
            onClick={onMovieClick}
          />
        ))}
      </div>
    </section>
  )
}

// Trending movies carousel
export const TrendingMovies = ({ movies, onMovieClick }) => {
  if (!movies || movies.length === 0) return null

  return (
    <section className="mb-12">
      <h2 className="text-white text-2xl font-bold mb-6">Trending Now</h2>
      <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
        {movies.map(movie => (
          <div key={movie._id} className="flex-shrink-0 w-64">
            <MovieCard movie={movie} onClick={onMovieClick} />
          </div>
        ))}
      </div>
    </section>
  )
}

export default MovieGrid