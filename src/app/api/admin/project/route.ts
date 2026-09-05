import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { syncTechStack } from '@/lib/syncTechStack'

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const techStackArray = Array.isArray(data.techStack) 
      ? data.techStack 
      : data.techStack.split(',').map((t: string) => t.trim()).filter(Boolean)

    await syncTechStack(techStackArray)

    const newProject = await prisma.project.create({
      data: {
        title: data.title,
        description: data.description,
        techStack: techStackArray,
        githubUrl: data.githubUrl || null,
        demoUrl: data.demoUrl || null,
        imageUrl: data.imageUrl || null,
        order: parseInt(data.order) || 0,
      }
    })
    return NextResponse.json({ success: true, project: newProject })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json()
    const techStackArray = Array.isArray(data.techStack) 
      ? data.techStack 
      : data.techStack.split(',').map((t: string) => t.trim()).filter(Boolean)

    await syncTechStack(techStackArray)

    const updatedProject = await prisma.project.update({
      where: { id: parseInt(data.id) },
      data: {
        title: data.title,
        description: data.description,
        techStack: techStackArray,
        githubUrl: data.githubUrl || null,
        demoUrl: data.demoUrl || null,
        imageUrl: data.imageUrl || null,
        order: parseInt(data.order) || 0,
      }
    })
    return NextResponse.json({ success: true, project: updatedProject })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update project' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 })

    await prisma.project.delete({
      where: { id: parseInt(id) }
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 })
  }
}
