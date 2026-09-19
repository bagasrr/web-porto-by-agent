import { readJsonFile, writeJsonFile } from './json-store'
import { prisma } from './prisma'

// ──────────────────────────────────────────────────────────
// Types
// ──────────────────────────────────────────────────────────

export type Profile = {
  id: number
  fullName: string
  title: string
  heroTitle: string
  email: string
  phone: string
  linkedin: string
  whatsapp: string
  cvUrl?: string | null
  theme: string
  updatedAt?: string
}

export type WorkExperience = {
  id: number
  company: string
  role: string
  startDate: string | Date
  endDate: string | Date | null
  summary: string
  description: string
  techStack: string[]
  order: number
  updatedAt?: string
}

export type Project = {
  id: number
  title: string
  shortDescription?: string | null
  description: string
  techStack: string[]
  githubUrl?: string | null
  demoUrl?: string | null
  imageUrl?: string | null
  order: number
  updatedAt?: string
}

export type TechStack = {
  id: number
  name: string
  imageUrl: string
  order: number
  updatedAt?: string
}

// ──────────────────────────────────────────────────────────
// Profile
// ──────────────────────────────────────────────────────────

export async function getProfile(): Promise<Profile | null> {
  try {
    const result = await prisma.profile.findFirst()
    if (result) return result as unknown as Profile
  } catch {
    // DB unavailable — fall back to JSON
  }
  const data = await readJsonFile<Profile | null>('profile.json', null)
  return data
}

export async function saveProfile(data: Partial<Profile>): Promise<Profile> {
  const { id, ...rest } = data as Record<string, any>
  delete rest.createdAt
  delete rest.updatedAt

  // Write to DB
  const result = await prisma.profile.upsert({
    where: { id: (id as number) || 1 },
    update: rest,
    create: {
      id: 1,
      fullName: rest.fullName || '',
      title: rest.title || '',
      heroTitle: rest.heroTitle || '',
      email: rest.email || '',
      phone: rest.phone || '',
      linkedin: rest.linkedin || '',
      whatsapp: rest.whatsapp || '',
      theme: rest.theme || 'dark',
    },
  }) as unknown as Profile

  // Backup to JSON
  await writeJsonFile('profile.json', {
    ...result,
    updatedAt: new Date().toISOString(),
  })

  return result
}

// ──────────────────────────────────────────────────────────
// Work Experiences
// ──────────────────────────────────────────────────────────

export async function getExperiences(): Promise<WorkExperience[]> {
  try {
    const results = await prisma.workExperience.findMany({
      orderBy: { startDate: 'desc' },
    })
    if (results.length >= 0) return results as unknown as WorkExperience[]
  } catch {
    // DB unavailable
  }
  return readJsonFile<WorkExperience[]>('experiences.json', [])
}

export async function getExperienceById(id: number): Promise<WorkExperience | null> {
  try {
    const result = await prisma.workExperience.findUnique({ where: { id } })
    if (result) return result as unknown as WorkExperience
  } catch {
    // DB unavailable
  }
  const all = await readJsonFile<WorkExperience[]>('experiences.json', [])
  return all.find(e => e.id === id) ?? null
}

async function syncExperiencesToJson() {
  try {
    const all = await prisma.workExperience.findMany({ orderBy: { startDate: 'desc' } })
    await writeJsonFile('experiences.json', all.map(e => ({
      ...e,
      startDate: (e.startDate as Date).toISOString(),
      endDate: e.endDate ? (e.endDate as Date).toISOString() : null,
      updatedAt: (e.updatedAt as Date).toISOString(),
    })))
  } catch {
    // Ignore backup failure
  }
}

export async function createExperience(data: Omit<WorkExperience, 'id' | 'updatedAt'>): Promise<WorkExperience> {
  const result = await prisma.workExperience.create({
    data: {
      company: data.company,
      role: data.role,
      startDate: new Date(data.startDate),
      endDate: data.endDate ? new Date(data.endDate) : null,
      summary: data.summary,
      description: data.description,
      techStack: data.techStack,
      order: data.order || 0,
    },
  }) as unknown as WorkExperience
  await syncExperiencesToJson()
  return result
}

export async function updateExperience(id: number, data: Partial<WorkExperience>): Promise<WorkExperience> {
  const result = await prisma.workExperience.update({
    where: { id },
    data: {
      company: data.company,
      role: data.role,
      startDate: data.startDate ? new Date(data.startDate) : undefined,
      endDate: data.endDate ? new Date(data.endDate) : null,
      summary: data.summary,
      description: data.description,
      techStack: data.techStack,
      order: data.order,
    },
  }) as unknown as WorkExperience
  await syncExperiencesToJson()
  return result
}

export async function deleteExperience(id: number): Promise<void> {
  await prisma.workExperience.delete({ where: { id } })
  await syncExperiencesToJson()
}

