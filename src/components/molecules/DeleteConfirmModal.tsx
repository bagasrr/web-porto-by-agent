'use client'

import React from 'react'
import { HiTrash } from 'react-icons/hi'
import { Button } from '../atoms/Button'

export interface DeleteConfirmModalProps {
  label: string
  onConfirm: () => void
  onCancel: () => void
}

export function DeleteConfirmModal({
  label,
  onConfirm,
  onCancel,
}: DeleteConfirmModalProps) {
  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={`Delete ${label}`}
      onClick={onCancel}
    >
      <div
        className="card max-w-sm w-full bg-bg-secondary border border-border shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-danger/10 border border-danger/30 flex items-center justify-center shrink-0">
            <HiTrash size={18} className="text-danger" />
          </div>
          <div>
            <h3 className="font-bold text-text">Delete {label}?</h3>
            <p className="text-xs text-text-muted">This action cannot be undone.</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button
            type="button"
            variant="secondary"
            className="flex-1"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="danger"
            className="flex-1"
            onClick={onConfirm}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  )
}
