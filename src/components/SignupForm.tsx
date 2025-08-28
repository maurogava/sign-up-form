import type { FC } from 'react'
import { useSignupForm } from './useSignupForm'
import FormInput from './FormInput'

import './SignupForm.scss'

const SignupForm: FC = () => {
  // Use the custom hook for form logic and validation
  const { formData, errors, isSubmitting, handleInputChange, handleSubmit } =
    useSignupForm()

  return (
    <div className="signup-form-container">
      <div className="signup-form-card">
        <h1 className="signup-form-title">Create Account</h1>

        <form onSubmit={handleSubmit} className="signup-form" noValidate>
          <FormInput
            name="username"
            type="text"
            label="Username"
            value={formData.username}
            error={errors.username}
            placeholder="Enter your username"
            disabled={isSubmitting}
            autoComplete="username"
            onChange={handleInputChange}
          />

          <FormInput
            name="password"
            type="password"
            label="Password"
            value={formData.password}
            error={errors.password}
            placeholder="Enter your password"
            disabled={isSubmitting}
            autoComplete="new-password"
            onChange={handleInputChange}
          />

          <FormInput
            name="confirmPassword"
            type="password"
            label="Confirm Password"
            value={formData.confirmPassword}
            error={errors.confirmPassword}
            placeholder="Confirm your password"
            disabled={isSubmitting}
            autoComplete="new-password"
            onChange={handleInputChange}
          />

          {/* Submit Button */}
          <button
            type="submit"
            className={`submit-button ${isSubmitting ? 'submit-button--loading' : ''}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default SignupForm
