'use client'

import React from 'react'
import type { TechStack } from '@/lib/data'

type SkillsSectionProps = {
  techStacks: TechStack[]
}

export default function SkillsSection({ techStacks }: SkillsSectionProps) {
  if (!techStacks || techStacks.length === 0) return null

  return (
    <section id="skills" className="section overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 mb-10">
        <p className="eyebrow mb-3">Tech Stack</p>
        <h2 className="text-3xl md:text-5xl font-bold font-[family-name:var(--font-display)] text-[var(--text)] leading-tight">
          Tools &amp; <span className="text-gradient">Technologies</span>
        </h2>
      </div>

      {/* Marquee */}
      <div className="relative w-full overflow-hidden border-y border-[var(--border-color)] bg-[var(--surface)] py-6">
        {/* Fade masks */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[var(--surface)] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[var(--surface)] to-transparent z-10 pointer-events-none" />

        <div className="flex">
          {/* Row 1 */}
          <div className="flex shrink-0 animate-marquee min-w-full items-center gap-8 px-8">
            {techStacks.map((tech, i) => (
              <TechItem key={`${tech.id}-a-${i}`} tech={tech} />
            ))}
          </div>
          {/* Row 1 duplicate for seamless loop */}
          <div aria-hidden className="flex shrink-0 animate-marquee min-w-full items-center gap-8 px-8">
            {techStacks.map((tech, i) => (
              <TechItem key={`${tech.id}-b-${i}`} tech={tech} />
            ))}
          </div>
        </div>
      </div>

      {/* Static grid below marquee */}
      <div className="max-w-6xl mx-auto px-4 mt-10">
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
          {techStacks.map((tech) => (
            <div
              key={tech.id}
              className="card flex flex-col items-center gap-2 py-4 px-2 hover:border-[var(--accent-border)] transition-colors group"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={tech.imageUrl}
                alt={tech.name}
                className="w-8 h-8 object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
              />
              <span className="text-xs text-[var(--text-muted)] text-center group-hover:text-[var(--text-secondary)] transition-colors truncate w-full text-center">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function TechItem({ tech }: { tech: TechStack }) {
  return (
    <div className="flex items-center gap-2 shrink-0 text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={tech.imageUrl}
        alt=""
        aria-hidden
        className="w-6 h-6 object-contain opacity-60"
      />
      <span className="text-sm font-medium whitespace-nowrap">{tech.name}</span>
    </div>
  )
}
