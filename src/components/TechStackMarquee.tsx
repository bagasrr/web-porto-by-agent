'use client'

import React from 'react'

export default function TechStackMarquee({ techStacks }: { techStacks: any[] }) {
  if (!techStacks || techStacks.length === 0) return null;

  return (
    <div className="w-full py-8 overflow-hidden bg-white brutal-border-y flex">
      <div className="flex shrink-0 animate-marquee min-w-full justify-around items-center">
        {techStacks.map((tech, i) => (
          <div key={`${tech.id}-${i}`} className="flex items-center justify-center mx-8 shrink-0 group">
            <img 
              src={tech.imageUrl} 
              alt={tech.name} 
              className="w-12 h-12 object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
              title={tech.name}
            />
          </div>
        ))}
      </div>
      <div aria-hidden="true" className="flex shrink-0 animate-marquee min-w-full justify-around items-center">
        {techStacks.map((tech, i) => (
          <div key={`${tech.id}-dup-${i}`} className="flex items-center justify-center mx-8 shrink-0 group">
            <img 
              src={tech.imageUrl} 
              alt={tech.name} 
              className="w-12 h-12 object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
              title={tech.name}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
