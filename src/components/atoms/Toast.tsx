'use client'

import React from 'react'
import { HiCheck, HiExclamation, HiX } from 'react-icons/hi'

export interface ToastProps {
  type: 'success' | 'error' | string
  text: string
  onClose: () => void
}

export function Toast({ type, text, onClose }: ToastProps) {
  if (!text) return null

  return (
    <div
      role="alert"
      className={`flex items-center justify-between gap-3 toast ${
        type === 'success' ? 'toast-success' : 'toast-error'
      }`}
    >
      <div className="flex items-center gap-2">
        {type === 'success' ? (
          <HiCheck size={15} className="shrink-0" />
        ) : (
          <HiExclamation size={15} className="shrink-0" />
        )}
        <span>{text}</span>
      </div>
      <button
        type="button"
        onClick={onClose}
        className="btn btn-sm btn-ghost p-1"
        aria-label="Close notification"
      >
        <HiX size={14} />
      </button>
    </div>
  )
}
