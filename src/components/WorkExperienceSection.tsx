import Link from 'next/link'
import { prisma } from '@/lib/prisma'

export default async function WorkExperienceSection() {
  const experiences = await prisma.workExperience.findMany({
    orderBy: { startDate: 'desc' }, // Latest entry at the top
  })

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric' }).format(date)
  }

  return (
    <section className="max-w-6xl mx-auto px-4 py-12 md:py-20">
      <h2 className="text-3xl md:text-5xl font-bold font-[family-name:var(--font-space-mono)] mb-8 md:mb-12">
        <span className="bg-accent-blue text-white px-4 py-2 brutal-border brutal-shadow inline-block">
          Work Experience
        </span>
      </h2>

      {/* Timeline Container */}
      <div className="relative border-l-4 border-black ml-4 md:ml-6 space-y-8 pb-4">
        {experiences.map((exp) => (
          <div key={exp.id} className="relative pl-8 md:pl-12">
            {/* Timeline Node */}
            <div className="absolute -left-[10px] top-4 w-4 h-4 bg-white border-4 border-black rounded-full"></div>
            
            <Link href={`/experience/${exp.id}`} className="block">
              {/* Neo-Brutalism Card */}
              <div className="border-4 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-4 md:p-6 mb-2 relative transition-none hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-2 active:translate-y-2 active:shadow-none cursor-pointer">
                
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-3">
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold font-[family-name:var(--font-space-mono)] leading-tight">{exp.role}</h3>
                    <p className="text-lg font-bold text-accent-red mt-1">{exp.company}</p>
                  </div>
                  <div className="shrink-0 mt-2 md:mt-0">
                    <span className="text-sm md:text-base font-bold bg-accent-yellow px-3 py-1 border-2 border-black inline-block">
                      {formatDate(exp.startDate)} — {exp.endDate ? formatDate(exp.endDate) : 'Present'}
                    </span>
                  </div>
                </div>
                
                <p className="text-base md:text-lg mb-4">{exp.summary}</p>
                
                <div className="flex flex-wrap gap-2">
                  {exp.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs md:text-sm font-bold bg-foreground text-background px-2 py-1 border-2 border-black"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  )
}
