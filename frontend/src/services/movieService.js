import api from './api'

export const movieService = {
  // Get all movies
  getAllMovies: async () => {
    try {
      const response = await api.get('/movies')
      return response.data
    } catch (error) {
      throw new Error(`Failed to fetch movies: ${error.message}`)
    }
  },

  // Get single movie by ID
  getMovieById: async (id) => {
    try {
      const response = await api.get(`/movies/${id}`)
      return response.data
    } catch (error) {
      throw new Error(`Failed to fetch movie: ${error.message}`)
    }
  },

  // Add new movie
  addMovie: async (movieData) => {
    try {
      const response = await api.post('/movies', movieData)
      return response.data
    } catch (error) {
      throw new Error(`Failed to add movie: ${error.message}`)
    }
  },

  // Update movie
  updateMovie: async (id, movieData) => {
    try {
      const response = await api.put(`/movies/${id}`, movieData)
      return response.data
    } catch (error) {
      throw new Error(`Failed to update movie: ${error.message}`)
    }
  },

  // Delete movie
  deleteMovie: async (id) => {
    try {
      const response = await api.delete(`/movies/${id}`)
      return response.data
    } catch (error) {
      throw new Error(`Failed to delete movie: ${error.message}`)
    }
  },

  // Search movies
  searchMovies: async (query) => {
    try {
      const response = await api.get(`/movies?search=${encodeURIComponent(query)}`)
      return response.data
    } catch (error) {
      throw new Error(`Failed to search movies: ${error.message}`)
    }
  }
}