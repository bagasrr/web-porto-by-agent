import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export default async function ExperienceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const experience = await prisma.workExperience.findUnique({
    where: { id: parseInt(id) },
  })

  if (!experience) {
    notFound()
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(date)
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 md:py-20">
      <Link
        href="/"
        className="brutal-btn bg-accent-yellow px-4 py-2 font-bold inline-block mb-8"
      >
        ← Back
      </Link>

      <div className="brutal-border brutal-shadow-lg bg-white p-6 md:p-10">
        <div className="mb-6">
          <h1 className="text-3xl md:text-5xl font-bold font-[family-name:var(--font-space-mono)] mb-2">
            {experience.role}
          </h1>
          <p className="text-xl md:text-2xl font-bold text-accent-red">
            {experience.company}
          </p>
          <p className="mt-3 text-sm md:text-base font-bold bg-accent-yellow px-3 py-1 brutal-border inline-block">
            {formatDate(experience.startDate)} — {experience.endDate ? formatDate(experience.endDate) : 'Present'}
          </p>
        </div>

        <div className="border-t-4 border-black pt-6">
          <h2 className="text-xl font-bold mb-4">Description</h2>
          <p className="text-base md:text-lg leading-relaxed whitespace-pre-line">
            {experience.description}
          </p>
        </div>

        <div className="border-t-4 border-black pt-6 mt-6">
          <h2 className="text-xl font-bold mb-4">Tech Stack</h2>
          <div className="flex flex-wrap gap-2">
            {experience.techStack.map((tech) => (
              <span
                key={tech}
                className="text-sm font-bold bg-accent-blue text-white px-3 py-1 brutal-border"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
