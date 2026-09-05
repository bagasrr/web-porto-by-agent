import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()
    const techStack = await prisma.techStack.create({
      data: {
        name: data.name,
        imageUrl: data.imageUrl,
        order: parseInt(data.order) || 0,
      }
    })
    return NextResponse.json({ success: true, techStack })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create tech stack' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  try {
    const data = await req.json()
    const { id, ...updateData } = data
    const techStack = await prisma.techStack.update({
      where: { id: parseInt(id) },
      data: {
        name: updateData.name,
        imageUrl: updateData.imageUrl,
        order: parseInt(updateData.order) || 0,
      }
    })
    return NextResponse.json({ success: true, techStack })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update tech stack' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    
    if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 })
    
    await prisma.techStack.delete({
      where: { id: parseInt(id) }
    })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete tech stack' }, { status: 500 })
  }
}
