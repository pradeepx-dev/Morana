import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Save, Plus, X, Upload, Eye, AlertCircle, CheckCircle } from 'lucide-react'
import { movieService } from '../services/movieService'
import { validateMovieData, isValidImageUrl, getPlaceholderImage } from '../utils/helpers'
import { COMMON_GENRES, QUALITY_OPTIONS } from '../utils/constants'
import LoadingSpinner from '../components/common/LoadingSpinner'

const AddMovie = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [successMessage, setSuccessMessage] = useState('')
  const [previewMode, setPreviewMode] = useState(false)

  const [formData, setFormData] = useState({
    title: '',
    posterUrl: '',
    imdbRating: '',
    genre: [],
    director: '',
    cast: [],
    language: '',
    videoQuality: [],
    story: '',
    downloadLinks: {
      '1080p': '',
      '720p': '',
      '480p': ''
    }
  })

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: null
      }))
    }
  }

  const handleArrayInput = (field, value) => {
    const array = value.split(',').map(item => item.trim()).filter(item => item)
    setFormData(prev => ({
      ...prev,
      [field]: array
    }))
  }

  const handleGenreToggle = (genre) => {
    setFormData(prev => ({
      ...prev,
      genre: prev.genre.includes(genre)
        ? prev.genre.filter(g => g !== genre)
        : [...prev.genre, genre]
    }))
  }

  const handleQualityToggle = (quality) => {
    setFormData(prev => ({
      ...prev,
      videoQuality: prev.videoQuality.includes(quality)
        ? prev.videoQuality.filter(q => q !== quality)
        : [...prev.videoQuality, quality]
    }))
  }

  const handleDownloadLinkChange = (quality, url) => {
    setFormData(prev => ({
      ...prev,
      downloadLinks: {
        ...prev.downloadLinks,
        [quality]: url
      }
    }))
  }

  const validateForm = () => {
    const validation = validateMovieData(formData)
    const newErrors = {}

    if (!validation.isValid) {
      validation.errors.forEach(error => {
        if (error.includes('Title')) newErrors.title = error
        if (error.includes('Director')) newErrors.director = error
        if (error.includes('genre')) newErrors.genre = error
        if (error.includes('IMDB')) newErrors.imdbRating = error
      })
    }

    // Additional validations
    if (formData.posterUrl && !isValidImageUrl(formData.posterUrl)) {
      newErrors.posterUrl = 'Please enter a valid image URL'
    }

    if (formData.story && formData.story.length < 10) {
      newErrors.story = 'Story should be at least 10 characters long'
    }

    if (formData.cast.length === 0) {
      newErrors.cast = 'Please add at least one cast member'
    }

    if (formData.videoQuality.length === 0) {
      newErrors.videoQuality = 'Please select at least one video quality'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    try {
      setLoading(true)
      setSuccessMessage('')
      
      // Clean up download links - remove empty ones
      const cleanDownloadLinks = Object.fromEntries(
        Object.entries(formData.downloadLinks).filter(([_, url]) => url.trim() !== '')
      )

      const movieData = {
        ...formData,
        downloadLinks: cleanDownloadLinks,
        imdbRating: formData.imdbRating || 'N/A'
      }

      await movieService.addMovie(movieData)
      setSuccessMessage('Movie added successfully!')
      
      setTimeout(() => {
        navigate('/')
      }, 2000)
      
    } catch (error) {
      setErrors({
        submit: `Failed to add movie: ${error.message}`
      })
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setFormData({
      title: '',
      posterUrl: '',
      imdbRating: '',
      genre: [],
      director: '',
      cast: [],
      language: '',
      videoQuality: [],
      story: '',
      downloadLinks: {
        '1080p': '',
        '720p': '',
        '480p': ''
      }
    })
    setErrors({})
    setSuccessMessage('')
  }

  if (previewMode) {
    return <MoviePreview movie={formData} onBack={() => setPreviewMode(false)} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link 
              to="/" 
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Movies
            </Link>
            <div className="h-6 w-px bg-gray-600"></div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Add New Movie</h1>
          </div>
          
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setPreviewMode(true)}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
            >
              <Eye className="w-4 h-4" />
              Preview
            </button>
          </div>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="mb-6 p-4 bg-green-600 bg-opacity-20 border border-green-600 rounded-lg flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <span className="text-green-400">{successMessage}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Basic Information */}
              <div className="bg-gray-800 rounded-xl p-6">
                <h2 className="text-xl font-semibold text-white mb-4">Basic Information</h2>
                
                <div className="space-y-4">
                  {/* Title */}
                  <div>
                    <label className="block text-gray-300 font-medium mb-2">
                      Movie Title <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      className={`w-full px-4 py-3 bg-gray-700 text-white rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.title ? 'border-red-500' : 'border-gray-600'
                      }`}
                      placeholder="Enter movie title..."
                    />
                    {errors.title && (
                      <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.title}
                      </p>
                    )}
                  </div>

                  {/* Director */}
                  <div>
                    <label className="block text-gray-300 font-medium mb-2">
                      Director <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.director}
                      onChange={(e) => handleInputChange('director', e.target.value)}
                      className={`w-full px-4 py-3 bg-gray-700 text-white rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.director ? 'border-red-500' : 'border-gray-600'
                      }`}
                      placeholder="Enter director name..."
                    />
                    {errors.director && (
                      <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.director}
                      </p>
                    )}
                  </div>

                  {/* IMDB Rating and Language */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-300 font-medium mb-2">IMDB Rating</label>
                      <input
                        type="number"
                        step="0.1"
                        min="0"
                        max="10"
                        value={formData.imdbRating}
                        onChange={(e) => handleInputChange('imdbRating', e.target.value)}
                        className={`w-full px-4 py-3 bg-gray-700 text-white rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.imdbRating ? 'border-red-500' : 'border-gray-600'
                        }`}
                        placeholder="0.0 - 10.0"
                      />
                      {errors.imdbRating && (
                        <p className="mt-1 text-sm text-red-400">{errors.imdbRating}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-gray-300 font-medium mb-2">Language</label>
                      <input
                        type="text"
                        value={formData.language}
                        onChange={(e) => handleInputChange('language', e.target.value)}
                        className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g., English, Hindi, Spanish"
                      />
                    </div>
                  </div>

                  {/* Poster URL */}
                  <div>
                    <label className="block text-gray-300 font-medium mb-2">Poster URL</label>
                    <input
                      type="url"
                      value={formData.posterUrl}
                      onChange={(e) => handleInputChange('posterUrl', e.target.value)}
                      className={`w-full px-4 py-3 bg-gray-700 text-white rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.posterUrl ? 'border-red-500' : 'border-gray-600'
                      }`}
                      placeholder="https://example.com/poster.jpg"
                    />
                    {errors.posterUrl && (
                      <p className="mt-1 text-sm text-red-400">{errors.posterUrl}</p>
                    )}
                    <p className="mt-1 text-sm text-gray-400">
                      Enter a direct link to the movie poster image
                    </p>
                  </div>
                </div>
              </div>

              {/* Genres */}
              <div className="bg-gray-800 rounded-xl p-6">
                <h2 className="text-xl font-semibold text-white mb-4">
                  Genres <span className="text-red-400">*</span>
                </h2>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {COMMON_GENRES.map(genre => (
                    <button
                      key={genre}
                      type="button"
                      onClick={() => handleGenreToggle(genre)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        formData.genre.includes(genre)
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      {genre}
                    </button>
                  ))}
                </div>
                
                {errors.genre && (
                  <p className="mt-3 text-sm text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.genre}
                  </p>
                )}
                
                {formData.genre.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-400 mb-2">Selected genres:</p>
                    <div className="flex flex-wrap gap-2">
                      {formData.genre.map(genre => (
                        <span 
                          key={genre}
                          className="bg-blue-600 text-white px-2 py-1 rounded text-sm flex items-center gap-1"
                        >
                          {genre}
                          <button
                            type="button"
                            onClick={() => handleGenreToggle(genre)}
                            className="hover:bg-blue-700 rounded"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Cast */}
              <div className="bg-gray-800 rounded-xl p-6">
                <h2 className="text-xl font-semibold text-white mb-4">
                  Cast <span className="text-red-400">*</span>
                </h2>
                
                <textarea
                  value={formData.cast.join(', ')}
                  onChange={(e) => handleArrayInput('cast', e.target.value)}
                  className={`w-full px-4 py-3 bg-gray-700 text-white rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${
                    errors.cast ? 'border-red-500' : 'border-gray-600'
                  }`}
                  rows={3}
                  placeholder="Enter cast names separated by commas (e.g., Robert Downey Jr., Chris Evans, Scarlett Johansson)"
                />
                {errors.cast && (
                  <p className="mt-1 text-sm text-red-400">{errors.cast}</p>
                )}
                <p className="mt-1 text-sm text-gray-400">
                  Separate multiple cast members with commas
                </p>
              </div>

              {/* Story */}
              <div className="bg-gray-800 rounded-xl p-6">
                <h2 className="text-xl font-semibold text-white mb-4">Story/Plot</h2>
                
                <textarea
                  value={formData.story}
                  onChange={(e) => handleInputChange('story', e.target.value)}
                  className={`w-full px-4 py-3 bg-gray-700 text-white rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${
                    errors.story ? 'border-red-500' : 'border-gray-600'
                  }`}
                  rows={5}
                  placeholder="Enter the movie plot/story..."
                />
                {errors.story && (
                  <p className="mt-1 text-sm text-red-400">{errors.story}</p>
                )}
                <div className="mt-1 flex justify-between text-sm text-gray-400">
                  <span>Provide a brief description of the movie's plot</span>
                  <span>{formData.story.length} characters</span>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Preview */}
              {formData.title && (
                <div className="bg-gray-800 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Preview</h3>
                  <div className="space-y-3">
                    {formData.posterUrl && (
                      <img 
                        src={formData.posterUrl}
                        alt="Movie poster preview"
                        className="w-full h-40 object-cover rounded-lg"
                        onError={(e) => {
                          e.target.src = getPlaceholderImage(400, 300, formData.title)
                        }}
                      />
                    )}
                    <h4 className="text-white font-medium">{formData.title}</h4>
                    {formData.director && (
                      <p className="text-gray-400 text-sm">Directed by {formData.director}</p>
                    )}
                    {formData.imdbRating && (
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-500">★</span>
                        <span className="text-white">{formData.imdbRating}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Video Quality */}
              <div className="bg-gray-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Video Quality <span className="text-red-400">*</span>
                </h3>
                
                <div className="space-y-3">
                  {QUALITY_OPTIONS.map(quality => (
                    <label key={quality} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.videoQuality.includes(quality)}
                        onChange={() => handleQualityToggle(quality)}
                        className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                      />
                      <span className="text-gray-300">{quality}</span>
                    </label>
                  ))}
                </div>
                
                {errors.videoQuality && (
                  <p className="mt-3 text-sm text-red-400">{errors.videoQuality}</p>
                )}
              </div>

              {/* Download Links */}
              <div className="bg-gray-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Download Links</h3>
                
                <div className="space-y-3">
                  {Object.keys(formData.downloadLinks).map(quality => (
                    <div key={quality}>
                      <label className="block text-gray-300 text-sm mb-1">{quality} Link</label>
                      <input
                        type="url"
                        value={formData.downloadLinks[quality]}
                        onChange={(e) => handleDownloadLinkChange(quality, e.target.value)}
                        className="w-full px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                        placeholder={`${quality} download link...`}
                      />
                    </div>
                  ))}
                </div>
                
                <p className="mt-3 text-xs text-gray-400">
                  Download links are optional but recommended
                </p>
              </div>

              {/* Form Actions */}
              <div className="bg-gray-800 rounded-xl p-6">
                <div className="space-y-3">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white rounded-lg transition-colors font-medium"
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Adding Movie...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        Add Movie
                      </>
                    )}
                  </button>
                  
                  <button
                    type="button"
                    onClick={handleReset}
                    className="w-full px-4 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors font-medium"
                  >
                    Reset Form
                  </button>
                </div>
                
                {errors.submit && (
                  <p className="mt-3 text-sm text-red-400">{errors.submit}</p>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

// Movie Preview Component
const MoviePreview = ({ movie, onBack }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Form
          </button>
          <h1 className="text-2xl font-bold text-white">Movie Preview</h1>
        </div>

        <div className="max-w-4xl mx-auto bg-gray-800 rounded-xl overflow-hidden">
          <div className="relative">
            <img 
              src={movie.posterUrl || getPlaceholderImage(800, 400, movie.title)}
              alt={movie.title}
              className="w-full h-64 sm:h-80 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent"></div>
            <div className="absolute bottom-4 left-4 right-4">
              <h1 className="text-white text-3xl font-bold mb-2">{movie.title || 'Untitled Movie'}</h1>
              <div className="flex items-center gap-4 text-white">
                {movie.imdbRating && (
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-500">★</span>
                    {movie.imdbRating}
                  </div>
                )}
                {movie.language && <span>{movie.language}</span>}
              </div>
            </div>
          </div>
          
          <div className="p-6 space-y-6">
            {movie.genre.length > 0 && (
              <div>
                <h3 className="text-white font-semibold mb-2">Genres</h3>
                <div className="flex flex-wrap gap-2">
                  {movie.genre.map(genre => (
                    <span key={genre} className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                      {genre}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {movie.director && (
              <div>
                <h3 className="text-white font-semibold mb-2">Director</h3>
                <p className="text-gray-300">{movie.director}</p>
              </div>
            )}
            
            {movie.cast.length > 0 && (
              <div>
                <h3 className="text-white font-semibold mb-2">Cast</h3>
                <p className="text-gray-300">{movie.cast.join(', ')}</p>
              </div>
            )}
            
            {movie.story && (
              <div>
                <h3 className="text-white font-semibold mb-2">Story</h3>
                <p className="text-gray-300 leading-relaxed">{movie.story}</p>
              </div>
            )}
            
            {movie.videoQuality.length > 0 && (
              <div>
                <h3 className="text-white font-semibold mb-2">Available Quality</h3>
                <div className="flex flex-wrap gap-2">
                  {movie.videoQuality.map(quality => (
                    <span key={quality} className="bg-green-600 text-white px-3 py-1 rounded text-sm">
                      {quality}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddMovie