import Link from 'next/link'
import { HiArrowRight, HiExternalLink } from 'react-icons/hi'
import { FaGithub } from 'react-icons/fa'
import type { Project } from '@/lib/data'

type ProjectsSectionProps = {
  projects: Project[]
}

const FALLBACK_COLORS = [
  'from-[#8F1D3F]/30 to-[#3D0B1F]/50',
  'from-[#3D0B1F]/30 to-[#180A12]/50',
  'from-[#21101A]/30 to-[#2C1520]/50',
]

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  if (projects.length === 0) {
    return (
      <section id="projects" className="section">
        <div className="max-w-6xl mx-auto px-4 text-center py-20">
          <p className="eyebrow mb-4">Portfolio</p>
          <h2 className="text-4xl font-bold font-[family-name:var(--font-display)] text-[var(--text)] mb-4">
            Featured Projects
          </h2>
          <p className="text-[var(--text-muted)]">No projects yet. Check back soon.</p>
        </div>
      </section>
    )
  }

  return (
    <section id="projects" className="section">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-4">
          <div>
            <p className="eyebrow mb-3">Portfolio</p>
            <h2 className="text-3xl md:text-5xl font-bold font-[family-name:var(--font-display)] text-[var(--text)] leading-tight">
              Featured{' '}
              <span className="text-gradient">Projects</span>
            </h2>
          </div>
          <p className="text-[var(--text-muted)] max-w-sm md:text-right">
            A selection of work I&apos;m proud of. Each project represents a unique challenge.
          </p>
        </div>

        {/* Project grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <article
              key={project.id}
              className="card card-hover group flex flex-col relative overflow-hidden"
            >
              {/* Project image or gradient placeholder */}
              <div className={`h-44 rounded-xl mb-5 overflow-hidden bg-gradient-to-br ${FALLBACK_COLORS[i % FALLBACK_COLORS.length]} relative`}>
                {project.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-end p-4">
                    <span className="text-5xl font-bold font-[family-name:var(--font-display)] text-white/10 select-none">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                )}
              </div>

              {/* Number */}
              <span className="eyebrow mb-2">
                {String(i + 1).padStart(2, '0')}
              </span>

              {/* Title */}
              <h3 className="text-lg font-bold font-[family-name:var(--font-display)] text-[var(--text)] mb-2 group-hover:text-[var(--accent)] transition-colors line-clamp-1">
                {project.title}
              </h3>

              {/* Description */}
              <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-4 line-clamp-2 flex-1">
                {project.description}
              </p>

              {/* Tech tags */}
              <div className="flex flex-wrap gap-1.5 mb-5">
                {project.techStack.slice(0, 4).map((tech) => (
                  <span key={tech} className="badge badge-muted text-xs">
                    {tech}
                  </span>
                ))}
                {project.techStack.length > 4 && (
                  <span className="badge badge-muted text-xs">
                    +{project.techStack.length - 4}
                  </span>
                )}
              </div>

              {/* Links */}
              <div className="flex gap-2 mt-auto">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-sm btn-secondary flex-1"
                    aria-label={`${project.title} GitHub`}
                  >
                    <FaGithub size={14} /> GitHub
                  </a>
                )}
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-sm btn-primary flex-1 group/btn"
                    aria-label={`${project.title} live demo`}
                  >
                    Live Demo
                    <HiExternalLink size={14} className="group-hover/btn:translate-x-0.5 transition-transform" />
                  </a>
                )}
                {!project.githubUrl && !project.demoUrl && (
                  <span className="text-xs text-[var(--text-muted)] italic">No links available</span>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
