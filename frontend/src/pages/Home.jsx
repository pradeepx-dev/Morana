import React, { useState, useMemo } from 'react'
import { useMovies } from '../hooks/useMovies'
import { useSearch } from '../hooks/useSearch'
import { AdvancedSearchBar } from '../components/common/SearchBar'
import MovieGrid, { FeaturedMovies, TrendingMovies } from '../components/movie/MovieGrid'
import MovieModal from '../components/movie/MovieModal'
import LoadingSpinner, { MovieGridSkeleton } from '../components/common/LoadingSpinner'
import { sortMovies } from '../utils/helpers'

const Home = () => {
  const { movies, loading, error } = useMovies()
  const {
    searchTerm,
    setSearchTerm,
    selectedGenre,
    setSelectedGenre,
    genres,
    filteredData,
    clearSearch,
    hasActiveFilters
  } = useSearch(movies)

  const [viewMode, setViewMode] = useState('grid')
  const [sortBy, setSortBy] = useState('title')
  const [selectedMovie, setSelectedMovie] = useState(null)

  // Sort the filtered movies
  const sortedMovies = useMemo(() => {
    return sortMovies(filteredData, sortBy)
  }, [filteredData, sortBy])

  // Get featured movies (highest rated)
  const featuredMovies = useMemo(() => {
    return movies
      .filter(movie => parseFloat(movie.imdbRating || 0) >= 8.0)
      .slice(0, 4)
  }, [movies])

  // Get trending movies (recently added)
  const trendingMovies = useMemo(() => {
    return movies
      .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
      .slice(0, 6)
  }, [movies])

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie)
  }

  const handleCloseModal = () => {
    setSelectedMovie(null)
  }

  const handleClearAll = () => {
    clearSearch()
    setSortBy('title')
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-20">
          <div className="text-red-400 text-xl mb-4">Error Loading Movies</div>
          <p className="text-gray-400 mb-4">{error}</p>
          <p className="text-gray-500 text-sm">Showing sample movies instead</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">

      {/* Search and Filter Section */}
      <section className="mb-8">
        <AdvancedSearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedGenre={selectedGenre}
          onGenreChange={setSelectedGenre}
          genres={genres}
          sortBy={sortBy}
          onSortChange={setSortBy}
          onClearAll={handleClearAll}
        />
      </section>

      {/* Results Info */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-white text-xl">
          {hasActiveFilters ? (
            <>
              {searchTerm && (
                <>Search results for <span className="text-blue-400">"{searchTerm}"</span></>
              )}
              {selectedGenre !== 'All' && (
                <> in <span className="text-purple-400">{selectedGenre}</span></>
              )}
            </>
          ) : (
            'All Movies'
          )}
          <span className="text-gray-400 ml-2 text-base">
            ({sortedMovies.length} {sortedMovies.length === 1 ? 'movie' : 'movies'})
          </span>
        </h2>
      </div>

      {/* Movies Grid */}
      {loading ? (
        <MovieGridSkeleton count={8} />
      ) : (
        <MovieGrid
          movies={sortedMovies}
          onMovieClick={handleMovieClick}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />
      )}

      {/* No Results */}
      {!loading && sortedMovies.length === 0 && hasActiveFilters && (
        <div className="text-center py-20">
          <div className="max-w-md mx-auto">
            <div className="text-gray-400 text-xl mb-4">No movies found</div>
            <p className="text-gray-500 mb-6">
              We couldn't find any movies matching your search criteria.
            </p>
            <button
              onClick={handleClearAll}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        </div>
      )}

      {/* Movie Modal */}
      <MovieModal
        movie={selectedMovie}
        isOpen={!!selectedMovie}
        onClose={handleCloseModal}
      />
    </div>
  )
}

export default Home