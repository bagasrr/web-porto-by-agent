import { prisma } from '@/lib/prisma'
import AdminDashboard from './AdminDashboard'

export default async function AdminPage() {
  const profile = await prisma.profile.findFirst()
  const experiences = await prisma.workExperience.findMany({
    orderBy: { startDate: 'desc' }
  })
  const projects = await prisma.project.findMany({
    orderBy: { order: 'asc' }
  })
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold font-[family-name:var(--font-space-mono)]">
          <span className="bg-accent-green px-4 py-2 brutal-border brutal-shadow inline-block">
            Dashboard
          </span>
        </h1>
      </div>
      
      {/* Client Component for interactive forms */}
      <AdminDashboard initialProfile={profile} initialExperiences={experiences} initialProjects={projects} />
    </div>
  )
}
