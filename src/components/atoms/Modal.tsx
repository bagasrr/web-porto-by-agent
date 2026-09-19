'use client'

import React from 'react'
import { HiX } from 'react-icons/hi'

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  description?: string
  maxWidth?: string
  children: React.ReactNode
  ariaLabel?: string
}

export function Modal({
  isOpen,
  onClose,
  title,
  description,
  maxWidth = 'max-w-2xl',
  children,
  ariaLabel,
}: ModalProps) {
  if (!isOpen) return null

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={ariaLabel || title || 'Dialog'}
      onClick={onClose}
    >
      <div
        className={`card ${maxWidth} w-full max-h-[90vh] flex flex-col bg-[var(--bg-secondary)] border border-[var(--accent-border)] shadow-2xl rounded-2xl p-6`}
        onClick={(e) => e.stopPropagation()}
      >
        {(title || description) && (
          <div className="flex items-center justify-between pb-4 border-b border-[var(--border-color)]">
            <div>
              {title && (
                <h3 className="text-lg font-bold font-[family-name:var(--font-display)] text-[var(--text)]">
                  {title}
                </h3>
              )}
              {description && (
                <p className="text-xs text-[var(--text-muted)] mt-0.5">{description}</p>
              )}
            </div>
            <button
              type="button"
              onClick={onClose}
              className="btn btn-sm btn-ghost p-1.5 text-[var(--text-muted)] hover:text-[var(--text)]"
              aria-label="Close modal"
            >
              <HiX size={18} />
            </button>
          </div>
        )}
        {children}
      </div>
    </div>
  )
}
