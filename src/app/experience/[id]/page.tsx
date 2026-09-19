import { getExperienceById, getProfile } from '@/lib/data'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { HiArrowLeft, HiCalendar, HiBriefcase } from 'react-icons/hi'
import Footer from '@/components/Footer'

export default async function ExperienceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const [experience, profile] = await Promise.all([
    getExperienceById(parseInt(id)),
    getProfile(),
  ])

  if (!experience) {
    notFound()
  }

  const formatDate = (date: string | Date): string => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      year: 'numeric',
    }).format(new Date(date as string))
  }

  return (
    <>
      <div className="min-h-screen pt-20 pb-16">
        <div className="max-w-3xl mx-auto px-4">
          {/* Back button */}
          <Link
            href="/#experience"
            className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-accent transition-colors mb-10 group"
          >
            <HiArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Experience
          </Link>

          {/* Header card */}
          <div className="card mb-8 relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-glow-primary rounded-full blur-3xl" />

            <div className="relative">
              <span className="eyebrow block mb-4">Work Experience</span>
              <h1 className="text-3xl md:text-4xl font-bold font-display text-text mb-3 leading-tight">
                {experience.role}
              </h1>
              <p className="text-xl font-semibold text-accent mb-5">
                {experience.company}
              </p>

              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2 text-text-secondary text-sm">
                  <HiCalendar size={15} className="text-text-muted" />
                  <span>
                    {formatDate(experience.startDate)} —{' '}
                    {experience.endDate ? formatDate(experience.endDate) : 'Present'}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-text-secondary text-sm">
                  <HiBriefcase size={15} className="text-text-muted" />
                  <span>{experience.company}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="card mb-6">
            <h2 className="text-sm font-bold text-text-muted uppercase tracking-widest mb-3">Summary</h2>
            <p className="text-text-secondary leading-relaxed">
              {experience.summary}
            </p>
          </div>

          {/* Full description */}
          <div className="card mb-6">
            <h2 className="text-sm font-bold text-text-muted uppercase tracking-widest mb-3">Description</h2>
            <p className="text-text-secondary leading-relaxed whitespace-pre-line">
              {experience.description}
            </p>
          </div>

          {/* Tech stack */}
          <div className="card">
            <h2 className="text-sm font-bold text-text-muted uppercase tracking-widest mb-4">Technologies</h2>
            <div className="flex flex-wrap gap-2">
              {experience.techStack.map((tech) => (
                <span key={tech} className="badge badge-primary">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer profile={profile} />
    </>
  )
}
