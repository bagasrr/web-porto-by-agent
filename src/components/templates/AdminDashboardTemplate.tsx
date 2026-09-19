'use client'

import React from 'react'

export interface AdminDashboardTemplateProps {
  toast?: React.ReactNode
  profileSection: React.ReactNode
  cvUploadSection: React.ReactNode
  experienceSection: React.ReactNode
  projectSection: React.ReactNode
  techStackSection: React.ReactNode
  modals?: React.ReactNode
}

export function AdminDashboardTemplate({
  toast,
  profileSection,
  cvUploadSection,
  experienceSection,
  projectSection,
  techStackSection,
  modals,
}: AdminDashboardTemplateProps) {
  return (
    <div className="space-y-8">
      {/* Toast notifications */}
      {toast}

      {/* Main sections */}
      {profileSection}
      {cvUploadSection}
      {experienceSection}
      {projectSection}
      {techStackSection}

      {/* Dialogs and Modals */}
      {modals}
    </div>
  )
}
