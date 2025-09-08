import React from 'react'
import { Filter, X, ChevronDown } from 'lucide-react'

const MovieFilters = ({
  selectedGenre,
  onGenreChange,
  genres = [],
  sortBy = 'title',
  onSortChange,
  onClearFilters,
  showClearButton = true
}) => {
  const sortOptions = [
    { value: 'title', label: 'Title A-Z' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'year', label: 'Newest First' },
    { value: 'director', label: 'Director A-Z' }
  ]

  const hasActiveFilters = selectedGenre !== 'All' || sortBy !== 'title'

  return (
    <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
      {/* Filter Icon & Label */}
      <div className="flex items-center gap-2 text-gray-400">
        <Filter className="w-5 h-5" />
        <span className="text-sm font-medium">Filters:</span>
      </div>

      {/* Genre Filter */}
      <div className="relative">
        <select
          className="appearance-none bg-gray-800 text-white px-4 py-3 pr-10 rounded-lg border border-gray-700 focus:border-blue-500 outline-none min-w-40 cursor-pointer"
          value={selectedGenre}
          onChange={(e) => onGenreChange(e.target.value)}
        >
          {genres.map(genre => (
            <option key={genre} value={genre}>
              {genre === 'All' ? 'All Genres' : genre}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
      </div>

      {/* Sort Filter */}
      <div className="relative">
        <select
          className="appearance-none bg-gray-800 text-white px-4 py-3 pr-10 rounded-lg border border-gray-700 focus:border-blue-500 outline-none min-w-40 cursor-pointer"
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
        >
          {sortOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
      </div>

      {/* Clear Filters Button */}
      {showClearButton && hasActiveFilters && (
        <button
          onClick={onClearFilters}
          className="flex items-center gap-2 px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors text-sm font-medium"
        >
          <X className="w-4 h-4" />
          Clear Filters
        </button>
      )}

      {/* Active Filters Indicator */}
      {hasActiveFilters && (
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-400">Active filters:</span>
          <div className="flex gap-2">
            {selectedGenre !== 'All' && (
              <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs">
                {selectedGenre}
              </span>
            )}
            {sortBy !== 'title' && (
              <span className="bg-purple-600 text-white px-2 py-1 rounded text-xs">
                {sortOptions.find(opt => opt.value === sortBy)?.label}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

// Advanced Filters Component
export const AdvancedFilters = ({
  selectedGenre,
  onGenreChange,
  genres = [],
  selectedRating,
  onRatingChange,
  selectedYear,
  onYearChange,
  selectedLanguage,
  onLanguageChange,
  languages = [],
  onClearAll
}) => {
  const [isExpanded, setIsExpanded] = React.useState(false)

  const ratingOptions = [
    { value: 'all', label: 'Any Rating' },
    { value: '9+', label: '9.0+ Excellent' },
    { value: '8+', label: '8.0+ Very Good' },
    { value: '7+', label: '7.0+ Good' },
    { value: '6+', label: '6.0+ Above Average' }
  ]

  const yearOptions = [
    { value: 'all', label: 'Any Year' },
    { value: '2024', label: '2024' },
    { value: '2023', label: '2023' },
    { value: '2022', label: '2022' },
    { value: '2021', label: '2021' },
    { value: '2020-2019', label: '2020-2019' },
    { value: '2010s', label: '2010-2019' },
    { value: '2000s', label: '2000-2009' },
    { value: 'older', label: 'Before 2000' }
  ]

  const hasActiveFilters = 
    selectedGenre !== 'all' || 
    selectedRating !== 'all' || 
    selectedYear !== 'all' || 
    selectedLanguage !== 'all'

  return (
    <div className="bg-gray-800 rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-semibold flex items-center gap-2">
          <Filter className="w-5 h-5" />
          Advanced Filters
        </h3>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-blue-400 hover:text-blue-300 transition-colors"
        >
          {isExpanded ? 'Hide' : 'Show'} Filters
        </button>
      </div>

      {isExpanded && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Genre */}
            <div>
              <label className="block text-gray-400 text-sm mb-2">Genre</label>
              <select
                className="w-full bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-blue-500 outline-none"
                value={selectedGenre}
                onChange={(e) => onGenreChange(e.target.value)}
              >
                <option value="all">All Genres</option>
                {genres.filter(g => g !== 'All').map(genre => (
                  <option key={genre} value={genre}>{genre}</option>
                ))}
              </select>
            </div>

            {/* Rating */}
            <div>
              <label className="block text-gray-400 text-sm mb-2">IMDB Rating</label>
              <select
                className="w-full bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-blue-500 outline-none"
                value={selectedRating}
                onChange={(e) => onRatingChange(e.target.value)}
              >
                {ratingOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Year */}
            <div>
              <label className="block text-gray-400 text-sm mb-2">Release Year</label>
              <select
                className="w-full bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-blue-500 outline-none"
                value={selectedYear}
                onChange={(e) => onYearChange(e.target.value)}
              >
                {yearOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Language */}
            <div>
              <label className="block text-gray-400 text-sm mb-2">Language</label>
              <select
                className="w-full bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-blue-500 outline-none"
                value={selectedLanguage}
                onChange={(e) => onLanguageChange(e.target.value)}
              >
                <option value="all">All Languages</option>
                {languages.map(language => (
                  <option key={language} value={language}>{language}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Clear All Button */}
          {hasActiveFilters && (
            <div className="flex justify-end">
              <button
                onClick={onClearAll}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded transition-colors text-sm"
              >
                <X className="w-4 h-4" />
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default MovieFilters