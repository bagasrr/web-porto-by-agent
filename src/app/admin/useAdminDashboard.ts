'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { Profile, WorkExperience, Project, TechStack } from '@/lib/data'
import type { ExtractedCVData } from '@/components/organisms'

export interface UseAdminDashboardProps {
  initialProfile: Profile | null
  initialExperiences: WorkExperience[]
  initialProjects: Project[]
  initialTechStacks?: TechStack[]
}

export function useAdminDashboard({
  initialProfile,
  initialExperiences,
  initialProjects,
  initialTechStacks,
}: UseAdminDashboardProps) {
  const [profile, setProfile] = useState<Profile>(initialProfile || ({} as Profile))
  const [experiences, setExperiences] = useState<WorkExperience[]>(initialExperiences || [])
  const [projects, setProjects] = useState<Project[]>(initialProjects || [])
  const [techStacks, setTechStacks] = useState<TechStack[]>(initialTechStacks || [])

  const [editingExp, setEditingExp] = useState<WorkExperience | null>(null)
  const [editingProj, setEditingProj] = useState<Project | null>(null)
  const [editingTech, setEditingTech] = useState<TechStack | null>(null)

  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [toast, setToast] = useState({ type: '', text: '' })
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [extractedCVData, setExtractedCVData] = useState<ExtractedCVData | null>(null)

  const router = useRouter()

  const showToast = (type: string, text: string) => {
    setToast({ type, text })
    setTimeout(() => setToast({ type: '', text: '' }), 5000)
  }

  const hideToast = () => {
    setToast({ type: '', text: '' })
  }

  // ── Profile ──────────────────────────────────────────────
  const saveProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      const res = await fetch('/api/admin/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile),
      })
      if (res.ok) {
        showToast('success', 'Profile updated successfully!')
        router.refresh()
      } else {
        showToast('error', 'Failed to update profile.')
      }
    } catch {
      showToast('error', 'An error occurred.')
    } finally {
      setSaving(false)
    }
  }

  // ── CV Upload ─────────────────────────────────────────────
  const uploadCV = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.type !== 'application/pdf') {
      showToast('error', 'Please upload a PDF file.')
      return
    }
    setUploading(true)
    const formData = new FormData()
    formData.append('file', file)
    try {
      const res = await fetch('/api/admin/upload', { method: 'POST', body: formData })
      if (res.ok) {
        const resData = await res.json()
        showToast('success', 'CV uploaded successfully!')
        if (resData.extractedData && Object.values(resData.extractedData).some(Boolean)) {
          setExtractedCVData(resData.extractedData)
        }
      } else {
        showToast('error', 'Failed to upload CV.')
      }
    } catch {
      showToast('error', 'An error occurred during upload.')
    } finally {
      setUploading(false)
    }
  }

  // ── Experiences ───────────────────────────────────────────
  const saveExperience = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingExp) return
    setSaving(true)
    const isNew = !editingExp.id
    try {
      const res = await fetch('/api/admin/experience', {
        method: isNew ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingExp),
      })
      if (res.ok) {
        const { experience } = await res.json()
        if (isNew) {
          setExperiences((prev) =>
            [experience, ...prev].sort(
              (a, b) =>
                new Date(b.startDate as string).getTime() -
                new Date(a.startDate as string).getTime()
            )
          )
        } else {
          setExperiences((prev) =>
            prev
              .map((item) => (item.id === experience.id ? experience : item))
              .sort(
                (a, b) =>
                  new Date(b.startDate as string).getTime() -
                  new Date(a.startDate as string).getTime()
              )
          )
        }
        setEditingExp(null)
        showToast('success', isNew ? 'Experience created!' : 'Experience updated!')
        router.refresh()
      } else {
        showToast('error', 'Failed to save experience.')
      }
    } catch {
      showToast('error', 'An error occurred.')
    } finally {
      setSaving(false)
    }
  }

  // ── Projects ──────────────────────────────────────────────
  const saveProject = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingProj) return
    setSaving(true)
    const isNew = !editingProj.id
    try {
      const res = await fetch('/api/admin/project', {
        method: isNew ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingProj),
      })
      if (res.ok) {
        const { project } = await res.json()
        if (isNew) {
          setProjects((prev) =>
            [...prev, project].sort((a, b) => (a.order || 0) - (b.order || 0))
          )
        } else {
          setProjects((prev) =>
            prev
              .map((p) => (p.id === project.id ? project : p))
              .sort((a, b) => (a.order || 0) - (b.order || 0))
          )
        }
        setEditingProj(null)
        showToast('success', isNew ? 'Project created!' : 'Project updated!')
        router.refresh()
      } else {
        showToast('error', 'Failed to save project.')
      }
    } catch {
      showToast('error', 'An error occurred.')
    } finally {
      setSaving(false)
    }
  }

  // ── Tech Stack ────────────────────────────────────────────
  const saveTechStack = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingTech) return
    setSaving(true)
    const isNew = !editingTech.id
    try {
      const res = await fetch('/api/admin/techstack', {
        method: isNew ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingTech),
      })
      if (res.ok) {
        const { techStack } = await res.json()
        if (isNew) {
          setTechStacks((prev) =>
            [...prev, techStack].sort((a, b) => (a.order || 0) - (b.order || 0))
          )
        } else {
          setTechStacks((prev) =>
            prev
              .map((t) => (t.id === techStack.id ? techStack : t))
              .sort((a, b) => (a.order || 0) - (b.order || 0))
          )
        }
        setEditingTech(null)
        showToast('success', 'Tech stack saved!')
        router.refresh()
      } else {
        showToast('error', 'Failed to save tech stack.')
      }
    } catch {
      showToast('error', 'An error occurred.')
    } finally {
      setSaving(false)
    }
  }

  // ── Delete ────────────────────────────────────────────────
  const confirmDelete = async () => {
    if (!deletingId) return
    const [type, idStr] = deletingId.split('_')
    const id = parseInt(idStr)
    try {
      const res = await fetch(`/api/admin/${type}?id=${id}`, { method: 'DELETE' })
      if (res.ok) {
        if (type === 'experience') setExperiences((prev) => prev.filter((i) => i.id !== id))
        else if (type === 'project') setProjects((prev) => prev.filter((i) => i.id !== id))
        else if (type === 'techstack') setTechStacks((prev) => prev.filter((i) => i.id !== id))
        showToast('success', 'Deleted successfully.')
        router.refresh()
      } else {
        showToast('error', 'Failed to delete.')
      }
    } catch {
      showToast('error', 'An error occurred.')
    } finally {
      setDeletingId(null)
    }
  }

  // ── Apply Extracted CV ─────────────────────────────────────
  const applyExtractedCVData = async () => {
    if (!extractedCVData) return

    setProfile((prev) => ({
      ...prev,
      ...(extractedCVData.guessedName ? { fullName: extractedCVData.guessedName } : {}),
      ...(extractedCVData.title ? { title: extractedCVData.title } : {}),
      ...(extractedCVData.email ? { email: extractedCVData.email } : {}),
      ...(extractedCVData.phone ? { phone: extractedCVData.phone, whatsapp: extractedCVData.phone } : {}),
      ...(extractedCVData.linkedin ? { linkedin: extractedCVData.linkedin } : {}),
      ...(extractedCVData.heroTitle ? { heroTitle: extractedCVData.heroTitle } : {}),
    }))

    if (extractedCVData.experiences?.length) {
      for (const exp of extractedCVData.experiences) {
        try {
          const res = await fetch('/api/admin/experience', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(exp),
          })
          if (res.ok) {
            const d = await res.json()
            setExperiences((prev) => [...prev, d.experience])
          }
        } catch {}
      }
    }

    if (extractedCVData.projects?.length) {
      for (const proj of extractedCVData.projects) {
        try {
          const res = await fetch('/api/admin/project', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              ...proj,
              techStack: Array.isArray(proj.techStack) ? proj.techStack.join(', ') : (proj.techStack || ''),
            }),
          })
          if (res.ok) {
            const d = await res.json()
            setProjects((prev) => [...prev, d.project])
          }
        } catch {}
      }
    }

    setExtractedCVData(null)
    showToast('success', 'Data applied! Click Save Profile to save changes.')
    router.refresh()
  }

  const deleteLabel = deletingId
    ? deletingId.startsWith('experience')
      ? 'Experience'
      : deletingId.startsWith('project')
        ? 'Project'
        : 'Tech Stack'
    : ''

  return {
    // State
    profile,
    setProfile,
    experiences,
    projects,
    techStacks,
    editingExp,
    setEditingExp,
    editingProj,
    setEditingProj,
    editingTech,
    setEditingTech,
    saving,
    uploading,
    toast,
    hideToast,
    deletingId,
    setDeletingId,
    deleteLabel,
    extractedCVData,
    setExtractedCVData,

    // Handlers
    saveProfile,
    uploadCV,
    saveExperience,
    saveProject,
    saveTechStack,
    confirmDelete,
    applyExtractedCVData,
  }
}
