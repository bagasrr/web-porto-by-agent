import Link from 'next/link'
import { HiExternalLink, HiArrowRight } from 'react-icons/hi'
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
          <h2 className="text-4xl font-bold font-display text-text mb-4">
            Featured Projects
          </h2>
          <p className="text-text-muted">No projects yet. Check back soon.</p>
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
            <h2 className="text-3xl md:text-5xl font-bold font-display text-text leading-tight">
              Featured{' '}
              <span className="text-gradient">Projects</span>
            </h2>
          </div>
          <p className="text-text-muted max-w-sm md:text-right">
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
              <Link
                href={`/project/${project.id}`}
                className="block overflow-hidden rounded-xl mb-5"
                aria-label={`View details of ${project.title}`}
              >
                <div
                  className={`h-44 overflow-hidden bg-gradient-to-br ${
                    FALLBACK_COLORS[i % FALLBACK_COLORS.length]
                  } relative`}
                >
                  {project.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-end p-4">
                      <span className="text-5xl font-bold font-display text-white/10 select-none">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>
                  )}
                </div>
              </Link>

              {/* Number */}
              <span className="eyebrow mb-2">
                {String(i + 1).padStart(2, '0')}
              </span>

              {/* Title */}
              <h3 className="text-lg font-bold font-display text-text mb-2 transition-colors line-clamp-1">
                <Link
                  href={`/project/${project.id}`}
                  className="hover:text-accent transition-colors"
                >
                  {project.title}
                </Link>
              </h3>

              {/* Short Description */}
              <p className="text-text-secondary text-sm leading-relaxed mb-4 flex-1">
                {project.shortDescription || project.description}
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
              <div className="flex items-center gap-2 mt-auto pt-3 border-t border-border">
                <Link
                  href={`/project/${project.id}`}
                  className="btn btn-sm btn-ghost text-xs flex-1 text-text-muted hover:text-text justify-center"
                >
                  Details <HiArrowRight size={13} />
                </Link>
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-sm btn-secondary text-xs px-3"
                    aria-label={`${project.title} GitHub`}
                    title="GitHub"
                  >
                    <FaGithub size={13} />
                  </a>
                )}
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-sm btn-primary text-xs px-3"
                    aria-label={`${project.title} live demo`}
                    title="Live Demo"
                  >
                    <HiExternalLink size={14} />
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
