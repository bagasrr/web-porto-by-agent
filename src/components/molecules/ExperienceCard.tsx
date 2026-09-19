import React from 'react'
import { HiPencil, HiTrash } from 'react-icons/hi'
import type { WorkExperience } from '@/lib/data'
import { formatDate } from '@/lib/date'
import { Badge } from '../atoms/Badge'
import { Button } from '../atoms/Button'

export interface ExperienceCardProps {
  experience: WorkExperience
  onEdit: (exp: WorkExperience) => void
  onDelete: (id: number) => void
}

export function ExperienceCard({
  experience,
  onEdit,
  onDelete,
}: ExperienceCardProps) {
  return (
    <div className="card card-hover flex flex-col justify-between bg-[var(--surface-elevated)] border border-[var(--border-color)] p-5 rounded-2xl relative group">
      <div>
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="min-w-0 flex-1">
            <h3 className="font-bold text-base text-[var(--text)] leading-snug truncate">
              {experience.role}
            </h3>
            <p className="text-sm font-semibold text-[var(--accent)] mt-0.5 truncate">
              {experience.company}
            </p>
          </div>
          <Badge variant="primary" size="sm" className="shrink-0 whitespace-nowrap">
            {formatDate(experience.startDate)} — {experience.endDate ? formatDate(experience.endDate) : 'Present'}
          </Badge>
        </div>

        <p className="text-xs text-[var(--text-secondary)] line-clamp-2 mb-2 mt-2 leading-relaxed">
          {experience.summary}
        </p>

        {experience.description && (
          <p className="text-[11px] text-[var(--text-muted)] line-clamp-2 mb-3 leading-relaxed opacity-80">
            {experience.description}
          </p>
        )}

        {experience.techStack && experience.techStack.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {experience.techStack.slice(0, 5).map(tech => (
              <Badge key={tech} variant="muted" size="xs">
                {tech}
              </Badge>
            ))}
            {experience.techStack.length > 5 && (
              <Badge variant="muted" size="xs">
                +{experience.techStack.length - 5}
              </Badge>
            )}
          </div>
        )}
      </div>

      <div className="pt-3 border-t border-[var(--border-color)] flex items-center justify-between mt-auto">
        <span className="text-[11px] text-[var(--text-muted)]">
          Order: #{experience.order || 0}
        </span>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="secondary"
            size="sm"
            className="text-xs py-1.5 px-3"
            onClick={() => onEdit(experience)}
            icon={<HiPencil size={13} />}
          >
            Edit
          </Button>
          <Button
            type="button"
            variant="danger"
            size="sm"
            className="text-xs py-1.5 px-3"
            onClick={() => onDelete(experience.id)}
            icon={<HiTrash size={13} />}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  )
}
