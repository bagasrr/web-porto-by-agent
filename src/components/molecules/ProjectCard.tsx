import React from 'react'
import { HiPencil, HiTrash, HiExternalLink } from 'react-icons/hi'
import { FaGithub } from 'react-icons/fa'
import type { Project } from '@/lib/data'
import { Badge } from '../atoms/Badge'
import { Button } from '../atoms/Button'

export interface ProjectCardProps {
  project: Project
  onEdit: (proj: Project) => void
  onDelete: (id: number) => void
}

export function ProjectCard({ project, onEdit, onDelete }: ProjectCardProps) {
  return (
    <div className="card card-hover flex flex-col justify-between bg-surface-elevated border border-border p-5 rounded-2xl relative group">
      <div>
        {/* Thumbnail */}
        {project.imageUrl ? (
          <div className="h-32 w-full rounded-xl mb-3 overflow-hidden bg-surface border border-border relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="h-20 w-full rounded-xl mb-3 bg-gradient-to-br from-dark-burgundy/40 to-surface border border-border flex items-center justify-center text-xs text-text-muted font-mono">
            <span>{project.title}</span>
          </div>
        )}

        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-bold text-base text-text leading-snug line-clamp-1">
            {project.title}
          </h3>
          <Badge variant="primary" size="xs" className="shrink-0">
            #{project.order || 0}
          </Badge>
        </div>

        <p className="text-xs text-text-secondary line-clamp-2 mb-3 leading-relaxed">
          {project.shortDescription || project.description}
        </p>

        {project.techStack && project.techStack.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {project.techStack.slice(0, 4).map((tech) => (
              <Badge key={tech} variant="muted" size="xs">
                {tech}
              </Badge>
            ))}
            {project.techStack.length > 4 && (
              <Badge variant="muted" size="xs">
                +{project.techStack.length - 4}
              </Badge>
            )}
          </div>
        )}

        {(project.githubUrl || project.demoUrl) && (
          <div className="flex items-center gap-3 text-xs text-text-muted mb-3 pt-1">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent flex items-center gap-1 transition-colors"
              >
                <FaGithub size={12} />
                <span>Code</span>
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent flex items-center gap-1 transition-colors"
              >
                <HiExternalLink size={13} />
                <span>Live Demo</span>
              </a>
            )}
          </div>
        )}
      </div>

      <div className="pt-3 border-t border-border flex items-center justify-between mt-auto">
        <span className="text-[11px] text-text-muted">
          Order: #{project.order || 0}
        </span>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="secondary"
            size="sm"
            className="text-xs py-1.5 px-3"
            onClick={() => onEdit(project)}
            icon={<HiPencil size={13} />}
          >
            Edit
          </Button>
          <Button
            type="button"
            variant="danger"
            size="sm"
            className="text-xs py-1.5 px-3"
            onClick={() => onDelete(project.id)}
            icon={<HiTrash size={13} />}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  )
}
