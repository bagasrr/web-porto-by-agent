import { prisma } from '@/lib/prisma'

export default async function ProjectsSection() {
  const projects = await prisma.project.findMany({
    orderBy: { order: 'asc' },
  })

  return (
    <section className="max-w-6xl mx-auto px-4 py-12 md:py-20">
      <h2 className="text-3xl md:text-5xl font-bold font-[family-name:var(--font-space-mono)] mb-8 md:mb-12">
        <span className="bg-accent-green text-black px-4 py-2 brutal-border brutal-shadow inline-block">
          Projects
        </span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="brutal-border brutal-shadow bg-card-bg p-6 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-xl font-bold font-[family-name:var(--font-space-mono)] mb-3">
                {project.title}
              </h3>
              <p className="text-sm md:text-base mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs font-bold bg-accent-yellow text-[#111] px-2 py-1 brutal-border"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex gap-3 mt-auto">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="brutal-btn bg-foreground text-background px-4 py-2 text-sm font-bold"
                >
                  GitHub
                </a>
              )}
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="brutal-btn bg-accent-red text-white px-4 py-2 text-sm font-bold"
                >
                  Live Demo
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
