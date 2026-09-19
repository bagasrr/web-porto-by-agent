import React from 'react'

export interface FormSelectOption {
  value: string
  label: string
}

export interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  options?: FormSelectOption[]
  wrapperClassName?: string
}

export function FormSelect({
  label,
  id,
  options,
  children,
  className = '',
  wrapperClassName = '',
  required,
  ...props
}: FormSelectProps) {
  return (
    <div className={wrapperClassName}>
      {label && (
        <label htmlFor={id} className="label">
          {label}
          {required && ' *'}
        </label>
      )}
      <select
        id={id}
        required={required}
        className={`input ${className}`.trim()}
        {...props}
      >
        {options
          ? options.map(opt => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))
          : children}
      </select>
    </div>
  )
}
