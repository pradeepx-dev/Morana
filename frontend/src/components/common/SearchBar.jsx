import React from 'react'
import { Search, X, Filter } from 'lucide-react'

const SearchBar = ({ 
  searchTerm, 
  onSearchChange, 
  onClearSearch, 
  placeholder = "Search movies...",
  showClearButton = true 
}) => {
  return (
    <div className="relative flex-1">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 z-10" />
        <input
          type="text"
          placeholder={placeholder}
          className="w-full bg-gray-800 text-white pl-12 pr-12 py-3 rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all duration-200 placeholder-gray-400"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        {showClearButton && searchTerm && (
          <button
            onClick={onClearSearch}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
            aria-label="Clear search"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
      
      {/* Search suggestions could be added here */}
      {searchTerm && (
        <div className="absolute top-full left-0 right-0 mt-1 text-xs text-gray-400 px-4">
          Press Enter to search or keep typing...
        </div>
      )}
    </div>
  )
}

// Enhanced search bar with filters
export const AdvancedSearchBar = ({ 
  searchTerm, 
  onSearchChange, 
  selectedGenre,
  onGenreChange,
  genres = [],
  sortBy,
  onSortChange,
  onClearAll 
}) => {
  const sortOptions = [
    { value: 'year', label: 'Newest First' },
    { value: 'title', label: 'Title A-Z' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'director', label: 'Director A-Z' }
  ]

  const hasActiveFilters = searchTerm !== '' || selectedGenre !== 'All' || sortBy !== 'title'

  return (
    <div className="space-y-4">
      {/* Main Search Bar */}
      <SearchBar 
        searchTerm={searchTerm}
        onSearchChange={onSearchChange}
        onClearSearch={() => onSearchChange('')}
      />
      
      {/* Filters Row */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Genre Filter */}
        <select
          className="bg-gray-800 text-white px-4 py-3 rounded-lg border border-gray-700 focus:border-blue-500 outline-none min-w-40"
          value={selectedGenre}
          onChange={(e) => onGenreChange(e.target.value)}
        >
          {genres.map(genre => (
            <option key={genre} value={genre}>{genre}</option>
          ))}
        </select>
        
        {/* Sort Filter */}
        <select
          className="bg-gray-800 text-white px-4 py-3 rounded-lg border border-gray-700 focus:border-blue-500 outline-none min-w-40"
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
        >
          {sortOptions.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
        
        {/* Clear All Button */}
        {hasActiveFilters && (
          <button
            onClick={onClearAll}
            className="px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap"
          >
            <X className="w-4 h-4" />
            Clear All
          </button>
        )}
      </div>
    </div>
  )
}

export default SearchBar