import { getProfile, getExperiences, getProjects, getTechStacks } from '@/lib/data'
import AdminDashboard from './AdminDashboard'
import { HiCode, HiBriefcase, HiCollection, HiUser } from 'react-icons/hi'

export default async function AdminPage() {
  const [profile, experiences, projects, techStacks] = await Promise.all([
    getProfile(),
    getExperiences(),
    getProjects(),
    getTechStacks(),
  ])

  const STATS = [
    { label: 'Projects', value: projects.length, icon: HiCode, color: 'text-accent', bg: 'bg-dark-burgundy' },
    { label: 'Experience', value: `${experiences.length} roles`, icon: HiBriefcase, color: 'text-warning', bg: 'bg-amber-500/10' },
    { label: 'Technologies', value: techStacks.length, icon: HiCollection, color: 'text-success', bg: 'bg-emerald-500/10' },
    { label: 'Profile', value: profile ? 'Active' : 'Not set', icon: HiUser, color: 'text-blue-400', bg: 'bg-blue-500/10' },
  ]

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Page header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold font-display text-text mb-1">
          Dashboard
        </h1>
        <p className="text-text-muted text-sm">
          Manage your portfolio content from here.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.label} className="card flex items-center gap-4">
              <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center shrink-0`}>
                <Icon size={18} className={stat.color} />
              </div>
              <div>
                <p className="text-xl font-bold font-display text-text">
                  {stat.value}
                </p>
                <p className="text-xs text-text-muted">{stat.label}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Main CMS interface */}
      <AdminDashboard
        initialProfile={profile}
        initialExperiences={experiences}
        initialProjects={projects}
        initialTechStacks={techStacks}
      />
    </div>
  )
}
