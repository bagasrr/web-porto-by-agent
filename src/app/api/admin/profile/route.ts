import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const { id, ...updateData } = data
    // Remove fields that shouldn't be manually updated
    delete updateData.createdAt;
    delete updateData.updatedAt;

    const profile = await prisma.profile.upsert({
      where: { id: id || 1 },
      update: updateData,
      create: {
        id: 1,
        fullName: updateData.fullName || '',
        title: updateData.title || '',
        heroTitle: updateData.heroTitle || '',
        email: updateData.email || '',
        phone: updateData.phone || '',
        linkedin: updateData.linkedin || '',
        whatsapp: updateData.whatsapp || '',
      }
    })
    
    return NextResponse.json({ success: true, profile })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 })
  }
}
