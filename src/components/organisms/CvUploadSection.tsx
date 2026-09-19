'use client'

import React from 'react'
import { HiUpload } from 'react-icons/hi'
import { SectionHeader } from '../molecules'

export interface CvUploadSectionProps {
  uploading: boolean
  onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function CvUploadSection({ uploading, onUpload }: CvUploadSectionProps) {
  return (
    <section className="card">
      <SectionHeader
        title="CV / Resume"
        description="Upload your PDF to make it downloadable"
      />
      <div className="flex items-center gap-4 flex-wrap">
        <label className="btn btn-secondary cursor-pointer">
          <HiUpload size={16} />
          {uploading ? 'Uploading...' : 'Upload PDF'}
          <input
            type="file"
            accept="application/pdf"
            onChange={onUpload}
            disabled={uploading}
            className="sr-only"
            aria-label="Upload CV PDF"
          />
        </label>
        <a
          href="/cv.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-ghost text-sm"
        >
          View current CV ↗
        </a>
      </div>
    </section>
  )
}
