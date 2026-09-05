'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminDashboard({ 
  initialProfile, 
  initialExperiences, 
  initialProjects,
  initialTechStacks 
}: { 
  initialProfile: any, 
  initialExperiences: any[], 
  initialProjects: any[],
  initialTechStacks?: any[]
}) {
  const [profile, setProfile] = useState(initialProfile || {})
  const [experiences, setExperiences] = useState<any[]>(initialExperiences || [])
  const [projects, setProjects] = useState<any[]>(initialProjects || [])
  const [techStacks, setTechStacks] = useState<any[]>(initialTechStacks || [])
  
  const [editingExp, setEditingExp] = useState<any | null>(null)
  const [editingProj, setEditingProj] = useState<any | null>(null)
  const [editingTech, setEditingTech] = useState<any | null>(null)
  
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })
  
  // Use string identifier like 'exp_1' or 'proj_2' to differentiate deletes
  const [deletingId, setDeletingId] = useState<string | null>(null)
  
  const router = useRouter()

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value })
  }

  const saveProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setMessage({ type: '', text: '' })
    
    try {
      const res = await fetch('/api/admin/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile)
      })
      
      if (res.ok) {
        setMessage({ type: 'success', text: 'Profile updated successfully!' })
        router.refresh()
      } else {
        setMessage({ type: 'error', text: 'Failed to update profile.' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An error occurred.' })
    } finally {
      setSaving(false)
    }
  }

  const [extractedCVData, setExtractedCVData] = useState<any | null>(null)

  const uploadCV = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    
    if (file.type !== 'application/pdf') {
      setMessage({ type: 'error', text: 'Please upload a PDF file.' })
      return
    }

    setUploading(true)
    setMessage({ type: '', text: '' })
    
    const formData = new FormData()
    formData.append('file', file)
    
    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData
      })
      
      if (res.ok) {
        const resData = await res.json()
        setMessage({ type: 'success', text: 'CV uploaded successfully!' })
        if (resData.extractedData && Object.values(resData.extractedData).some(val => val !== null)) {
          setExtractedCVData(resData.extractedData)
        }
      } else {
        setMessage({ type: 'error', text: 'Failed to upload CV.' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An error occurred during upload.' })
    } finally {
      setUploading(false)
    }
  }

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/')
    router.refresh()
  }

  // Work Experience CRUD Handlers
  const handleExpChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEditingExp({ ...editingExp, [e.target.name]: e.target.value })
  }

  const saveExperience = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setMessage({ type: '', text: '' })
    
    const isNew = !editingExp.id
    
    try {
      const res = await fetch('/api/admin/experience', {
        method: isNew ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingExp)
      })
      
      if (res.ok) {
        const { experience } = await res.json()
        if (isNew) {
          setExperiences([experience, ...experiences].sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()))
        } else {
          setExperiences(experiences.map(exp => exp.id === experience.id ? experience : exp).sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()))
        }
        setEditingExp(null)
        setMessage({ type: 'success', text: 'Work experience saved!' })
        router.refresh()
      } else {
        setMessage({ type: 'error', text: 'Failed to save experience.' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An error occurred.' })
    } finally {
      setSaving(false)
    }
  }

  // Project CRUD Handlers
  const handleProjChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEditingProj({ ...editingProj, [e.target.name]: e.target.value })
  }

  const saveProject = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setMessage({ type: '', text: '' })
    
    const isNew = !editingProj.id
    
    try {
      const res = await fetch('/api/admin/project', {
        method: isNew ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingProj)
      })
      
      if (res.ok) {
        const { project } = await res.json()
        if (isNew) {
          setProjects([...projects, project].sort((a, b) => (a.order || 0) - (b.order || 0)))
        } else {
          setProjects(projects.map(p => p.id === project.id ? project : p).sort((a, b) => (a.order || 0) - (b.order || 0)))
        }
        setEditingProj(null)
        setMessage({ type: 'success', text: 'Project saved!' })
        router.refresh()
      } else {
        setMessage({ type: 'error', text: 'Failed to save project.' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An error occurred.' })
    } finally {
      setSaving(false)
    }
  }

  // Tech Stack CRUD Handlers
  const handleTechChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditingTech({ ...editingTech, [e.target.name]: e.target.value })
  }

  const saveTechStack = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setMessage({ type: '', text: '' })
    
    const isNew = !editingTech.id
    
    try {
      const res = await fetch('/api/admin/techstack', {
        method: isNew ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingTech)
      })
      
      if (res.ok) {
        const { techStack } = await res.json()
        if (isNew) {
          setTechStacks([...techStacks, techStack].sort((a, b) => (a.order || 0) - (b.order || 0)))
        } else {
          setTechStacks(techStacks.map(t => t.id === techStack.id ? techStack : t).sort((a, b) => (a.order || 0) - (b.order || 0)))
        }
        setEditingTech(null)
        setMessage({ type: 'success', text: 'Tech Stack saved!' })
        router.refresh()
      } else {
        setMessage({ type: 'error', text: 'Failed to save tech stack.' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An error occurred.' })
    } finally {
      setSaving(false)
    }
  }

  const confirmDelete = async () => {
    if (!deletingId) return
    
    const [type, idStr] = deletingId.split('_')
    const id = parseInt(idStr)
    
    try {
      const res = await fetch(`/api/admin/${type}?id=${id}`, { method: 'DELETE' })
      if (res.ok) {
        if (type === 'experience') {
          setExperiences(experiences.filter(item => item.id !== id))
        } else if (type === 'project') {
          setProjects(projects.filter(item => item.id !== id))
        } else if (type === 'techstack') {
          setTechStacks(techStacks.filter(item => item.id !== id))
        }
        setMessage({ type: 'success', text: 'Item deleted.' })
        router.refresh()
      } else {
        setMessage({ type: 'error', text: 'Failed to delete item.' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An error occurred.' })
    } finally {
      setDeletingId(null)
    }
  }

  const formatDateForInput = (dateString: string | null) => {
    if (!dateString) return ''
    const d = new Date(dateString)
    return d.toISOString().split('T')[0]
  }

  return (
    <div className="space-y-8 pb-20">
      <div className="flex justify-end">
        <button 
          onClick={handleLogout}
          className="brutal-btn bg-accent-red text-white px-4 py-2 font-bold"
        >
          Logout
        </button>
      </div>

      {message.text && (
        <div className={`p-4 font-bold brutal-border ${message.type === 'success' ? 'bg-accent-green' : 'bg-accent-red text-white'}`}>
          {message.text}
        </div>
      )}

      {/* CV Upload Section */}
      <div className="brutal-border brutal-shadow bg-white p-6 md:p-8">
        <h2 className="text-2xl font-bold font-[family-name:var(--font-space-mono)] mb-4">Upload CV (PDF)</h2>
        <div className="flex items-center gap-4">
          <input 
            type="file" 
            accept="application/pdf"
            onChange={uploadCV}
            disabled={uploading}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:border-4 file:border-black
              file:text-sm file:font-bold
              file:bg-accent-yellow file:text-black
              hover:file:bg-accent-blue hover:file:text-white
              file:cursor-pointer file:transition-colors"
          />
          {uploading && <span className="font-bold">Uploading...</span>}
        </div>
      </div>

      {/* Profile Form */}
      <div className="brutal-border brutal-shadow bg-white p-6 md:p-8">
        <h2 className="text-2xl font-bold font-[family-name:var(--font-space-mono)] mb-6">Personal Information</h2>
        
        <form onSubmit={saveProfile} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold mb-2">Full Name</label>
              <input type="text" name="fullName" value={profile.fullName || ''} onChange={handleProfileChange} className="w-full p-3 brutal-border focus:bg-accent-yellow outline-none" required />
            </div>
            <div>
              <label className="block font-bold mb-2">Job Title</label>
              <input type="text" name="title" value={profile.title || ''} onChange={handleProfileChange} className="w-full p-3 brutal-border focus:bg-accent-yellow outline-none" required />
            </div>
          </div>
          
          <div>
            <label className="block font-bold mb-2">Hero Title</label>
            <textarea name="heroTitle" value={profile.heroTitle || ''} onChange={handleProfileChange} className="w-full p-3 brutal-border focus:bg-accent-yellow outline-none" rows={2} required />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold mb-2">Email</label>
              <input type="email" name="email" value={profile.email || ''} onChange={handleProfileChange} className="w-full p-3 brutal-border focus:bg-accent-yellow outline-none" required />
            </div>
            <div>
              <label className="block font-bold mb-2">Phone</label>
              <input type="text" name="phone" value={profile.phone || ''} onChange={handleProfileChange} className="w-full p-3 brutal-border focus:bg-accent-yellow outline-none" required />
            </div>
            <div>
              <label className="block font-bold mb-2">WhatsApp Number (e.g. 628...)</label>
              <input type="text" name="whatsapp" value={profile.whatsapp || ''} onChange={handleProfileChange} className="w-full p-3 brutal-border focus:bg-accent-yellow outline-none" />
            </div>
            <div>
              <label className="block font-bold mb-2">LinkedIn URL</label>
              <input type="url" name="linkedin" value={profile.linkedin || ''} onChange={handleProfileChange} className="w-full p-3 brutal-border focus:bg-accent-yellow outline-none" />
            </div>
          </div>

          <button type="submit" disabled={saving} className="brutal-btn bg-accent-blue text-white font-bold py-3 px-8 mt-6 text-lg">
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>

      {/* Work Experience CRUD */}
      <div className="brutal-border brutal-shadow bg-white p-6 md:p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold font-[family-name:var(--font-space-mono)]">Work Experience</h2>
          {!editingExp && (
            <button 
              onClick={() => setEditingExp({ company: '', role: '', startDate: '', endDate: '', summary: '', description: '', techStack: '' })}
              className="brutal-btn bg-accent-green text-black px-4 py-2 font-bold"
            >
              + Add New
            </button>
          )}
        </div>

        {/* Experience Form */}
        {editingExp && (
          <div className="mb-8 p-6 bg-gray-50 border-4 border-black border-dashed">
            <h3 className="text-xl font-bold mb-4">{editingExp.id ? 'Edit Experience' : 'Add New Experience'}</h3>
            <form onSubmit={saveExperience} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold mb-2">Company Name</label>
                  <input type="text" name="company" value={editingExp.company || ''} onChange={handleExpChange} className="w-full p-3 brutal-border focus:bg-accent-yellow outline-none" required />
                </div>
                <div>
                  <label className="block font-bold mb-2">Role/Title</label>
                  <input type="text" name="role" value={editingExp.role || ''} onChange={handleExpChange} className="w-full p-3 brutal-border focus:bg-accent-yellow outline-none" required />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold mb-2">Start Date</label>
                  <input type="date" name="startDate" value={formatDateForInput(editingExp.startDate)} onChange={handleExpChange} className="w-full p-3 brutal-border focus:bg-accent-yellow outline-none" required />
                </div>
                <div>
                  <label className="block font-bold mb-2">End Date (Leave blank if Present)</label>
                  <input type="date" name="endDate" value={formatDateForInput(editingExp.endDate)} onChange={handleExpChange} className="w-full p-3 brutal-border focus:bg-accent-yellow outline-none" />
                </div>
              </div>

              <div>
                <label className="block font-bold mb-2">Short Summary</label>
                <input type="text" name="summary" value={editingExp.summary || ''} onChange={handleExpChange} className="w-full p-3 brutal-border focus:bg-accent-yellow outline-none" required />
              </div>

              <div>
                <label className="block font-bold mb-2">Full Description</label>
                <textarea name="description" value={editingExp.description || ''} onChange={handleExpChange} className="w-full p-3 brutal-border focus:bg-accent-yellow outline-none" rows={4} required />
              </div>

              <div>
                <label className="block font-bold mb-2">Tech Stack (comma separated)</label>
                <input type="text" name="techStack" value={typeof editingExp.techStack === 'string' ? editingExp.techStack : (editingExp.techStack?.join(', ') || '')} onChange={handleExpChange} className="w-full p-3 brutal-border focus:bg-accent-yellow outline-none" placeholder="React, Next.js, Tailwind..." required />
              </div>

              <div className="flex gap-4 mt-6">
                <button type="submit" disabled={saving} className="brutal-btn bg-accent-blue text-white font-bold py-2 px-6">
                  {saving ? 'Saving...' : 'Save Experience'}
                </button>
                <button type="button" onClick={() => setEditingExp(null)} className="brutal-btn bg-white font-bold py-2 px-6">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Experience List */}
        <div className="space-y-4">
          {experiences.map(exp => (
            <div key={exp.id} className="brutal-border p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:bg-gray-50 transition-colors">
              <div>
                <h4 className="font-bold text-lg">{exp.role} <span className="text-accent-red">@ {exp.company}</span></h4>
                <p className="text-sm text-gray-600">{new Date(exp.startDate).getFullYear()} - {exp.endDate ? new Date(exp.endDate).getFullYear() : 'Present'}</p>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => setEditingExp(exp)} 
                  className="brutal-btn bg-accent-yellow px-3 py-1 text-sm font-bold"
                >
                  Edit
                </button>
                <button 
                  onClick={() => setDeletingId(`experience_${exp.id}`)} 
                  className="brutal-btn bg-accent-red text-white px-3 py-1 text-sm font-bold"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
          {experiences.length === 0 && (
            <p className="text-gray-500 italic">No work experiences added yet.</p>
          )}
        </div>
      </div>

      {/* Projects CRUD */}
      <div className="brutal-border brutal-shadow bg-white p-6 md:p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold font-[family-name:var(--font-space-mono)]">Projects</h2>
          {!editingProj && (
            <button 
              onClick={() => setEditingProj({ title: '', description: '', techStack: '', githubUrl: '', demoUrl: '', imageUrl: '', order: 0 })}
              className="brutal-btn bg-accent-green text-black px-4 py-2 font-bold"
            >
              + Add New
            </button>
          )}
        </div>

        {/* Project Form */}
        {editingProj && (
          <div className="mb-8 p-6 bg-gray-50 border-4 border-black border-dashed">
            <h3 className="text-xl font-bold mb-4">{editingProj.id ? 'Edit Project' : 'Add New Project'}</h3>
            <form onSubmit={saveProject} className="space-y-4">
              <div>
                <label className="block font-bold mb-2">Project Title</label>
                <input type="text" name="title" value={editingProj.title || ''} onChange={handleProjChange} className="w-full p-3 brutal-border focus:bg-accent-yellow outline-none" required />
              </div>

              <div>
                <label className="block font-bold mb-2">Description</label>
                <textarea name="description" value={editingProj.description || ''} onChange={handleProjChange} className="w-full p-3 brutal-border focus:bg-accent-yellow outline-none" rows={3} required />
              </div>

              <div>
                <label className="block font-bold mb-2">Tech Stack (comma separated)</label>
                <input type="text" name="techStack" value={typeof editingProj.techStack === 'string' ? editingProj.techStack : (editingProj.techStack?.join(', ') || '')} onChange={handleProjChange} className="w-full p-3 brutal-border focus:bg-accent-yellow outline-none" placeholder="React, Node.js, Postgres..." required />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold mb-2">GitHub URL</label>
                  <input type="url" name="githubUrl" value={editingProj.githubUrl || ''} onChange={handleProjChange} className="w-full p-3 brutal-border focus:bg-accent-yellow outline-none" />
                </div>
                <div>
                  <label className="block font-bold mb-2">Demo URL</label>
                  <input type="url" name="demoUrl" value={editingProj.demoUrl || ''} onChange={handleProjChange} className="w-full p-3 brutal-border focus:bg-accent-yellow outline-none" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold mb-2">Image URL (optional)</label>
                  <input type="text" name="imageUrl" value={editingProj.imageUrl || ''} onChange={handleProjChange} className="w-full p-3 brutal-border focus:bg-accent-yellow outline-none" />
                </div>
                <div>
                  <label className="block font-bold mb-2">Sort Order</label>
                  <input type="number" name="order" value={editingProj.order || 0} onChange={handleProjChange} className="w-full p-3 brutal-border focus:bg-accent-yellow outline-none" />
                </div>
              </div>

              <div className="flex gap-4 mt-6">
                <button type="submit" disabled={saving} className="brutal-btn bg-accent-blue text-white font-bold py-2 px-6">
                  {saving ? 'Saving...' : 'Save Project'}
                </button>
                <button type="button" onClick={() => setEditingProj(null)} className="brutal-btn bg-white font-bold py-2 px-6">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Project List */}
        <div className="space-y-4">
          {projects.map(proj => (
            <div key={proj.id} className="brutal-border p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:bg-gray-50 transition-colors">
              <div>
                <h4 className="font-bold text-lg">{proj.title}</h4>
                <p className="text-sm text-gray-600 line-clamp-1">{proj.description}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button 
                  onClick={() => setEditingProj(proj)} 
                  className="brutal-btn bg-accent-yellow px-3 py-1 text-sm font-bold"
                >
                  Edit
                </button>
                <button 
                  onClick={() => setDeletingId(`project_${proj.id}`)} 
                  className="brutal-btn bg-accent-red text-white px-3 py-1 text-sm font-bold"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
          {projects.length === 0 && (
            <p className="text-gray-500 italic">No projects added yet.</p>
          )}
        </div>
      </div>

      {/* Tech Stack CRUD */}
      <div className="brutal-border brutal-shadow bg-white p-6 md:p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold font-[family-name:var(--font-space-mono)]">Tech Stack</h2>
          {!editingTech && (
            <button 
              onClick={() => setEditingTech({ name: '', imageUrl: '', order: 0 })}
              className="brutal-btn bg-accent-green text-black px-4 py-2 font-bold"
            >
              + Add New
            </button>
          )}
        </div>

        {/* Tech Stack Form */}
        {editingTech && (
          <div className="mb-8 p-6 bg-gray-50 border-4 border-black border-dashed">
            <h3 className="text-xl font-bold mb-4">{editingTech.id ? 'Edit Tech Stack' : 'Add New Tech Stack'}</h3>
            <form onSubmit={saveTechStack} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold mb-2">Tech Name</label>
                  <input type="text" name="name" value={editingTech.name || ''} onChange={handleTechChange} className="w-full p-3 brutal-border focus:bg-accent-yellow outline-none" required />
                </div>
                <div>
                  <label className="block font-bold mb-2">Image URL (Icon)</label>
                  <input type="text" name="imageUrl" value={editingTech.imageUrl || ''} onChange={handleTechChange} className="w-full p-3 brutal-border focus:bg-accent-yellow outline-none" required />
                </div>
              </div>

              <div>
                <label className="block font-bold mb-2">Sort Order</label>
                <input type="number" name="order" value={editingTech.order || 0} onChange={handleTechChange} className="w-full p-3 brutal-border focus:bg-accent-yellow outline-none" />
              </div>

              <div className="flex gap-4 mt-6">
                <button type="submit" disabled={saving} className="brutal-btn bg-accent-blue text-white font-bold py-2 px-6">
                  {saving ? 'Saving...' : 'Save Tech Stack'}
                </button>
                <button type="button" onClick={() => setEditingTech(null)} className="brutal-btn bg-white font-bold py-2 px-6">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Tech Stack List */}
        <div className="space-y-4">
          {techStacks.map(tech => (
            <div key={tech.id} className="brutal-border p-4 flex flex-col md:flex-row justify-between items-center gap-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-4">
                <img src={tech.imageUrl} alt={tech.name} className="w-8 h-8 object-contain" />
                <h4 className="font-bold text-lg">{tech.name}</h4>
              </div>
              <div className="flex gap-2 shrink-0">
                <button 
                  onClick={() => setEditingTech(tech)} 
                  className="brutal-btn bg-accent-yellow px-3 py-1 text-sm font-bold"
                >
                  Edit
                </button>
                <button 
                  onClick={() => setDeletingId(`techstack_${tech.id}`)} 
                  className="brutal-btn bg-accent-red text-white px-3 py-1 text-sm font-bold"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
          {techStacks.length === 0 && (
            <p className="text-gray-500 italic">No tech stack added yet.</p>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deletingId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
          <div className="brutal-border brutal-shadow-lg bg-white p-6 max-w-sm w-full">
            <h3 className="text-xl font-bold font-[family-name:var(--font-space-mono)] mb-4">Confirm Deletion</h3>
            <p className="mb-6">Are you sure you want to delete this {deletingId.startsWith('experience') ? 'work experience' : deletingId.startsWith('project') ? 'project' : 'tech stack'}? This cannot be undone.</p>
            <div className="flex gap-4">
              <button 
                onClick={confirmDelete}
                className="brutal-btn bg-accent-red text-white flex-1 py-2 font-bold"
              >
                Yes, Delete
              </button>
              <button 
                onClick={() => setDeletingId(null)}
                className="brutal-btn bg-white flex-1 py-2 font-bold"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CV Extraction Modal */}
      {extractedCVData !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
          <div className="brutal-border brutal-shadow-lg bg-white p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold font-[family-name:var(--font-space-mono)] mb-4 bg-accent-yellow inline-block px-2 border-2 border-black">Data Extracted!</h3>
            <p className="mb-4 text-sm font-bold">We found some data in your CV. Would you like to apply it?</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-3 bg-gray-50 p-4 brutal-border text-sm">
                <h4 className="font-bold border-b-2 border-black pb-2 mb-2">Profile Data</h4>
                {extractedCVData.guessedName && (
                  <div><span className="font-bold">Name:</span> {extractedCVData.guessedName}</div>
                )}
                {extractedCVData.title && (
                  <div><span className="font-bold">Job Title:</span> {extractedCVData.title}</div>
                )}
                {extractedCVData.email && (
                  <div><span className="font-bold">Email:</span> {extractedCVData.email}</div>
                )}
                {extractedCVData.phone && (
                  <div><span className="font-bold">Phone:</span> {extractedCVData.phone}</div>
                )}
                {extractedCVData.linkedin && (
                  <div><span className="font-bold">LinkedIn:</span> {extractedCVData.linkedin}</div>
                )}
                {extractedCVData.heroTitle && (
                  <div><span className="font-bold">Hero Title:</span> {extractedCVData.heroTitle}</div>
                )}
              </div>

              {extractedCVData.experiences && extractedCVData.experiences.length > 0 && (
                <div className="space-y-3 bg-gray-50 p-4 brutal-border text-sm overflow-y-auto max-h-48">
                  <h4 className="font-bold border-b-2 border-black pb-2 mb-2">Work Experience ({extractedCVData.experiences.length})</h4>
                  {extractedCVData.experiences.map((exp: any, i: number) => (
                    <div key={i} className="mb-2 pb-2 border-b border-gray-300 last:border-0">
                      <div className="font-bold">{exp.role} @ {exp.company}</div>
                      <div className="text-xs text-gray-600">{exp.startDate} - {exp.endDate || 'Present'}</div>
                      <div className="text-xs line-clamp-2 mt-1">{exp.summary}</div>
                    </div>
                  ))}
                </div>
              )}

              {extractedCVData.projects && extractedCVData.projects.length > 0 && (
                <div className="space-y-3 bg-gray-50 p-4 brutal-border text-sm overflow-y-auto max-h-48 md:col-span-2">
                  <h4 className="font-bold border-b-2 border-black pb-2 mb-2">Projects ({extractedCVData.projects.length})</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {extractedCVData.projects.map((proj: any, i: number) => (
                      <div key={i} className="mb-2 pb-2 border-b md:border-b-0 border-gray-300">
                        <div className="font-bold">{proj.title}</div>
                        <div className="text-xs line-clamp-2 mt-1">{proj.description}</div>
                        {proj.techStack && proj.techStack.length > 0 && (
                          <div className="text-xs mt-1 text-gray-500">Tech: {proj.techStack.join(', ')}</div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-4">
              <button 
                onClick={async () => {
                  setProfile({
                    ...profile,
                    ...(extractedCVData.guessedName ? { fullName: extractedCVData.guessedName } : {}),
                    ...(extractedCVData.title ? { title: extractedCVData.title } : {}),
                    ...(extractedCVData.email ? { email: extractedCVData.email } : {}),
                    ...(extractedCVData.phone ? { phone: extractedCVData.phone, whatsapp: extractedCVData.phone } : {}),
                    ...(extractedCVData.linkedin ? { linkedin: extractedCVData.linkedin } : {}),
                    ...(extractedCVData.heroTitle ? { heroTitle: extractedCVData.heroTitle } : {}),
                  });
                  
                  let newExperiences = [];
                  let newProjects = [];

                  // Auto-save experiences if there are any
                  if (extractedCVData.experiences && extractedCVData.experiences.length > 0) {
                    setMessage({ type: 'success', text: 'Saving extracted experiences...' });
                    for (const exp of extractedCVData.experiences) {
                      const res = await fetch('/api/admin/experience', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(exp)
                      });
                      if (res.ok) {
                        const data = await res.json();
                        if (data.experience) newExperiences.push(data.experience);
                      }
                    }
                  }

                  // Auto-save projects if there are any
                  if (extractedCVData.projects && extractedCVData.projects.length > 0) {
                    setMessage({ type: 'success', text: 'Saving extracted projects...' });
                    for (const proj of extractedCVData.projects) {
                      const res = await fetch('/api/admin/project', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                          title: proj.title,
                          description: proj.description,
                          techStack: proj.techStack ? proj.techStack.join(', ') : '',
                          imageUrl: 'https://via.placeholder.com/600x400',
                          githubUrl: '',
                          liveUrl: ''
                        })
                      });
                      if (res.ok) {
                        const data = await res.json();
                        if (data.project) newProjects.push(data.project);
                      }
                    }
                  }

                  if (newExperiences.length > 0) {
                    setExperiences(prev => [...prev, ...newExperiences]);
                  }
                  
                  if (newProjects.length > 0) {
                    setProjects(prev => [...prev, ...newProjects]);
                  }

                  if (newExperiences.length > 0 || newProjects.length > 0) {
                    router.refresh();
                  }

                  setExtractedCVData(null);
                  setMessage({ type: 'success', text: 'Data applied! Experiences & Projects saved. Click "Save Changes" to save profile.' })
                }}
                className="brutal-btn bg-accent-green text-black flex-1 py-2 font-bold"
              >
                Apply Data
              </button>
              <button 
                onClick={() => setExtractedCVData(null)}
                className="brutal-btn bg-white flex-1 py-2 font-bold"
              >
                Ignore
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
