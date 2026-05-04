import { prisma } from "../lib/db/prisma";
import { generateCampaignPlan } from "../lib/gtm/generate";
import { campaignPlanToRecord } from "../lib/gtm/persistence";
import type { ProjectIntakeInput } from "../lib/validation/project";

const sampleProjects: Array<{
  project: ProjectIntakeInput;
  status: "active" | "draft";
  priority: "high" | "medium";
  notes: string;
}> = [
  {
    project: {
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
      tone: "technical",
      outputLocale: "en"
    },
    status: "active",
    priority: "high",
    notes: "Primary English walkthrough case for the interview demo."
  },
  {
    project: {
      name: "MossBench",
      website: "https://mossbench.ai",
      category: "Developer Tool",
      stage: "public beta",
      targetMarkets: ["Korea", "Japan", "Southeast Asia"],
      audiences: ["developers", "founders"],
      summary:
        "An evaluation workspace that helps AI teams compare agent performance, trace failures, and publish reproducible benchmarks.",
      moat: "Deep trace comparison, repeatable benchmark templates, and collaboration workflows for technical teams.",
      launchGoal: "Drive 300 qualified beta signups from AI engineering teams in 14 days.",
      budgetBand: "$10k-$25k",
      tone: "community-native",
      outputLocale: "zh"
    },
    status: "draft",
    priority: "medium",
    notes: "Chinese brief sample to demonstrate multilingual GTM output."
  }
];

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
