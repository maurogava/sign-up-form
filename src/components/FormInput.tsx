import React from 'react'

interface FormInputProps {
  name: string
  type: 'text' | 'password'
  label: string
  value: string
  error?: string
  placeholder: string
  disabled: boolean
  autoComplete: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}
// Using React.memo to prevent unnecessary re-renders when the other fields are changed
const FormInput: React.FC<FormInputProps> = React.memo(
  ({
    name,
    type,
    label,
    value,
    error,
    placeholder,
    disabled,
    autoComplete,
    onChange,
  }) => {
    return (
      <div className="form-group">
        <label htmlFor={name} className="form-label">
          {label} *
        </label>
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className={`form-input ${error ? 'form-input--error' : ''}`}
          placeholder={placeholder}
          disabled={disabled}
          autoComplete={autoComplete}
        />
        {error && <span className="form-error">{error}</span>}
      </div>
    )
  }
)

FormInput.displayName = 'FormInput'

export default FormInput
