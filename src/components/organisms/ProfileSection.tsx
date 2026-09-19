'use client'

import React from 'react'
import type { Profile } from '@/lib/data'
import { FormInput, FormTextarea, FormSelect, Button } from '../atoms'
import { SectionHeader } from '../molecules'

export interface ProfileSectionProps {
  profile: Profile
  onChange: (updater: (prev: Profile) => Profile) => void
  onSubmit: (e: React.FormEvent) => void
  saving: boolean
}

export function ProfileSection({
  profile,
  onChange,
  onSubmit,
  saving,
}: ProfileSectionProps) {
  return (
    <section id="profile" className="card">
      <SectionHeader
        title="Profile"
        description="Your public portfolio information"
      />
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            id="p-fullName"
            name="fullName"
            label="Full Name"
            type="text"
            value={profile.fullName || ''}
            onChange={(e) =>
              onChange((p) => ({ ...p, fullName: e.target.value }))
            }
            required
          />
          <FormInput
            id="p-title"
            name="title"
            label="Job Title"
            type="text"
            value={profile.title || ''}
            onChange={(e) => onChange((p) => ({ ...p, title: e.target.value }))}
            required
          />
        </div>

        <FormTextarea
          id="p-heroTitle"
          name="heroTitle"
          label="Hero Headline"
          rows={2}
          value={profile.heroTitle || ''}
          onChange={(e) =>
            onChange((p) => ({ ...p, heroTitle: e.target.value }))
          }
          required
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            id="p-email"
            name="email"
            label="Email"
            type="email"
            value={profile.email || ''}
            onChange={(e) => onChange((p) => ({ ...p, email: e.target.value }))}
            required
          />
          <FormInput
            id="p-phone"
            name="phone"
            label="Phone"
            type="text"
            value={profile.phone || ''}
            onChange={(e) => onChange((p) => ({ ...p, phone: e.target.value }))}
          />
          <FormInput
            id="p-whatsapp"
            name="whatsapp"
            label="WhatsApp (e.g. 628...)"
            type="text"
            value={profile.whatsapp || ''}
            onChange={(e) =>
              onChange((p) => ({ ...p, whatsapp: e.target.value }))
            }
          />
          <FormInput
            id="p-linkedin"
            name="linkedin"
            label="LinkedIn URL"
            type="url"
            value={profile.linkedin || ''}
            onChange={(e) =>
              onChange((p) => ({ ...p, linkedin: e.target.value }))
            }
          />
          <FormSelect
            id="p-theme"
            name="theme"
            label="Theme"
            value={profile.theme || 'dark'}
            onChange={(e) => onChange((p) => ({ ...p, theme: e.target.value }))}
            options={[
              { value: 'dark', label: 'Dark (Burgundy)' },
              { value: 'light', label: 'Light' },
            ]}
          />
        </div>

        <Button type="submit" variant="primary" loading={saving} loadingText="Saving...">
          Save Profile
        </Button>
      </form>
    </section>
  )
}
