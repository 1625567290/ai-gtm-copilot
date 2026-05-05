"use server";

import { redirect } from "next/navigation";
import { ensureDemoDatabase } from "@/lib/db/bootstrap";
import { prisma } from "@/lib/db/prisma";
import { generateCampaignPlanWithOptionalAi } from "@/lib/gtm/generate";
import { campaignPlanToRecord } from "@/lib/gtm/persistence";
import { getLocale, withLocale } from "@/lib/i18n";
import { projectIntakeSchema } from "@/lib/validation/project";

function value(formData: FormData, key: string) {
  return String(formData.get(key) ?? "");
}

export async function createProjectAndCampaign(formData: FormData) {
  const locale = getLocale(value(formData, "locale"));
  const input = projectIntakeSchema.parse({
    name: value(formData, "name"),
    website: value(formData, "website"),
    category: value(formData, "category"),
    stage: value(formData, "stage"),
    targetMarkets: formData.getAll("targetMarkets").map(String),
    audiences: formData.getAll("audiences").map(String),
    summary: value(formData, "summary"),
    moat: value(formData, "moat"),
    launchGoal: value(formData, "launchGoal"),
    budgetBand: value(formData, "budgetBand"),
    tone: value(formData, "tone"),
    outputLocale: value(formData, "outputLocale") || undefined
  });

  const plan = await generateCampaignPlanWithOptionalAi(input);
  await ensureDemoDatabase();
  const campaign = await prisma.$transaction(async (tx) => {
    const project = await tx.project.create({
      data: {
        name: input.name,
        website: input.website || null,
        category: input.category,
        stage: input.stage,
        targetMarkets: JSON.stringify(input.targetMarkets),
        audiences: JSON.stringify(input.audiences),
        summary: input.summary,
        moat: input.moat,
        launchGoal: input.launchGoal,
        budgetBand: input.budgetBand,
        tone: input.tone,
        outputLocale: input.outputLocale
      }
    });

    return tx.campaign.create({
      data: {
        projectId: project.id,
        ...campaignPlanToRecord(plan)
      }
    });
  });

  redirect(withLocale(`/campaigns/${campaign.id}`, locale));
}
