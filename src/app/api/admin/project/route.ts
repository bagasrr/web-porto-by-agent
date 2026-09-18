import { createProject, updateProject, deleteProject } from '@/lib/data'
import { syncTechStackNames } from '@/lib/data'
import { NextResponse } from 'next/server'

function parseTagArray(value: unknown): string[] {
  if (Array.isArray(value)) return value.map(String).filter(Boolean)
  if (typeof value === 'string') return value.split(',').map(s => s.trim()).filter(Boolean)
  return []
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const techStack = parseTagArray(data.techStack)
    await syncTechStackNames(techStack)
    const project = await createProject({
      title: data.title,
      description: data.description,
      techStack,
      githubUrl: data.githubUrl || null,
      demoUrl: data.demoUrl || null,
      imageUrl: data.imageUrl || null,
      order: parseInt(data.order) || 0,
    })
    return NextResponse.json({ success: true, project })
  } catch (error) {
    console.error('[API/project POST]', error)
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json()
    const techStack = parseTagArray(data.techStack)
    await syncTechStackNames(techStack)
    const project = await updateProject(parseInt(data.id), {
      title: data.title,
      description: data.description,
      techStack,
      githubUrl: data.githubUrl || null,
      demoUrl: data.demoUrl || null,
      imageUrl: data.imageUrl || null,
      order: parseInt(data.order) || 0,
    })
    return NextResponse.json({ success: true, project })
  } catch (error) {
    console.error('[API/project PUT]', error)
    return NextResponse.json({ error: 'Failed to update project' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 })
    await deleteProject(parseInt(id))
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[API/project DELETE]', error)
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 })
  }
}
