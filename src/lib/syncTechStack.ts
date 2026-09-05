import { prisma } from './prisma'

export async function syncTechStack(names: string[]) {
  if (!names || names.length === 0) return;

  const existingStacks = await prisma.techStack.findMany({
    where: {
      name: {
        in: names,
        mode: 'insensitive' // Requires postgresql for case-insensitive match
      }
    }
  });

  const existingNames = new Set(existingStacks.map(s => s.name.toLowerCase()));
  
  const missingNames = names.filter(n => !existingNames.has(n.toLowerCase()));

  for (const name of missingNames) {
    const cleanName = name.toLowerCase().replace(/[^a-z0-9]/g, '');
    const defaultImageUrl = `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${cleanName}/${cleanName}-original.svg`;
    
    await prisma.techStack.create({
      data: {
        name: name,
        imageUrl: defaultImageUrl,
        order: 0
      }
    });
  }
}
