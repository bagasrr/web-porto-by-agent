import React from 'react'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  loadingText?: string
  icon?: React.ReactNode
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  loadingText,
  icon,
  children,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const variantClass = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    ghost: 'btn-ghost',
    danger: 'btn-danger',
  }[variant]

  const sizeClass = {
    sm: 'btn-sm',
    md: '',
    lg: 'btn-lg',
  }[size]

  return (
    <button
      className={`btn ${variantClass} ${sizeClass} ${className}`.trim()}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <>
          <span className="inline-block animate-spin mr-1">⏳</span>
          {loadingText || children}
        </>
      ) : (
        <>
          {icon}
          {children}
        </>
      )}
    </button>
  )
}