// ──────────────────────────────────────────────────────────
// Projects
// ──────────────────────────────────────────────────────────

export async function getProjects(): Promise<Project[]> {
  try {
    const results = await prisma.project.findMany({ orderBy: { order: 'asc' } })
    if (results.length >= 0) return results as unknown as Project[]
  } catch {
    // DB unavailable
  }
  return readJsonFile<Project[]>('projects.json', [])
}

export async function getProjectById(id: number): Promise<Project | null> {
  try {
    const result = await prisma.project.findUnique({ where: { id } })
    if (result) return result as unknown as Project
  } catch {
    // DB unavailable
  }
  const all = await readJsonFile<Project[]>('projects.json', [])
  return all.find(p => p.id === id) ?? null
}

async function syncProjectsToJson() {
  try {
    const all = await prisma.project.findMany({ orderBy: { order: 'asc' } })
    await writeJsonFile('projects.json', all.map(p => ({
      ...p,
      updatedAt: (p.updatedAt as Date).toISOString(),
    })))
  } catch {
    // Ignore backup failure
  }
}

export async function createProject(data: Omit<Project, 'id' | 'updatedAt'>): Promise<Project> {
  const result = await prisma.project.create({
    data: {
      title: data.title,
      shortDescription: data.shortDescription || null,
      description: data.description,
      techStack: data.techStack,
      githubUrl: data.githubUrl || null,
      demoUrl: data.demoUrl || null,
      imageUrl: data.imageUrl || null,
      order: data.order || 0,
    },
  }) as unknown as Project
  await syncProjectsToJson()
  return result
}

export async function updateProject(id: number, data: Partial<Project>): Promise<Project> {
  const result = await prisma.project.update({
    where: { id },
    data: {
      title: data.title,
      shortDescription: data.shortDescription !== undefined ? (data.shortDescription || null) : undefined,
      description: data.description,
      techStack: data.techStack,
      githubUrl: data.githubUrl || null,
      demoUrl: data.demoUrl || null,
      imageUrl: data.imageUrl || null,
      order: data.order,
    },
  }) as unknown as Project
  await syncProjectsToJson()
  return result
}

export async function deleteProject(id: number): Promise<void> {
  await prisma.project.delete({ where: { id } })
  await syncProjectsToJson()
}

// ──────────────────────────────────────────────────────────
// TechStacks
// ──────────────────────────────────────────────────────────

export async function getTechStacks(): Promise<TechStack[]> {
  try {
    const results = await prisma.techStack.findMany({ orderBy: { order: 'asc' } })
    if (results.length >= 0) return results as unknown as TechStack[]
  } catch {
    // DB unavailable
  }
  return readJsonFile<TechStack[]>('techstacks.json', [])
}

async function syncTechStacksToJson() {
  try {
    const all = await prisma.techStack.findMany({ orderBy: { order: 'asc' } })
    await writeJsonFile('techstacks.json', all.map(t => ({
      ...t,
      updatedAt: (t.updatedAt as Date).toISOString(),
    })))
  } catch {
    // Ignore backup failure
  }
}

export async function createTechStack(data: Omit<TechStack, 'id' | 'updatedAt'>): Promise<TechStack> {
  const result = await prisma.techStack.create({
    data: {
      name: data.name,
      imageUrl: data.imageUrl,
      order: data.order || 0,
    },
  }) as unknown as TechStack
  await syncTechStacksToJson()
  return result
}

export async function updateTechStack(id: number, data: Partial<TechStack>): Promise<TechStack> {
  const result = await prisma.techStack.update({
    where: { id },
    data: {
      name: data.name,
      imageUrl: data.imageUrl,
      order: data.order,
    },
  }) as unknown as TechStack
  await syncTechStacksToJson()
  return result
}

export async function deleteTechStack(id: number): Promise<void> {
  await prisma.techStack.delete({ where: { id } })
  await syncTechStacksToJson()
}

// ──────────────────────────────────────────────────────────
// syncTechStack helper (used by experience/project routes)
// ──────────────────────────────────────────────────────────

export async function syncTechStackNames(names: string[]) {
  if (!names || names.length === 0) return
  try {
    const existing = await prisma.techStack.findMany({
      where: { name: { in: names, mode: 'insensitive' } },
    })
    const existingNames = new Set(existing.map(s => s.name.toLowerCase()))
    const missing = names.filter(n => !existingNames.has(n.toLowerCase()))
    for (const name of missing) {
      const cleanName = name.toLowerCase().replace(/[^a-z0-9]/g, '')
      await prisma.techStack.create({
        data: {
          name,
          imageUrl: `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${cleanName}/${cleanName}-original.svg`,
          order: 0,
        },
      })
    }
    if (missing.length > 0) await syncTechStacksToJson()
  } catch {
    // Ignore
  }
}
