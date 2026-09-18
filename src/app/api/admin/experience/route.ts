import { createExperience, updateExperience, deleteExperience } from '@/lib/data'
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
    const experience = await createExperience({
      company: data.company,
      role: data.role,
      startDate: new Date(data.startDate),
      endDate: data.endDate ? new Date(data.endDate) : null,
      summary: data.summary,
      description: data.description,
      techStack,
      order: parseInt(data.order) || 0,
    })
    return NextResponse.json({ success: true, experience })
  } catch (error) {
    console.error('[API/experience POST]', error)
    return NextResponse.json({ error: 'Failed to create experience' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json()
    const techStack = parseTagArray(data.techStack)
    await syncTechStackNames(techStack)
    const experience = await updateExperience(parseInt(data.id), {
      company: data.company,
      role: data.role,
      startDate: new Date(data.startDate),
      endDate: data.endDate ? new Date(data.endDate) : null,
      summary: data.summary,
      description: data.description,
      techStack,
      order: parseInt(data.order) || 0,
    })
    return NextResponse.json({ success: true, experience })
  } catch (error) {
    console.error('[API/experience PUT]', error)
    return NextResponse.json({ error: 'Failed to update experience' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 })
    await deleteExperience(parseInt(id))
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[API/experience DELETE]', error)
    return NextResponse.json({ error: 'Failed to delete experience' }, { status: 500 })
  }
}
