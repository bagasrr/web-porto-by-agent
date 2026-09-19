import { getProjectById, getProfile } from '@/lib/data'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { HiArrowLeft, HiExternalLink } from 'react-icons/hi'
import { FaGithub } from 'react-icons/fa'
import Footer from '@/components/Footer'

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const [project, profile] = await Promise.all([
    getProjectById(parseInt(id)),
    getProfile(),
  ])

  if (!project) {
    notFound()
  }

  return (
    <>
      <div className="min-h-screen pt-20 pb-16">
        <div className="max-w-3xl mx-auto px-4">
          {/* Back button */}
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-accent transition-colors mb-8 group"
          >
            <HiArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Projects
          </Link>

          {/* Header card */}
          <div className="card mb-8 relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-glow-primary rounded-full blur-3xl opacity-40" />

            <div className="relative">
              <span className="eyebrow block mb-3">Project Showcase</span>
              <h1 className="text-3xl md:text-4xl font-bold font-display text-text mb-4 leading-tight">
                {project.title}
              </h1>

              {/* Action Links */}
              <div className="flex flex-wrap gap-3 mb-6">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-sm btn-secondary"
                  >
                    <FaGithub size={15} /> View Source Code
                  </a>
                )}
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-sm btn-primary"
                  >
                    <HiExternalLink size={16} /> Open Live Demo
                  </a>
                )}
              </div>

              {/* Showcase image */}
              {project.imageUrl && (
                <div className="rounded-xl overflow-hidden border border-border bg-surface-elevated max-h-96 relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Short description / Overview */}
          {project.shortDescription && (
            <div className="card mb-6">
              <h2 className="text-xs font-bold text-text-muted uppercase tracking-widest mb-3">
                Overview
              </h2>
              <p className="text-text font-medium leading-relaxed">
                {project.shortDescription}
              </p>
            </div>
          )}

          {/* Full / Long description */}
          <div className="card mb-6">
            <h2 className="text-xs font-bold text-text-muted uppercase tracking-widest mb-3">
              Detailed Description
            </h2>
            <p className="text-text-secondary leading-relaxed whitespace-pre-line text-sm md:text-base">
              {project.description}
            </p>
          </div>

          {/* Tech stack */}
          <div className="card mb-8">
            <h2 className="text-xs font-bold text-text-muted uppercase tracking-widest mb-4">
              Technologies & Tools
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
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
