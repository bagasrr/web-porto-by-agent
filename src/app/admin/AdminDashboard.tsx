'use client'

import type { Profile, WorkExperience, Project, TechStack } from '@/lib/data'
import { Toast } from '@/components/atoms'
import { DeleteConfirmModal } from '@/components/molecules'
import {
  ProfileSection,
  CvUploadSection,
  ExperienceSection,
  ExperienceModal,
  ProjectSection,
  ProjectModal,
  TechStackSection,
  CvExtractedModal,
} from '@/components/organisms'
import { AdminDashboardTemplate } from '@/components/templates'
import { useAdminDashboard } from './useAdminDashboard'

export interface AdminDashboardProps {
  initialProfile: Profile | null
  initialExperiences: WorkExperience[]
  initialProjects: Project[]
  initialTechStacks?: TechStack[]
}

export default function AdminDashboard(props: AdminDashboardProps) {
  const {
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
    saveProfile,
    uploadCV,
    saveExperience,
    saveProject,
    saveTechStack,
    confirmDelete,
    applyExtractedCVData,
  } = useAdminDashboard(props)

  return (
    <AdminDashboardTemplate
      toast={
        toast.text ? (
          <Toast type={toast.type} text={toast.text} onClose={hideToast} />
        ) : null
      }
      profileSection={
        <ProfileSection
          profile={profile}
          onChange={setProfile}
          onSubmit={saveProfile}
          saving={saving}
        />
      }
      cvUploadSection={
        <CvUploadSection
          uploading={uploading}
          onUpload={uploadCV}
        />
      }
      experienceSection={
        <ExperienceSection
          experiences={experiences}
          onAdd={() =>
            setEditingExp({
              id: 0,
              company: '',
              role: '',
              startDate: new Date().toISOString().split('T')[0],
              endDate: null,
              summary: '',
              description: '',
              techStack: [],
              order: experiences.length + 1,
            })
          }
          onEdit={setEditingExp}
          onDelete={(id) => setDeletingId(`experience_${id}`)}
        />
      }
      projectSection={
        <ProjectSection
          projects={projects}
          onAdd={() =>
            setEditingProj({
              id: 0,
              title: '',
              description: '',
              techStack: [],
              githubUrl: '',
              demoUrl: '',
              imageUrl: '',
              order: projects.length + 1,
            })
          }
          onEdit={setEditingProj}
          onDelete={(id) => setDeletingId(`project_${id}`)}
        />
      }
      techStackSection={
        <TechStackSection
          techStacks={techStacks}
          editingTech={editingTech}
          onStartAdd={() =>
            setEditingTech({
              id: 0,
              name: '',
              imageUrl: '',
              order: techStacks.length + 1,
            })
          }
          onStartEdit={setEditingTech}
          onCancelEdit={() => setEditingTech(null)}
          onSubmit={saveTechStack}
          onChange={setEditingTech}
          onDelete={(id) => setDeletingId(`techstack_${id}`)}
          saving={saving}
        />
      }
      modals={
        <>
          <ExperienceModal
            isOpen={Boolean(editingExp)}
            experience={editingExp}
            onClose={() => setEditingExp(null)}
            onSubmit={saveExperience}
            onChange={setEditingExp}
            saving={saving}
          />
          <ProjectModal
            isOpen={Boolean(editingProj)}
            project={editingProj}
            onClose={() => setEditingProj(null)}
            onSubmit={saveProject}
            onChange={setEditingProj}
            saving={saving}
          />
          {deletingId && (
            <DeleteConfirmModal
              label={deleteLabel}
              onConfirm={confirmDelete}
              onCancel={() => setDeletingId(null)}
            />
          )}
          <CvExtractedModal
            isOpen={Boolean(extractedCVData)}
            data={extractedCVData}
            onClose={() => setExtractedCVData(null)}
            onApply={applyExtractedCVData}
          />
        </>
      }
    />
  )
}
