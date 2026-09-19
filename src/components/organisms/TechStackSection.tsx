'use client'

import React from 'react'
import { HiPlus, HiCollection } from 'react-icons/hi'
import type { TechStack } from '@/lib/data'
import { Button } from '../atoms'
import { SectionHeader, EmptyState, TechStackCard } from '../molecules'

export interface TechStackSectionProps {
  techStacks: TechStack[]
  onAdd: () => void
  onEdit: (tech: TechStack) => void
  onDelete: (id: number) => void
}

export function TechStackSection({
  techStacks,
  onAdd,
  onEdit,
  onDelete,
}: TechStackSectionProps) {
  return (
    <section id="techstack" className="card">
      <SectionHeader
        title="Tech Stack"
        description={`${techStacks.length} technologies`}
        action={
          <Button
            type="button"
            variant="primary"
            size="sm"
            onClick={onAdd}
            icon={<HiPlus size={15} />}
          >
            Add Tech
          </Button>
        }
      />

      {techStacks.length === 0 ? (
        <EmptyState
          icon={HiCollection}
          title="No tech stack entries yet"
          description="Add technologies, frameworks, and tools that you work with."
          actionLabel="Add your first tech"
          onAction={onAdd}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {techStacks.map((tech) => (
            <TechStackCard
              key={tech.id}
              tech={tech}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </section>
  )
}
