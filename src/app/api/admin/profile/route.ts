import { saveProfile } from '@/lib/data'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const profile = await saveProfile(data)
    return NextResponse.json({ success: true, profile })
  } catch (error) {
    console.error('[API/profile]', error)
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 })
  }
}
