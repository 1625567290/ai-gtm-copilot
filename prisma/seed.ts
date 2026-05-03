import { prisma } from "../lib/db/prisma";
import { generateCampaignPlan } from "../lib/gtm/generate";
import { campaignPlanToRecord } from "../lib/gtm/persistence";
import type { ProjectIntakeInput } from "../lib/validation/project";

const sampleProject: ProjectIntakeInput = {
  name: "VectorForge",
  website: "https://vectorforge.ai",
  category: "AI Infra",
  stage: "pre-launch",
  targetMarkets: ["US", "Japan"],
  audiences: ["developers", "AI researchers"],
  summary:
    "A vector database optimized for agent memory, low-latency retrieval, and observability across production AI workflows.",
  moat: "Hybrid memory compression, transparent retrieval traces, and developer-first debugging tools.",
  launchGoal: "Recruit 500 technical beta users and 20 design partners in 30 days.",
  budgetBand: "$10k-$25k",
  tone: "technical"
};

async function main() {
  await prisma.project.deleteMany({
    where: { name: sampleProject.name }
  });

  const plan = generateCampaignPlan(sampleProject);
  const project = await prisma.project.create({
    data: {
      name: sampleProject.name,
      website: sampleProject.website,
      category: sampleProject.category,
      stage: sampleProject.stage,
      targetMarkets: JSON.stringify(sampleProject.targetMarkets),
      audiences: JSON.stringify(sampleProject.audiences),
      summary: sampleProject.summary,
      moat: sampleProject.moat,
      launchGoal: sampleProject.launchGoal,
      budgetBand: sampleProject.budgetBand,
      tone: sampleProject.tone,
      campaigns: {
        create: {
          status: "active",
          priority: "high",
          notes: "Seeded campaign for the interview walkthrough.",
          ...campaignPlanToRecord(plan)
        }
      }
    }
  });

  console.log(`Seeded ${project.name}.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
