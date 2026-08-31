import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  // Seed Profile
  await prisma.profile.upsert({
    where: { id: 1 },
    update: {},
    create: {
      fullName: "Bagas Ramadhan Rusnadi",
      title: "Software Engineer",
      heroTitle: "I Build Things For The Web.",
      email: "bagasramadhanrusnadi@email.com",
      phone: "+6283804262567",
      linkedin: "https://linkedin.com/in/bagasrr17",
      whatsapp: "6283804262567",
    },
  });

  // Seed Work Experiences
  await prisma.workExperience.createMany({
    data: [
      {
        company: "Tech Company A",
        role: "Senior Software Engineer",
        startDate: new Date("2023-01-01"),
        endDate: null,
        summary: "Leading frontend development team and building scalable web applications.",
        description:
          "Led a team of 5 frontend developers in building and maintaining a large-scale SaaS platform. Implemented micro-frontend architecture, reducing build times by 40%. Mentored junior developers and established coding standards. Technologies used include React, Next.js, TypeScript, and GraphQL. Collaborated with product and design teams to deliver features that increased user engagement by 25%.",
        techStack: ["Next.js", "TypeScript", "React", "GraphQL", "Tailwind CSS"],
        order: 1,
      },
      {
        company: "Startup B",
        role: "Full Stack Developer",
        startDate: new Date("2021-06-01"),
        endDate: new Date("2022-12-31"),
        summary: "Built and shipped full-stack features for an e-commerce platform.",
        description:
          "Developed and maintained core features of an e-commerce platform serving 100K+ monthly active users. Built RESTful APIs using Node.js and Express, integrated payment gateways (Stripe, Midtrans), and implemented real-time notification systems. Optimized database queries resulting in 60% faster page loads. Worked in an agile environment with bi-weekly sprints.",
        techStack: ["Node.js", "Express", "PostgreSQL", "React", "Redis"],
        order: 2,
      },
      {
        company: "Agency C",
        role: "Frontend Developer",
        startDate: new Date("2020-01-01"),
        endDate: new Date("2021-05-31"),
        summary: "Crafted responsive web interfaces for various client projects.",
        description:
          "Delivered 15+ client projects ranging from corporate websites to web applications. Specialized in responsive design and cross-browser compatibility. Converted Figma designs to pixel-perfect implementations. Introduced component-based architecture using React, improving code reusability across projects by 50%.",
        techStack: ["React", "JavaScript", "SCSS", "Figma", "WordPress"],
        order: 3,
      },
    ],
  });

  // Seed Projects
  await prisma.project.createMany({
    data: [
      {
        title: "Portfolio Website",
        description: "A brutalism-themed personal portfolio built with Next.js, Tailwind CSS, and PostgreSQL. Features dynamic content management and responsive design.",
        techStack: ["Next.js", "Tailwind CSS", "PostgreSQL", "Prisma"],
        githubUrl: "https://github.com/bagasrr/portfolio",
        demoUrl: "https://bagasrr.dev",
        order: 1,
      },
      {
        title: "Task Management App",
        description: "A full-stack task management application with real-time collaboration features. Supports kanban boards, team workspaces, and deadline tracking.",
        techStack: ["React", "Node.js", "Socket.io", "MongoDB"],
        githubUrl: "https://github.com/bagasrr/taskman",
        demoUrl: "https://taskman.bagasrr.dev",
        order: 2,
      },
      {
        title: "E-Commerce API",
        description: "A RESTful API for e-commerce platforms with authentication, product management, cart system, and payment integration.",
        techStack: ["Express", "PostgreSQL", "JWT", "Stripe"],
        githubUrl: "https://github.com/bagasrr/ecommerce-api",
        order: 3,
      },
    ],
  });

  console.log("Seed data created successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
