import HeroSection from '@/components/HeroSection'
import WorkExperienceSection from '@/components/WorkExperienceSection'
import ProjectsSection from '@/components/ProjectsSection'
import TechStackMarquee from '@/components/TechStackMarquee'
import { prisma } from '@/lib/prisma'

export default async function Home() {
  const techStacks = await prisma.techStack.findMany({
    orderBy: { order: 'asc' }
  })

  return (
    <>
      <HeroSection />
      <TechStackMarquee techStacks={techStacks} />
      <WorkExperienceSection />
      <ProjectsSection />
    </>
  )
}
