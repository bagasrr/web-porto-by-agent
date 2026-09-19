'use client'

import React from 'react'
import { HiBriefcase, HiPlus } from 'react-icons/hi'
import type { WorkExperience } from '@/lib/data'
import { Button } from '../atoms'
import { SectionHeader, EmptyState, ExperienceCard } from '../molecules'

export interface ExperienceSectionProps {
  experiences: WorkExperience[]
  onAdd: () => void
  onEdit: (exp: WorkExperience) => void
  onDelete: (id: number) => void
}

export function ExperienceSection({
  experiences,
  onAdd,
  onEdit,
  onDelete,
}: ExperienceSectionProps) {
  return (
    <section id="experience" className="card">
      <SectionHeader
        title="Work Experience"
        description={`${experiences.length} career milestones`}
        action={
          <Button
            type="button"
            variant="primary"
            size="sm"
            onClick={onAdd}
            icon={<HiPlus size={15} />}
          >
            Add Experience
          </Button>
        }
      />

      {experiences.length === 0 ? (
        <EmptyState
          icon={HiBriefcase}
          title="No work experiences yet"
          description="Add your professional milestones to display on your portfolio."
          actionLabel="Add your first role"
          onAction={onAdd}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {experiences.map((exp) => (
            <ExperienceCard
              key={exp.id}
              experience={exp}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </section>
  )
}
