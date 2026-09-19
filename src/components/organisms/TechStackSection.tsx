'use client'

import React from 'react'
import { HiPlus } from 'react-icons/hi'
import type { TechStack } from '@/lib/data'
import { FormInput, Button } from '../atoms'
import { SectionHeader, TechStackCard } from '../molecules'

export interface TechStackSectionProps {
  techStacks: TechStack[]
  editingTech: TechStack | null
  onStartAdd: () => void
  onStartEdit: (tech: TechStack) => void
  onCancelEdit: () => void
  onSubmit: (e: React.FormEvent) => void
  onChange: (updater: (prev: TechStack | null) => TechStack | null) => void
  onDelete: (id: number) => void
  saving: boolean
}

export function TechStackSection({
  techStacks,
  editingTech,
  onStartAdd,
  onStartEdit,
  onCancelEdit,
  onSubmit,
  onChange,
  onDelete,
  saving,
}: TechStackSectionProps) {
  return (
    <section id="techstack" className="card">
      <SectionHeader
        title="Tech Stack"
        description={`${techStacks.length} technologies`}
        action={
          !editingTech ? (
            <Button
              type="button"
              variant="primary"
              size="sm"
              onClick={onStartAdd}
              icon={<HiPlus size={15} />}
            >
              Add Tech
            </Button>
          ) : null
        }
      />

      {/* Inline form for adding or editing Tech Stack item */}
      {editingTech && (
        <div className="mb-6 p-5 bg-[var(--surface-elevated)] border border-[var(--accent-border)] rounded-xl">
          <h3 className="text-sm font-bold text-[var(--text)] mb-4">
            {editingTech.id ? 'Edit Tech' : 'New Tech'}
          </h3>
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormInput
                id="tech-name"
                label="Name"
                type="text"
                value={editingTech.name || ''}
                onChange={(e) =>
                  onChange((t) => (t ? { ...t, name: e.target.value } : null))
                }
                required
              />
              <FormInput
                id="tech-img"
                label="Icon URL"
                type="text"
                value={editingTech.imageUrl || ''}
                onChange={(e) =>
                  onChange((t) => (t ? { ...t, imageUrl: e.target.value } : null))
                }
                required
              />
              <FormInput
                id="tech-order"
                label="Sort Order"
                type="number"
                value={editingTech.order || 0}
                onChange={(e) =>
                  onChange((t) =>
                    t
                      ? { ...t, order: parseInt(e.target.value) || 0 }
                      : null
                  )
                }
              />
            </div>
            <div className="flex gap-3">
              <Button
                type="submit"
                variant="primary"
                loading={saving}
                loadingText="Saving..."
              >
                Save
              </Button>
              <Button type="button" variant="secondary" onClick={onCancelEdit}>
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

      {techStacks.length === 0 ? (
        <div className="text-center py-10 text-[var(--text-muted)]">
          <p>No tech stack entries yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
          {techStacks.map((tech) => (
            <TechStackCard
              key={tech.id}
              tech={tech}
              onEdit={onStartEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </section>
  )
}
