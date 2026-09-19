import React from 'react'

export interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  helperText?: string
  showCount?: boolean
  wrapperClassName?: string
}

export function FormTextarea({
  label,
  error,
  helperText,
  showCount = false,
  id,
  className = '',
  wrapperClassName = '',
  required,
  maxLength,
  value,
  ...props
}: FormTextareaProps) {
  const currentLength = typeof value === 'string' ? value.length : 0

  return (
    <div className={wrapperClassName}>
      <div className="flex items-center justify-between mb-1">
        {label && (
          <label htmlFor={id} className="label mb-0">
            {label}
            {required && ' *'}
          </label>
        )}
        {showCount && maxLength !== undefined && (
          <span className="text-[11px] text-text-muted font-mono">
            {currentLength} / {maxLength}
          </span>
        )}
      </div>
      <textarea
        id={id}
        required={required}
        maxLength={maxLength}
        value={value}
        className={`input ${error ? 'input-error' : ''} ${className}`.trim()}
        {...props}
      />
      {error ? (
        <p className="text-xs text-danger mt-1">{error}</p>
      ) : helperText ? (
        <p className="text-xs text-text-muted mt-1">{helperText}</p>
      ) : null}
    </div>
  )
}
