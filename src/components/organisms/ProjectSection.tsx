'use client'

import React from 'react'
import { HiCode, HiPlus } from 'react-icons/hi'
import type { Project } from '@/lib/data'
import { Button } from '../atoms'
import { SectionHeader, EmptyState, ProjectCard } from '../molecules'

export interface ProjectSectionProps {
  projects: Project[]
  onAdd: () => void
  onEdit: (proj: Project) => void
  onDelete: (id: number) => void
}

export function ProjectSection({
  projects,
  onAdd,
  onEdit,
  onDelete,
}: ProjectSectionProps) {
  return (
    <section id="projects" className="card">
      <SectionHeader
        title="Projects"
        description={`${projects.length} portfolio items`}
        action={
          <Button
            type="button"
            variant="primary"
            size="sm"
            onClick={onAdd}
            icon={<HiPlus size={15} />}
          >
            Add Project
          </Button>
        }
      />

      {projects.length === 0 ? (
        <EmptyState
          icon={HiCode}
          title="No projects yet"
          description="Add your showcase applications to display on your portfolio."
          actionLabel="Add your first project"
          onAction={onAdd}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((proj) => (
            <ProjectCard
              key={proj.id}
              project={proj}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </section>
  )
}
