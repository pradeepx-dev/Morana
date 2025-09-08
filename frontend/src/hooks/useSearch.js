import { useState, useMemo } from 'react'

export const useSearch = (data = []) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedGenre, setSelectedGenre] = useState('All')

  // Get unique genres from movies
  const genres = useMemo(() => {
    const allGenres = data.flatMap(item => item.genre || [])
    return ['All', ...new Set(allGenres)]
  }, [data])

  // Filter movies based on search term and genre
  const filteredData = useMemo(() => {
    return data.filter(item => {
      const matchesSearch = item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.director?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.cast?.some(actor => actor.toLowerCase().includes(searchTerm.toLowerCase()))
      
      const matchesGenre = selectedGenre === 'All' || item.genre?.includes(selectedGenre)
      
      return matchesSearch && matchesGenre
    })
  }, [data, searchTerm, selectedGenre])

  const clearSearch = () => {
    setSearchTerm('')
    setSelectedGenre('All')
  }

  return {
    searchTerm,
    setSearchTerm,
    selectedGenre,
    setSelectedGenre,
    genres,
    filteredData,
    clearSearch,
    hasActiveFilters: searchTerm !== '' || selectedGenre !== 'All'
  }
}