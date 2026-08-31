import { NextResponse } from 'next/server'
import { writeFile } from 'fs/promises'
import path from 'path'

export async function POST(request: Request) {
  try {
    const data = await request.formData()
    const file: File | null = data.get('file') as unknown as File
    
    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }
    
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    
    // Save to public directory
    const filename = 'cv.pdf'
    const filepath = path.join(process.cwd(), 'public', filename)
    await writeFile(filepath, buffer)
    
    return NextResponse.json({ success: true, url: `/${filename}` })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 })
  }
}
