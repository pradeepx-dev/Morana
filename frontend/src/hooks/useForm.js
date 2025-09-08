import { useState, useCallback } from 'react'

export const useForm = (initialValues = {}, validationRules = {}) => {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const setValue = useCallback((name, value) => {
    setValues(prev => ({
      ...prev,
      [name]: value
    }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }))
    }
  }, [errors])

  const setFieldTouched = useCallback((name) => {
    setTouched(prev => ({
      ...prev,
      [name]: true
    }))
  }, [])

  const validateField = useCallback((name, value) => {
    const rules = validationRules[name]
    if (!rules) return null

    for (const rule of rules) {
      const error = rule(value, values)
      if (error) return error
    }
    return null
  }, [validationRules, values])

  const validateForm = useCallback(() => {
    const newErrors = {}
    let isValid = true

    Object.keys(validationRules).forEach(name => {
      const error = validateField(name, values[name])
      if (error) {
        newErrors[name] = error
        isValid = false
      }
    })

    setErrors(newErrors)
    return isValid
  }, [validationRules, values, validateField])

  const handleSubmit = useCallback(async (onSubmit) => {
    setIsSubmitting(true)
    
    try {
      const isValid = validateForm()
      if (isValid) {
        await onSubmit(values)
      }
    } catch (error) {
      console.error('Form submission error:', error)
      throw error
    } finally {
      setIsSubmitting(false)
    }
  }, [values, validateForm])

  const reset = useCallback(() => {
    setValues(initialValues)
    setErrors({})
    setTouched({})
    setIsSubmitting(false)
  }, [initialValues])

  const setFieldError = useCallback((name, error) => {
    setErrors(prev => ({
      ...prev,
      [name]: error
    }))
  }, [])

  return {
    values,
    errors,
    touched,
    isSubmitting,
    setValue,
    setFieldTouched,
    validateField,
    validateForm,
    handleSubmit,
    reset,
    setFieldError,
    setErrors
  }
}

// Common validation rules
export const validationRules = {
  required: (value) => {
    if (!value || (Array.isArray(value) && value.length === 0)) {
      return 'This field is required'
    }
    return null
  },

  minLength: (min) => (value) => {
    if (value && value.length < min) {
      return `Must be at least ${min} characters`
    }
    return null
  },

  maxLength: (max) => (value) => {
    if (value && value.length > max) {
      return `Must be less than ${max} characters`
    }
    return null
  },

  email: (value) => {
    if (value && !/\S+@\S+\.\S+/.test(value)) {
      return 'Must be a valid email address'
    }
    return null
  },

  url: (value) => {
    if (value && !/^https?:\/\/.+\..+/.test(value)) {
      return 'Must be a valid URL'
    }
    return null
  },

  number: (value) => {
    if (value && isNaN(value)) {
      return 'Must be a number'
    }
    return null
  },

  range: (min, max) => (value) => {
    const num = parseFloat(value)
    if (value && (num < min || num > max)) {
      return `Must be between ${min} and ${max}`
    }
    return null
  },

  pattern: (regex, message) => (value) => {
    if (value && !regex.test(value)) {
      return message
    }
    return null
  },

  arrayMinLength: (min) => (value) => {
    if (Array.isArray(value) && value.length < min) {
      return `Must select at least ${min} item${min > 1 ? 's' : ''}`
    }
    return null
  }
}