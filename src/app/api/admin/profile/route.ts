import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const { id, ...updateData } = data
    
    const profile = await prisma.profile.update({
      where: { id: id || 1 },
      data: updateData
    })
    
    return NextResponse.json({ success: true, profile })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 })
  }
}
