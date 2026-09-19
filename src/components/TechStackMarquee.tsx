"use client";

import React from "react";
import type { TechStack } from "@/lib/data";
import Image from "next/image";

type SkillsSectionProps = {
  techStacks: TechStack[];
};

export default function SkillsSection({ techStacks }: SkillsSectionProps) {
  if (!techStacks || techStacks.length === 0) return null;

  return (
    <section id="skills" className="section overflow-hidden relative">
      <div className="max-w-6xl mx-auto px-4 mb-10">
        <p className="eyebrow mb-3">Tech Stack</p>
        <h2 className="text-3xl md:text-5xl font-bold font-(family-name:--font-display) text-(--text) leading-tight">
          Tools &amp; <span className="text-gradient">Technologies</span>
        </h2>
      </div>

      {/* Marquee */}
      <div className="relative w-full overflow-hidden border-y border-border bg-(--surface) py-6">
        {/* Fade masks */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-linear-to-r from-(--surface) to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-linear-to-l from-(--surface) to-transparent z-10 pointer-events-none" />

        <div className="flex">
          {/* Row 1 */}
          <div className="flex shrink-0 animate-marquee min-w-full items-center gap-9 px-2">
            {techStacks.map((tech, i) => (
              <TechItem key={`${tech.id}-a-${i}`} tech={tech} />
            ))}
          </div>
          {/* Row 1 duplicate for seamless loop */}
          <div aria-hidden className="flex shrink-0 animate-marquee min-w-full items-center gap-9 px-2">
            {techStacks.map((tech, i) => (
              <TechItem key={`${tech.id}-b-${i}`} tech={tech} />
            ))}
          </div>
        </div>
      </div>

      {/* Marquee reverse */}
      <div className="relative w-full overflow-hidden border-y border-border bg-(--surface) py-6 mt-5">
        {/* Fade masks */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-linear-to-r from-(--surface) to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-linear-to-l from-(--surface) to-transparent z-10 pointer-events-none" />

        <div className="flex">
          {/* Row 1 */}
          <div className="flex shrink-0 animate-marquee-reverse min-w-full items-center gap-9 px-2">
            {techStacks.map((tech, i) => (
              <TechItem key={`${tech.id}-a-${i}`} tech={tech} />
            ))}
          </div>
          {/* Row 1 duplicate for seamless loop */}
          <div aria-hidden className="flex shrink-0 animate-marquee-reverse min-w-full items-center gap-9 px-2">
            {techStacks.map((tech, i) => (
              <TechItem key={`${tech.id}-b-${i}`} tech={tech} />
            ))}
          </div>
        </div>
      </div>

      {/* Static grid below marquee */}
      {/* <div className="max-w-6xl mx-auto px-4 mt-10">
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
          {techStacks.map((tech) => (
            <div key={tech.id} className="card flex flex-col items-center gap-2 py-4 px-2 hover:border-accent-border transition-colors group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
      {/* <img src={tech.imageUrl} alt={tech.name} className="w-8 h-8 object-contain grayscale group-hover:grayscale-0 transition-all duration-300" />
              <span className="text-xs text-text-muted text-center group-hover:text-text-secondary transition-colors truncate w-full text-center">{tech.name}</span>
            </div>
          ))}
        </div>
      </div> */}

      <div className="absolute left-0 bottom-0 z-20 pointer-events-none w-56 sm:w-96 md:w-120 lg:w-95 aspect-4/3">
        {/* Shadow Halus di belakang punggung & laptop */}
        <div className="absolute left-0 inset-y-0 w-3/4 bg-linear-to-l from-transparent via-(--bg)/90 to-(--bg) blur-2xl -z-10 translate-x-10" />

        {/* Fade radial tepat di belakang kepala/laptop agar teks marquee tenggelam natural */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--bg)_20%,transparent_75%)] opacity-85 -z-10 scale-125" />

        {/* Image */}
        <Image src="/assets/work-experience.png" alt="" aria-hidden="true" fill className="object-contain object-bottom-left drop-shadow-[0_10px_25px_rgba(0,0,0,0.85)]" priority sizes="(max-width: 768px) 384px, (max-width: 540px) 480px" />
      </div>
    </section>
  );
}

function TechItem({ tech }: { tech: TechStack }) {
  return (
    <div className="flex items-center gap-2 shrink-0 text-text-muted hover:text-text-secondary transition-colors mx-4">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={tech.imageUrl} alt="" aria-hidden className="w-6 h-6 object-contain opacity-60" />
      <span className="text-sm font-medium whitespace-nowrap">{tech.name}</span>
    </div>
  );
}
