import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  const profile = await prisma.profile.findFirst()
  const experiences = await prisma.workExperience.findMany({
    orderBy: { order: 'asc' },
  })
  const projects = await prisma.project.findMany({
    orderBy: { order: 'asc' },
  })

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric' }).format(date)
  }

  let cv = `${profile?.fullName || 'Name'}\n`
  cv += `${profile?.title || 'Software Engineer'}\n`
  cv += `${'='.repeat(50)}\n\n`
  cv += `Email: ${profile?.email || ''}\n`
  cv += `LinkedIn: ${profile?.linkedin || ''}\n`
  cv += `WhatsApp: ${profile?.whatsapp || ''}\n\n`

  cv += `WORK EXPERIENCE\n`
  cv += `${'-'.repeat(50)}\n\n`
  for (const exp of experiences) {
    cv += `${exp.role} at ${exp.company}\n`
    cv += `${formatDate(exp.startDate)} - ${exp.endDate ? formatDate(exp.endDate) : 'Present'}\n`
    cv += `${exp.description}\n`
    cv += `Tech: ${exp.techStack.join(', ')}\n\n`
  }

  cv += `PROJECTS\n`
  cv += `${'-'.repeat(50)}\n\n`
  for (const project of projects) {
    cv += `${project.title}\n`
    cv += `${project.description}\n`
    cv += `Tech: ${project.techStack.join(', ')}\n`
    if (project.githubUrl) cv += `GitHub: ${project.githubUrl}\n`
    if (project.demoUrl) cv += `Demo: ${project.demoUrl}\n`
    cv += `\n`
  }

  return new NextResponse(cv, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Content-Disposition': `attachment; filename="${(profile?.fullName || 'CV').replace(/\s+/g, '_')}_CV.txt"`,
    },
  })
}
