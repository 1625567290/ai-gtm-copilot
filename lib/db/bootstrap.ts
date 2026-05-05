import { sampleProjects } from "@/lib/gtm/demo-data";
import { generateCampaignPlan } from "@/lib/gtm/generate";
import { campaignPlanToRecord } from "@/lib/gtm/persistence";
import { prisma } from "./prisma";

let bootstrapPromise: Promise<void> | null = null;

async function ensureTables() {
  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "Project" (
      "id" TEXT NOT NULL,
      "name" TEXT NOT NULL,
      "website" TEXT,
      "category" TEXT NOT NULL,
      "stage" TEXT NOT NULL,
      "targetMarkets" TEXT NOT NULL,
      "audiences" TEXT NOT NULL,
      "summary" TEXT NOT NULL,
      "moat" TEXT NOT NULL,
      "launchGoal" TEXT NOT NULL,
      "budgetBand" TEXT NOT NULL,
      "tone" TEXT NOT NULL,
      "outputLocale" TEXT NOT NULL DEFAULT 'en',
      "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
    );
  `);

  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "Campaign" (
      "id" TEXT NOT NULL,
      "projectId" TEXT NOT NULL,
      "name" TEXT NOT NULL,
      "status" TEXT NOT NULL DEFAULT 'draft',
      "priority" TEXT NOT NULL DEFAULT 'medium',
      "readinessScore" INTEGER NOT NULL,
      "positioning" TEXT NOT NULL,
      "icp" TEXT NOT NULL,
      "channelMix" TEXT NOT NULL,
      "kolPlan" TEXT NOT NULL,
      "contentAngles" TEXT NOT NULL,
      "launchCalendar" TEXT NOT NULL,
      "successMetrics" TEXT NOT NULL,
      "risks" TEXT NOT NULL,
      "notes" TEXT NOT NULL DEFAULT '',
      "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT "Campaign_pkey" PRIMARY KEY ("id"),
      CONSTRAINT "Campaign_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE
    );
  `);

  await prisma.$executeRawUnsafe(`
    CREATE INDEX IF NOT EXISTS "Campaign_projectId_idx" ON "Campaign"("projectId");
  `);
}

async function seedDemoData() {
  for (const sample of sampleProjects) {
    const existing = await prisma.project.findFirst({
      where: { name: sample.project.name },
      select: { id: true }
    });

    if (existing) {
      continue;
    }

    const plan = generateCampaignPlan(sample.project);

    await prisma.project.create({
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
  }
}

async function runBootstrap() {
  await ensureTables();
  await seedDemoData();
}

export async function ensureDemoDatabase() {
  bootstrapPromise ??= runBootstrap().catch((error) => {
    bootstrapPromise = null;
    throw error;
  });

  return bootstrapPromise;
}
