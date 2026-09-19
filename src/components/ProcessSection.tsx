const STEPS = [
  {
    num: '01',
    title: 'Discover',
    desc: 'Understanding your goals, users, and constraints through research and deep conversations.',
  },
  {
    num: '02',
    title: 'Plan',
    desc: 'Defining architecture, tech stack, and milestones. Creating a clear roadmap.',
  },
  {
    num: '03',
    title: 'Design',
    desc: 'Crafting the user experience and interface. Wireframes, prototypes, and visual design.',
  },
  {
    num: '04',
    title: 'Develop',
    desc: 'Writing clean, tested, and well-documented code. Iterating fast with regular check-ins.',
  },
  {
    num: '05',
    title: 'Test',
    desc: 'Thorough testing across devices, browsers, and edge cases. Performance profiling.',
  },
  {
    num: '06',
    title: 'Deploy',
    desc: 'Smooth deployment with zero-downtime strategies, monitoring, and documentation.',
  },
]

export default function ProcessSection() {
  return (
    <section id="process" className="section">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="eyebrow mb-3">How I Work</p>
          <h2 className="text-3xl md:text-5xl font-bold font-display text-text leading-tight">
            My{' '}
            <span className="text-gradient">Process</span>
          </h2>
          <p className="text-text-secondary mt-4 max-w-lg mx-auto">
            A proven workflow built to deliver quality results efficiently and transparently.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
          {STEPS.map((step, i) => (
            <div
              key={step.num}
              className="bg-bg p-8 group hover:bg-surface transition-colors relative"
            >
              {/* Connector line (right edge) */}
              {i < STEPS.length - 1 && (
                <div className="absolute top-8 right-0 w-px h-8 bg-border lg:hidden" />
              )}

              <span className="eyebrow block mb-3">{step.num}</span>
              <h3 className="text-xl font-bold font-display text-text mb-3 group-hover:text-accent transition-colors">
                {step.title}
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                {step.desc}
              </p>

              {/* Subtle corner accent */}
              <div className="absolute bottom-4 right-4 w-2 h-2 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
