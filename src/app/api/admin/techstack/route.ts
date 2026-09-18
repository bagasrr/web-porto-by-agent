import { createTechStack, updateTechStack, deleteTechStack } from '@/lib/data'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()
    const techStack = await createTechStack({
      name: data.name,
      imageUrl: data.imageUrl,
      order: parseInt(data.order) || 0,
    })
    return NextResponse.json({ success: true, techStack })
  } catch (error) {
    console.error('[API/techstack POST]', error)
    return NextResponse.json({ error: 'Failed to create tech stack' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  try {
    const data = await req.json()
    const techStack = await updateTechStack(parseInt(data.id), {
      name: data.name,
      imageUrl: data.imageUrl,
      order: parseInt(data.order) || 0,
    })
    return NextResponse.json({ success: true, techStack })
  } catch (error) {
    console.error('[API/techstack PUT]', error)
    return NextResponse.json({ error: 'Failed to update tech stack' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 })
    await deleteTechStack(parseInt(id))
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[API/techstack DELETE]', error)
    return NextResponse.json({ error: 'Failed to delete tech stack' }, { status: 500 })
  }
}
