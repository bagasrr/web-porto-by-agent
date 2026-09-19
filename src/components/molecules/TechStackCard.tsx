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
    <div className="table-row rounded-xl px-4 py-3 flex items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={tech.imageUrl} alt="" className="w-7 h-7 object-contain" />
        <span className="text-sm font-medium text-[var(--text)]">{tech.name}</span>
      </div>
      <div className="flex gap-1.5 shrink-0">
        <Button
          type="button"
          variant="secondary"
          size="sm"
          className="p-2"
          onClick={() => onEdit(tech)}
          aria-label={`Edit ${tech.name}`}
          icon={<HiPencil size={12} />}
        />
        <Button
          type="button"
          variant="danger"
          size="sm"
          className="p-2"
          onClick={() => onDelete(tech.id)}
          aria-label={`Delete ${tech.name}`}
          icon={<HiTrash size={12} />}
        />
      </div>
    </div>
  )
}
