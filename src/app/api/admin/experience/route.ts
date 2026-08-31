import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const techStackArray = Array.isArray(data.techStack) 
      ? data.techStack 
      : data.techStack.split(',').map((t: string) => t.trim()).filter(Boolean)

    const newExperience = await prisma.workExperience.create({
      data: {
        company: data.company,
        role: data.role,
        startDate: new Date(data.startDate),
        endDate: data.endDate ? new Date(data.endDate) : null,
        summary: data.summary,
        description: data.description,
        techStack: techStackArray,
        order: parseInt(data.order) || 0,
      }
    })
    return NextResponse.json({ success: true, experience: newExperience })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create experience' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json()
    const techStackArray = Array.isArray(data.techStack) 
      ? data.techStack 
      : data.techStack.split(',').map((t: string) => t.trim()).filter(Boolean)

    const updatedExperience = await prisma.workExperience.update({
      where: { id: parseInt(data.id) },
      data: {
        company: data.company,
        role: data.role,
        startDate: new Date(data.startDate),
        endDate: data.endDate ? new Date(data.endDate) : null,
        summary: data.summary,
        description: data.description,
        techStack: techStackArray,
        order: parseInt(data.order) || 0,
      }
    })
    return NextResponse.json({ success: true, experience: updatedExperience })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update experience' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 })

    await prisma.workExperience.delete({
      where: { id: parseInt(id) }
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete experience' }, { status: 500 })
  }
}
