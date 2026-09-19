'use client'

import React from 'react'
import type { WorkExperience } from '@/lib/data'
import { formatDateForInput } from '@/lib/date'
import { Modal, FormInput, FormTextarea, Button } from '../atoms'

export interface ExperienceModalProps {
  experience: WorkExperience | null
  isOpen: boolean
  onClose: () => void
  onSubmit: (e: React.FormEvent) => void
  onChange: (updater: (prev: WorkExperience | null) => WorkExperience | null) => void
  saving: boolean
}

export function ExperienceModal({
  experience,
  isOpen,
  onClose,
  onSubmit,
  onChange,
  saving,
}: ExperienceModalProps) {
  if (!isOpen || !experience) return null

  const isEditing = Boolean(experience.id)

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? 'Edit Work Experience' : 'Add New Work Experience'}
      description={
        isEditing
          ? 'Update role details, dates, and technologies.'
          : 'Fill in the information to add a career milestone.'
      }
      ariaLabel={isEditing ? 'Edit Experience' : 'New Experience'}
    >
      <form onSubmit={onSubmit} className="space-y-4 overflow-y-auto py-4 pr-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormInput
            id="modal-exp-company"
            label="Company"
            type="text"
            placeholder="e.g. Google, Tech Startup"
            value={experience.company || ''}
            onChange={(e) =>
              onChange((ex) => (ex ? { ...ex, company: e.target.value } : null))
            }
            required
          />
          <FormInput
            id="modal-exp-role"
            label="Role / Job Title"
            type="text"
            placeholder="e.g. Senior Software Engineer"
            value={experience.role || ''}
            onChange={(e) =>
              onChange((ex) => (ex ? { ...ex, role: e.target.value } : null))
            }
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormInput
            id="modal-exp-start"
            label="Start Date"
            type="date"
            value={formatDateForInput(experience.startDate)}
            onChange={(e) =>
              onChange((ex) => (ex ? { ...ex, startDate: e.target.value } : null))
            }
            required
          />
          <FormInput
            id="modal-exp-end"
            label="End Date (blank = Present)"
            type="date"
            value={formatDateForInput(experience.endDate)}
            onChange={(e) =>
              onChange((ex) =>
                ex ? { ...ex, endDate: e.target.value || null } : null
              )
            }
          />
        </div>

        <FormInput
          id="modal-exp-summary"
          label="Short Summary"
          type="text"
          placeholder="One-sentence highlight of your achievements"
          value={experience.summary || ''}
          onChange={(e) =>
            onChange((ex) => (ex ? { ...ex, summary: e.target.value } : null))
          }
          required
        />

        <FormTextarea
          id="modal-exp-desc"
          label="Full Description"
          rows={4}
          placeholder="Detailed breakdown of responsibilities, impact, and projects..."
          value={experience.description || ''}
          onChange={(e) =>
            onChange((ex) =>
              ex ? { ...ex, description: e.target.value } : null
            )
          }
          required
        />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <FormInput
            id="modal-exp-tech"
            label="Tech Stack (comma separated)"
            wrapperClassName="sm:col-span-2"
            type="text"
            placeholder="React, Next.js, TypeScript, PostgreSQL..."
            value={
              Array.isArray(experience.techStack)
                ? experience.techStack.join(', ')
                : (experience.techStack as unknown as string) || ''
            }
            onChange={(e) =>
              onChange((ex) =>
                ex
                  ? {
                      ...ex,
                      techStack: e.target.value
                        .split(',')
                        .map((s) => s.trim())
                        .filter(Boolean),
                    }
                  : null
              )
            }
            required
          />
          <FormInput
            id="modal-exp-order"
            label="Sort Order"
            type="number"
            value={experience.order || 0}
            onChange={(e) =>
              onChange((ex) =>
                ex ? { ...ex, order: parseInt(e.target.value) || 0 } : null
              )
            }
          />
        </div>

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
            {isEditing ? 'Save Changes' : 'Create Experience'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}
