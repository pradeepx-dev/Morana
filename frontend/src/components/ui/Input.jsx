import React from 'react'
import { AlertCircle } from 'lucide-react'

const Input = ({ 
  label, 
  error, 
  required = false, 
  className = '', 
  icon,
  helpText,
  ...props 
}) => {
  const inputClasses = `w-full px-4 py-3 bg-gray-700 text-white rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
    error ? 'border-red-500' : 'border-gray-600'
  } ${icon ? 'pl-12' : ''} ${className}`
  
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-gray-300 font-medium">
          {label}
          {required && <span className="text-red-400 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        {icon && (
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
        <input 
          className={inputClasses}
          {...props}
        />
      </div>
      
      {error && (
        <p className="text-sm text-red-400 flex items-center gap-1">
          <AlertCircle className="w-4 h-4" />
          {error}
        </p>
      )}
      
      {helpText && !error && (
        <p className="text-sm text-gray-400">{helpText}</p>
      )}
    </div>
  )
}

const Textarea = ({ 
  label, 
  error, 
  required = false, 
  className = '', 
  helpText,
  showCharCount = false,
  maxLength,
  ...props 
}) => {
  const textareaClasses = `w-full px-4 py-3 bg-gray-700 text-white rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none transition-colors ${
    error ? 'border-red-500' : 'border-gray-600'
  } ${className}`
  
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-gray-300 font-medium">
          {label}
          {required && <span className="text-red-400 ml-1">*</span>}
        </label>
      )}
      
      <textarea 
        className={textareaClasses}
        maxLength={maxLength}
        {...props}
      />
      
      <div className="flex justify-between items-start">
        <div>
          {error && (
            <p className="text-sm text-red-400 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {error}
            </p>
          )}
          
          {helpText && !error && (
            <p className="text-sm text-gray-400">{helpText}</p>
          )}
        </div>
        
        {showCharCount && (
          <span className="text-sm text-gray-400">
            {props.value?.length || 0}
            {maxLength && `/${maxLength}`} characters
          </span>
        )}
      </div>
    </div>
  )
}

const Select = ({ 
  label, 
  error, 
  required = false, 
  className = '', 
  children,
  helpText,
  ...props 
}) => {
  const selectClasses = `w-full px-4 py-3 bg-gray-700 text-white rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors appearance-none cursor-pointer ${
    error ? 'border-red-500' : 'border-gray-600'
  } ${className}`
  
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-gray-300 font-medium">
          {label}
          {required && <span className="text-red-400 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        <select className={selectClasses} {...props}>
          {children}
        </select>
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      
      {error && (
        <p className="text-sm text-red-400 flex items-center gap-1">
          <AlertCircle className="w-4 h-4" />
          {error}
        </p>
      )}
      
      {helpText && !error && (
        <p className="text-sm text-gray-400">{helpText}</p>
      )}
    </div>
  )
}

export { Input, Textarea, Select }
export default Input