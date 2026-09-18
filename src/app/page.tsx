import HeroSection from '@/components/HeroSection'
import WorkExperienceSection from '@/components/WorkExperienceSection'
import ProjectsSection from '@/components/ProjectsSection'
import SkillsSection from '@/components/TechStackMarquee'
import ServicesSection from '@/components/ServicesSection'
import ProcessSection from '@/components/ProcessSection'
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'
import { getProfile, getExperiences, getProjects, getTechStacks } from '@/lib/data'

export default async function Home() {
  const [profile, experiences, projects, techStacks] = await Promise.all([
    getProfile(),
    getExperiences(),
    getProjects(),
    getTechStacks(),
  ])

  return (
    <>
      <HeroSection profile={profile} />
      <SkillsSection techStacks={techStacks} />
      <ProjectsSection projects={projects} />
      <ServicesSection />
      <WorkExperienceSection experiences={experiences} />
      <ProcessSection />
      <ContactSection profile={profile} />
      <Footer profile={profile} />
    </>
  )
}
