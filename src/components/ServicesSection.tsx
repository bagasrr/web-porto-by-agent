import { HiCode, HiGlobeAlt, HiServer, HiDatabase } from 'react-icons/hi'

const SERVICES = [
  {
    num: '01',
    icon: HiGlobeAlt,
    title: 'Full Stack Development',
    description:
      'End-to-end web applications built with modern frameworks. From pixel-perfect frontends to robust backend APIs and everything in between.',
    tags: ['Next.js', 'React', 'TypeScript', 'Node.js'],
  },
  {
    num: '02',
    icon: HiCode,
    title: 'Web Application Development',
    description:
      'Custom web applications tailored to your business needs. Scalable, performant, and maintainable solutions that grow with you.',
    tags: ['SPA', 'SSR', 'PWA', 'Responsive'],
  },
  {
    num: '03',
    icon: HiServer,
    title: 'API Development',
    description:
      'Well-designed RESTful and GraphQL APIs with proper documentation, authentication, rate limiting, and error handling.',
    tags: ['REST', 'GraphQL', 'JWT', 'OpenAPI'],
  },
  {
    num: '04',
    icon: HiDatabase,
    title: 'Database & System Design',
    description:
      'Database architecture, schema design, query optimization, and system design for high-traffic applications.',
    tags: ['PostgreSQL', 'MySQL', 'Redis', 'System Design'],
  },
]

export default function ServicesSection() {
  return (
    <section id="services" className="section">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-12">
          <p className="eyebrow mb-3">What I Do</p>
          <h2 className="text-3xl md:text-5xl font-bold font-display text-text leading-tight">
            Services I{' '}
            <span className="text-gradient">Offer</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SERVICES.map((service) => {
            const Icon = service.icon
            return (
              <article
                key={service.num}
                className="card card-hover group relative overflow-hidden"
              >
                {/* Number watermark */}
                <span className="absolute top-4 right-6 text-6xl font-bold font-display text-text/5 select-none group-hover:text-primary/10 transition-colors">
                  {service.num}
                </span>

                {/* Icon */}
                <div className="w-10 h-10 rounded-xl bg-dark-burgundy border border-accent-border flex items-center justify-center mb-4 group-hover:bg-primary transition-colors">
                  <Icon size={20} className="text-accent group-hover:text-white transition-colors" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold font-display text-text mb-3">
                  {service.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed mb-5">
                  {service.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {service.tags.map((tag) => (
                    <span key={tag} className="badge badge-primary text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
