import React from 'react'

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'muted' | 'success' | 'warning' | 'danger'
  size?: 'xs' | 'sm'
  children: React.ReactNode
}

export function Badge({
  variant = 'primary',
  size = 'sm',
  className = '',
  children,
  ...props
}: BadgeProps) {
  const variantClass = {
    primary: 'badge-primary',
    muted: 'badge-muted',
    success: 'badge-success',
    warning: 'badge-warning',
    danger: 'badge-danger',
  }[variant]

  const sizeClass = size === 'xs' ? 'text-[10px] px-2 py-0.5' : 'text-xs'

  return (
    <span className={`badge ${variantClass} ${sizeClass} ${className}`.trim()} {...props}>
      {children}
    </span>
  )
}
