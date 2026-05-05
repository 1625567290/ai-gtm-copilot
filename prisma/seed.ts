import { prisma } from "../lib/db/prisma";
import { sampleProjects } from "../lib/gtm/demo-data";
import { generateCampaignPlan } from "../lib/gtm/generate";
import { campaignPlanToRecord } from "../lib/gtm/persistence";

async function main() {
  await prisma.project.deleteMany({
    where: { name: { in: sampleProjects.map(({ project }) => project.name) } }
  });

  for (const sample of sampleProjects) {
    const plan = generateCampaignPlan(sample.project);
    const project = await prisma.project.create({
      data: {
        name: sample.project.name,
        website: sample.project.website,
        category: sample.project.category,
        stage: sample.project.stage,
        targetMarkets: JSON.stringify(sample.project.targetMarkets),
        audiences: JSON.stringify(sample.project.audiences),
        summary: sample.project.summary,
        moat: sample.project.moat,
        launchGoal: sample.project.launchGoal,
        budgetBand: sample.project.budgetBand,
        tone: sample.project.tone,
        outputLocale: sample.project.outputLocale,
        campaigns: {
          create: {
            status: sample.status,
            priority: sample.priority,
            notes: sample.notes,
            ...campaignPlanToRecord(plan)
          }
        }
      }
    });

    console.log(`Seeded ${project.name}.`);
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
