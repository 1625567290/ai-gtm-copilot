"use server";

import { redirect } from "next/navigation";
import { ensureDemoDatabase } from "@/lib/db/bootstrap";
import {
  type ProjectIntakeFormState,
  projectIntakeValuesFromFormData,
  validationFailureState
} from "@/lib/forms/project-intake";
import { prisma } from "@/lib/db/prisma";
import { generateCampaignPlanWithOptionalAi } from "@/lib/gtm/generate";
import { campaignPlanToRecord } from "@/lib/gtm/persistence";
import { getLocale } from "@/lib/i18n";
import { analysisResultPath } from "@/lib/navigation";
import { projectIntakeSchema } from "@/lib/validation/project";

function value(formData: FormData, key: string) {
  return String(formData.get(key) ?? "");
}

export async function createProjectAndCampaign(
  _previousState: ProjectIntakeFormState,
  formData: FormData
): Promise<ProjectIntakeFormState> {
  const locale = getLocale(value(formData, "locale"));
  const values = projectIntakeValuesFromFormData(formData);
  const result = projectIntakeSchema.safeParse(values);

  if (!result.success) {
    return validationFailureState(values, result.error);
  }

  const input = result.data;
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

  redirect(analysisResultPath(campaign.id, locale));
}
