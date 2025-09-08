import React from 'react'
import { Link } from 'react-router-dom'
import { Home, Search, Film, ArrowLeft } from 'lucide-react'

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md mx-auto">
        {/* 404 Animation */}
        <div className="mb-8">
          <div className="relative">
            <h1 className="text-9xl font-bold text-gray-800 select-none">404</h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <Film className="w-16 h-16 text-blue-500 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Movie Not Found
          </h2>
          <p className="text-gray-400 text-lg mb-2">
            The movie you're looking for doesn't exist or has been moved.
          </p>
          <p className="text-gray-500 text-sm">
            It might have been removed or the URL might be incorrect.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Link 
            to="/"
            className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors font-medium w-full justify-center"
          >
            <Home className="w-5 h-5" />
            Go to Home
          </Link>
          
          <Link 
            to="/"
            className="inline-flex items-center gap-3 bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-colors font-medium w-full justify-center border border-gray-600"
          >
            <Search className="w-5 h-5" />
            Search Movies
          </Link>
        </div>

        {/* Suggestions */}
        <div className="mt-12 p-6 bg-gray-800 rounded-lg">
          <h3 className="text-white font-semibold mb-3">What you can do:</h3>
          <ul className="text-gray-400 text-sm space-y-2 text-left">
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0"></div>
              Check the URL for typos
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0"></div>
              Search for the movie using the search bar
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0"></div>
              Browse our collection of movies
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0"></div>
              Go back to the previous page
            </li>
          </ul>
        </div>

        {/* Go Back Button */}
        <div className="mt-6">
          <button 
            onClick={() => window.history.back()}
            className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 mx-auto"
          >
            <ArrowLeft className="w-4 h-4" />
            Go back to previous page
          </button>
        </div>
      </div>
    </div>
  )
}

export default NotFound