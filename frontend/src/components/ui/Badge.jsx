import React from 'react'
import { X } from 'lucide-react'

const Badge = ({ 
  children, 
  variant = 'default', 
  size = 'md',
  removable = false,
  onRemove,
  className = '',
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center font-medium rounded-full transition-colors'
  
  const variants = {
    default: 'bg-gray-600 text-white',
    primary: 'bg-blue-600 text-white',
    secondary: 'bg-purple-600 text-white',
    success: 'bg-green-600 text-white',
    warning: 'bg-yellow-600 text-black',
    danger: 'bg-red-600 text-white',
    outline: 'border border-gray-600 text-gray-300',
    ghost: 'bg-gray-800 bg-opacity-50 text-gray-300'
  }
  
  const sizes = {
    sm: 'px-2 py-1 text-xs gap-1',
    md: 'px-3 py-1.5 text-sm gap-1.5',
    lg: 'px-4 py-2 text-base gap-2'
  }
  
  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`
  
  return (
    <span className={classes} {...props}>
      {children}
      {removable && onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="ml-1 hover:bg-black hover:bg-opacity-20 rounded-full p-0.5 transition-colors"
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </span>
  )
}

const BadgeGroup = ({ children, className = '' }) => (
  <div className={`flex flex-wrap gap-2 ${className}`}>
    {children}
  </div>
)

export { Badge, BadgeGroup }
export default Badge