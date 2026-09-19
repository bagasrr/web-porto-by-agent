'use client'

import React from 'react'
import { HiPencil, HiTrash } from 'react-icons/hi'
import type { TechStack } from '@/lib/data'
import { Button } from '../atoms/Button'

export interface TechStackCardProps {
  tech: TechStack
  onEdit: (tech: TechStack) => void
  onDelete: (id: number) => void
}

export function TechStackCard({ tech, onEdit, onDelete }: TechStackCardProps) {
  return (
    <div className="table-row rounded-xl px-4 py-3 flex items-center justify-between gap-3 bg-surface-elevated/40 hover:bg-surface-elevated transition-colors border border-border">
      <div className="flex items-center gap-3 min-w-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={tech.imageUrl}
          alt={tech.name}
          className="w-7 h-7 object-contain shrink-0"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.opacity = '0.3'
          }}
        />
        <span className="text-sm font-medium text-text truncate">{tech.name}</span>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <Button
          type="button"
          variant="secondary"
          size="sm"
          className="text-xs py-1.5 px-3"
          onClick={() => onEdit(tech)}
          aria-label={`Edit ${tech.name}`}
          icon={<HiPencil size={13} />}
        >
          Edit
        </Button>
        <Button
          type="button"
          variant="danger"
          size="sm"
          className="text-xs py-1.5 px-3"
          onClick={() => onDelete(tech.id)}
          aria-label={`Delete ${tech.name}`}
          icon={<HiTrash size={13} />}
        >
          Delete
        </Button>
      </div>
    </div>
  )
}
