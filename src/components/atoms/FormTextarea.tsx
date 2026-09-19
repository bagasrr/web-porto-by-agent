import React from 'react'

export interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  wrapperClassName?: string
}

export function FormTextarea({
  label,
  error,
  id,
  className = '',
  wrapperClassName = '',
  required,
  ...props
}: FormTextareaProps) {
  return (
    <div className={wrapperClassName}>
      {label && (
        <label htmlFor={id} className="label">
          {label}
          {required && ' *'}
        </label>
      )}
      <textarea
        id={id}
        required={required}
        className={`input ${error ? 'input-error' : ''} ${className}`.trim()}
        {...props}
      />
      {error && <p className="text-xs text-[var(--danger)] mt-1">{error}</p>}
    </div>
  )
}
