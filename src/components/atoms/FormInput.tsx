import React from 'react'

export interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  wrapperClassName?: string
}

export function FormInput({
  label,
  error,
  id,
  className = '',
  wrapperClassName = '',
  required,
  ...props
}: FormInputProps) {
  return (
    <div className={wrapperClassName}>
      {label && (
        <label htmlFor={id} className="label">
          {label}
          {required && ' *'}
        </label>
      )}
      <input
        id={id}
        required={required}
        className={`input ${error ? 'input-error' : ''} ${className}`.trim()}
        {...props}
      />
      {error && <p className="text-xs text-[var(--danger)] mt-1">{error}</p>}
    </div>
  )
}
