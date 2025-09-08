import { useState, useEffect } from 'react'
import { movieService } from '../services/movieService'

export const useMovies = () => {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchMovies = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await movieService.getAllMovies()
      setMovies(data)
    } catch (err) {
      setError(err.message)
      console.error('Error fetching movies:', err)
      
      // Fallback to mock data if API fails
      setMovies([
        {
          _id: '1',
          title: 'The Dark Knight',
          posterUrl: 'https://images.unsplash.com/photo-1489599478391-b8c23f6f15a6?w=400&h=600&fit=crop',
          imdbRating: '9.0',
          genre: ['Action', 'Crime', 'Drama'],
          director: 'Christopher Nolan',
          cast: ['Christian Bale', 'Heath Ledger', 'Aaron Eckhart'],
          language: 'English',
          videoQuality: ['1080p', '720p', '480p'],
          story: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, the caped crusader Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
          downloadLinks: { '1080p': '#', '720p': '#', '480p': '#' }
        },
        {
          _id: '2',
          title: 'Inception',
          posterUrl: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=600&fit=crop',
          imdbRating: '8.8',
          genre: ['Action', 'Sci-Fi', 'Thriller'],
          director: 'Christopher Nolan',
          cast: ['Leonardo DiCaprio', 'Marion Cotillard', 'Tom Hardy'],
          language: 'English',
          videoQuality: ['1080p', '720p', '480p'],
          story: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
          downloadLinks: { '1080p': '#', '720p': '#', '480p': '#' }
        },
        {
          _id: '3',
          title: 'Interstellar',
          posterUrl: 'https://images.unsplash.com/photo-1446776856116-11bb7b57dafa?w=400&h=600&fit=crop',
          imdbRating: '8.6',
          genre: ['Adventure', 'Drama', 'Sci-Fi'],
          director: 'Christopher Nolan',
          cast: ['Matthew McConaughey', 'Anne Hathaway', 'Jessica Chastain'],
          language: 'English',
          videoQuality: ['1080p', '720p', '480p'],
          story: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
          downloadLinks: { '1080p': '#', '720p': '#', '480p': '#' }
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMovies()
  }, [])

  const refetch = () => {
    fetchMovies()
  }

  return {
    movies,
    loading,
    error,
    refetch
  }
}