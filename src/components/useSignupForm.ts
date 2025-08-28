import { useState, useCallback, useMemo, type FormEvent } from 'react'

export interface FormData {
  username: string
  password: string
  confirmPassword: string
}

export interface FormErrors {
  username?: string
  password?: string
  confirmPassword?: string
}

export interface UseSignupFormReturn {
  formData: FormData
  errors: FormErrors
  isSubmitting: boolean
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>
  resetForm: () => void
}

/**
 * Custom hook for managing signup form state, validation, and submission
 */
export const useSignupForm = (): UseSignupFormReturn => {
  // Form state management
  const [formData, setFormData] = useState<FormData>({
    username: '',
    password: '',
    confirmPassword: '',
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  /**
   * Handles input field changes and clears related errors
   */
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    // Update form data
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))

    // Clear error for this field when user starts typing
    setErrors(prev => {
      if (prev[name as keyof FormErrors]) {
        return {
          ...prev,
          [name]: undefined,
        }
      }
      return prev
    })
  }, [])

  /**
   * Validates the form and returns any errors found
   */
  const validateForm = useCallback((): FormErrors => {
    const newErrors: FormErrors = {}

    // Check if username is required
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required'
    }

    // Check if password is required
    if (!formData.password) {
      newErrors.password = 'Password is required'
    }

    // Check if confirm password is required
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirm password is required'
    }

    // Check if passwords match (only if both are provided)
    if (
      formData.password &&
      formData.confirmPassword &&
      formData.password !== formData.confirmPassword
    ) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    return newErrors
  }, [formData.username, formData.password, formData.confirmPassword])

  /**
   * Resets the form to its initial state
   */
  const resetForm = useCallback(() => {
    setFormData({
      username: '',
      password: '',
      confirmPassword: '',
    })
    setErrors({})
    setIsSubmitting(false)
  }, [])

  /**
   * Handles form submission
   */
  const handleSubmit = useCallback(async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Validate form
    const formErrors = validateForm()

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors)
      return
    }

    // Clear any existing errors
    setErrors({})
    setIsSubmitting(true)

    try {
      // Mock API request simulation
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Show success alert with username as required
      alert(
        `Signup request submitted successfully for username: ${formData.username}`
      )

      // Reset form after successful submission
      resetForm()
    } catch {
      // Handle any potential errors (though this is a mock request)
      alert('An error occurred during signup. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }, [validateForm, formData.username, resetForm])

  return useMemo(() => ({
    formData,
    errors,
    isSubmitting,
    handleInputChange,
    handleSubmit,
    resetForm,
  }), [formData, errors, isSubmitting, handleInputChange, handleSubmit, resetForm])
}
