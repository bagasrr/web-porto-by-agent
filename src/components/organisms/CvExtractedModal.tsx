'use client'

import React from 'react'
import { HiX } from 'react-icons/hi'
import { Button } from '../atoms'

export interface ExtractedCVData {
  guessedName?: string
  title?: string
  email?: string
  phone?: string
  linkedin?: string
  heroTitle?: string
  experiences?: Array<{
    role: string
    company: string
    startDate: string
    endDate?: string | null
    summary?: string
    description?: string
    techStack?: string[]
    order?: number
  }>
  projects?: Array<{
    title: string
    description: string
    techStack?: string[]
    githubUrl?: string
    demoUrl?: string
    imageUrl?: string
    order?: number
  }>
}

export interface CvExtractedModalProps {
  data: ExtractedCVData | null
  isOpen: boolean
  onClose: () => void
  onApply: () => void
}

export function CvExtractedModal({
  data,
  isOpen,
  onClose,
  onApply,
}: CvExtractedModalProps) {
  if (!isOpen || !data) return null

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="CV Data Extracted"
      onClick={onClose}
    >
      <div
        className="card max-w-2xl w-full max-h-[90vh] overflow-y-auto bg-bg-secondary border border-accent-border shadow-2xl p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-text">CV Data Extracted!</h3>
          <button
            type="button"
            onClick={onClose}
            className="btn btn-sm btn-ghost p-1"
            aria-label="Close dialog"
          >
            <HiX size={16} />
          </button>
        </div>
        <p className="text-sm text-text-secondary mb-6">
          We found the following data in your CV. Would you like to apply it?
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 text-sm">
          <div className="p-4 bg-surface-elevated rounded-xl space-y-2 border border-border">
            <p className="eyebrow mb-2">Profile Data</p>
            {data.guessedName && (
              <div>
                <span className="text-text-muted">Name:</span>{' '}
                <span className="text-text font-medium">
                  {data.guessedName}
                </span>
              </div>
            )}
            {data.title && (
              <div>
                <span className="text-text-muted">Title:</span>{' '}
                <span className="text-text font-medium">
                  {data.title}
                </span>
              </div>
            )}
            {data.email && (
              <div>
                <span className="text-text-muted">Email:</span>{' '}
                <span className="text-text font-medium">
                  {data.email}
                </span>
              </div>
            )}
            {data.phone && (
              <div>
                <span className="text-text-muted">Phone:</span>{' '}
                <span className="text-text font-medium">
                  {data.phone}
                </span>
              </div>
            )}
          </div>

          {data.experiences && data.experiences.length > 0 && (
            <div className="p-4 bg-surface-elevated rounded-xl overflow-y-auto max-h-48 border border-border">
              <p className="eyebrow mb-2">
                Experience ({data.experiences.length})
              </p>
              {data.experiences.map((exp, i) => (
                <div
                  key={i}
                  className="mb-2 pb-2 border-b border-border last:border-0 text-sm"
                >
                  <div className="font-semibold text-text">
                    {exp.role} @ {exp.company}
                  </div>
                  <div className="text-xs text-text-muted">
                    {exp.startDate} — {exp.endDate || 'Present'}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex gap-3">
          <Button
            type="button"
            variant="primary"
            className="flex-1"
            onClick={onApply}
          >
            Apply Data
          </Button>
          <Button
            type="button"
            variant="secondary"
            className="flex-1"
            onClick={onClose}
          >
            Ignore
          </Button>
        </div>
      </div>
    </div>
  )
}
