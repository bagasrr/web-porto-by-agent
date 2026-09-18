import Link from 'next/link'
import type { WorkExperience } from '@/lib/data'

type ExperienceSectionProps = {
  experiences: WorkExperience[]
}

function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    year: 'numeric',
  }).format(new Date(date as string))
}

export default function WorkExperienceSection({ experiences }: ExperienceSectionProps) {
  return (
    <section id="experience" className="section">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-12">
          <p className="eyebrow mb-3">Career</p>
          <h2 className="text-3xl md:text-5xl font-bold font-[family-name:var(--font-display)] text-[var(--text)] leading-tight">
            Work{' '}
            <span className="text-gradient">Experience</span>
          </h2>
        </div>

        {experiences.length === 0 ? (
          <p className="text-[var(--text-muted)]">No experiences listed yet.</p>
        ) : (
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[var(--accent)] via-[var(--border-color)] to-transparent ml-4 md:ml-0 -translate-x-1/2" />

            <div className="space-y-8">
              {experiences.map((exp, i) => (
                <div
                  key={exp.id}
                  className={`relative flex gap-8 md:gap-0 ${
                    i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Timeline node */}
                  <div className="absolute left-4 md:left-1/2 top-8 w-3 h-3 rounded-full bg-[var(--accent)] border-2 border-[var(--bg)] shadow-lg shadow-[var(--glow-accent)] -translate-x-1/2 z-10" />

                  {/* Date (desktop only, on opposite side) */}
                  <div className={`hidden md:flex md:w-1/2 items-start ${i % 2 === 0 ? 'justify-end pr-10 pt-7' : 'justify-start pl-10 pt-7'}`}>
                    <div className="text-right">
                      <span className="text-sm font-semibold text-[var(--accent)]">
                        {formatDate(exp.startDate)} — {exp.endDate ? formatDate(exp.endDate) : 'Present'}
                      </span>
                    </div>
                  </div>

                  {/* Card */}
                  <div className={`pl-12 md:pl-0 md:w-1/2 ${i % 2 === 0 ? 'md:pl-10' : 'md:pr-10'}`}>
                    <Link href={`/experience/${exp.id}`} className="block group">
                      <article className="card card-hover cursor-pointer">
                        {/* Mobile date */}
                        <div className="md:hidden mb-3">
                          <span className="badge badge-primary text-xs">
                            {formatDate(exp.startDate)} — {exp.endDate ? formatDate(exp.endDate) : 'Present'}
                          </span>
                        </div>

                        <h3 className="text-lg font-bold font-[family-name:var(--font-display)] text-[var(--text)] group-hover:text-[var(--accent)] transition-colors mb-1">
                          {exp.role}
                        </h3>
                        <p className="text-[var(--accent)] font-semibold text-sm mb-3">
                          {exp.company}
                        </p>
                        <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-4 line-clamp-2">
                          {exp.summary}
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {exp.techStack.slice(0, 4).map((tech) => (
                            <span key={tech} className="badge badge-muted text-xs">
                              {tech}
                            </span>
                          ))}
                          {exp.techStack.length > 4 && (
                            <span className="badge badge-muted text-xs">
                              +{exp.techStack.length - 4}
                            </span>
                          )}
                        </div>
                      </article>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
