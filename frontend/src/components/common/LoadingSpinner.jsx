import React from 'react'
import { Film } from 'lucide-react'

const LoadingSpinner = ({ size = 'md', text = 'Loading...' }) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  }

  const textSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  }

  return (
    <div className="flex flex-col items-center justify-center py-20">
      {/* Animated Spinner */}
      <div className="relative">
        {/* Outer ring */}
        <div className={`${sizeClasses[size]} rounded-full border-4 border-gray-700 border-t-blue-500 animate-spin`}></div>
        
        {/* Inner icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Film className={`${sizeClasses[size === 'xl' ? 'md' : 'sm']} text-blue-500 animate-pulse`} />
        </div>
      </div>

      {/* Loading text */}
      {text && (
        <p className={`text-gray-400 mt-4 ${textSizes[size]} animate-pulse`}>
          {text}
        </p>
      )}
    </div>
  )
}

// Alternative minimal spinner
export const MinimalSpinner = ({ className = '' }) => (
  <div className={`animate-spin rounded-full border-2 border-gray-300 border-t-blue-500 ${className}`}></div>
)

// Skeleton loader for movie cards
export const MovieCardSkeleton = () => (
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

// Grid skeleton for multiple movie cards
export const MovieGridSkeleton = ({ count = 8 }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    {Array.from({ length: count }, (_, index) => (
      <MovieCardSkeleton key={index} />
    ))}
  </div>
)

export default LoadingSpinner