'use client'

import React from 'react'
import type { Project } from '@/lib/data'
import { Modal, FormInput, FormTextarea, Button } from '../atoms'

export interface ProjectModalProps {
  project: Project | null
  isOpen: boolean
  onClose: () => void
  onSubmit: (e: React.FormEvent) => void
  onChange: (updater: (prev: Project | null) => Project | null) => void
  saving: boolean
}

export function ProjectModal({
  project,
  isOpen,
  onClose,
  onSubmit,
  onChange,
  saving,
}: ProjectModalProps) {
  if (!isOpen || !project) return null

  const isEditing = Boolean(project.id)

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? 'Edit Project' : 'Add New Project'}
      description={
        isEditing
          ? 'Update project information, links, and technologies.'
          : 'Fill in the information to feature a new project.'
      }
      ariaLabel={isEditing ? 'Edit Project' : 'New Project'}
    >
      <form onSubmit={onSubmit} className="space-y-4 overflow-y-auto py-4 pr-1">
        <FormInput
          id="modal-proj-title"
          label="Project Title"
          type="text"
          placeholder="e.g. AI-Powered Dashboard"
          value={project.title || ''}
          onChange={(e) =>
            onChange((p) => (p ? { ...p, title: e.target.value } : null))
          }
          required
        />

        <FormTextarea
          id="modal-proj-desc"
          label="Description"
          rows={3}
          placeholder="What does this project do and what problem does it solve?"
          value={project.description || ''}
          onChange={(e) =>
            onChange((p) => (p ? { ...p, description: e.target.value } : null))
          }
          required
        />

        <FormInput
          id="modal-proj-tech"
          label="Tech Stack (comma separated)"
          type="text"
          placeholder="Next.js, Tailwind CSS, PostgreSQL, Prisma..."
          value={
            Array.isArray(project.techStack)
              ? project.techStack.join(', ')
              : (project.techStack as unknown as string) || ''
          }
          onChange={(e) =>
            onChange((p) =>
              p
                ? {
                    ...p,
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormInput
            id="modal-proj-github"
            label="GitHub URL"
            type="url"
            placeholder="https://github.com/username/repo"
            value={project.githubUrl || ''}
            onChange={(e) =>
              onChange((p) => (p ? { ...p, githubUrl: e.target.value } : null))
            }
          />
          <FormInput
            id="modal-proj-demo"
            label="Demo URL"
            type="url"
            placeholder="https://my-app.vercel.app"
            value={project.demoUrl || ''}
            onChange={(e) =>
              onChange((p) => (p ? { ...p, demoUrl: e.target.value } : null))
            }
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <FormInput
            id="modal-proj-image"
            label="Image URL (optional)"
            wrapperClassName="sm:col-span-2"
            type="text"
            placeholder="/assets/project-preview.png or https://..."
            value={project.imageUrl || ''}
            onChange={(e) =>
              onChange((p) => (p ? { ...p, imageUrl: e.target.value } : null))
            }
          />
          <FormInput
            id="modal-proj-order"
            label="Sort Order"
            type="number"
            value={project.order || 0}
            onChange={(e) =>
              onChange((p) =>
                p ? { ...p, order: parseInt(e.target.value) || 0 } : null
              )
            }
          />
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-[var(--border-color)]">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            loading={saving}
            loadingText="Saving..."
          >
            {isEditing ? 'Save Changes' : 'Create Project'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}
