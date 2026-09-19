import React from 'react'
import { HiPlus } from 'react-icons/hi'
import { Button } from '../atoms/Button'

export interface EmptyStateProps {
  icon: React.ElementType
  title: string
  description: string
  actionLabel?: string
  onAction?: () => void
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="text-center py-12 px-4 rounded-xl border border-dashed border-[var(--border-color)] bg-[var(--surface-elevated)] text-[var(--text-muted)]">
      <Icon size={36} className="mx-auto mb-3 opacity-40 text-[var(--accent)]" />
      <p className="font-semibold text-[var(--text)] mb-1">{title}</p>
      <p className="text-xs mb-4">{description}</p>
      {actionLabel && onAction && (
        <Button
          type="button"
          variant="secondary"
          size="sm"
          onClick={onAction}
          icon={<HiPlus size={14} />}
        >
          {actionLabel}
        </Button>
      )}
    </div>
  )
}
