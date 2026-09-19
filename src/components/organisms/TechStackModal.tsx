'use client'

import React from 'react'
import type { TechStack } from '@/lib/data'
import { Modal, FormInput, Button } from '../atoms'

export interface TechStackModalProps {
  tech: TechStack | null
  isOpen: boolean
  onClose: () => void
  onSubmit: (e: React.FormEvent) => void
  onChange: (updater: (prev: TechStack | null) => TechStack | null) => void
  saving: boolean
}

export function TechStackModal({
  tech,
  isOpen,
  onClose,
  onSubmit,
  onChange,
  saving,
}: TechStackModalProps) {
  if (!isOpen || !tech) return null

  const isEditing = Boolean(tech.id)

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? 'Edit Technology' : 'Add New Technology'}
      description={
        isEditing
          ? 'Update the technology name, icon URL, and display order.'
          : 'Add a new skill or technology to feature on your portfolio.'
      }
      ariaLabel={isEditing ? 'Edit Technology' : 'New Technology'}
      maxWidth="max-w-lg"
    >
      <form onSubmit={onSubmit} className="space-y-4 py-4 pr-1">
        <FormInput
          id="modal-tech-name"
          label="Technology Name"
          type="text"
          placeholder="e.g. Next.js, PostgreSQL, Docker"
          value={tech.name || ''}
          onChange={(e) =>
            onChange((t) => (t ? { ...t, name: e.target.value } : null))
          }
          required
        />

        <FormInput
          id="modal-tech-img"
          label="Icon URL"
          type="text"
          placeholder="https://cdn.jsdelivr.net/... or /tech/nextjs.svg"
          value={tech.imageUrl || ''}
          onChange={(e) =>
            onChange((t) => (t ? { ...t, imageUrl: e.target.value } : null))
          }
          required
        />

        {tech.imageUrl && (
          <div className="flex items-center gap-3 p-3 bg-surface-elevated rounded-xl border border-border">
            <span className="text-xs text-text-muted">Preview:</span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={tech.imageUrl}
              alt="Icon preview"
              className="w-8 h-8 object-contain"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = 'none'
              }}
            />
            <span className="text-xs font-semibold text-text">
              {tech.name || 'Preview'}
            </span>
          </div>
        )}

        <FormInput
          id="modal-tech-order"
          label="Sort Order"
          type="number"
          value={tech.order || 0}
          onChange={(e) =>
            onChange((t) =>
              t ? { ...t, order: parseInt(e.target.value) || 0 } : null
            )
          }
        />

        {/* Modal Footer */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            loading={saving}
            loadingText="Saving..."
          >
            {isEditing ? 'Save Changes' : 'Add Technology'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}
