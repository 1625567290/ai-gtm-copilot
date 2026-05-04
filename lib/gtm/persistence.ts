import type { Campaign, Project } from "@prisma/client";
import type { ProjectIntakeInput } from "../validation/project";
import type { CampaignPlan } from "./types";

function parseJson<T>(value: string, fallback: T): T {
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

export function projectRecordToInput(project: Project): ProjectIntakeInput {
  return {
    name: project.name,
    website: project.website ?? "",
    category: project.category as ProjectIntakeInput["category"],
    stage: project.stage as ProjectIntakeInput["stage"],
    targetMarkets: parseJson(project.targetMarkets, []),
    audiences: parseJson(project.audiences, []),
    summary: project.summary,
    moat: project.moat,
    launchGoal: project.launchGoal,
    budgetBand: project.budgetBand as ProjectIntakeInput["budgetBand"],
    tone: project.tone as ProjectIntakeInput["tone"],
    outputLocale: project.outputLocale as ProjectIntakeInput["outputLocale"]
  };
}

export function campaignPlanToRecord(plan: CampaignPlan) {
  return {
    name: plan.name,
    readinessScore: plan.readinessScore,
    positioning: plan.positioning,
    icp: plan.icp,
    channelMix: JSON.stringify(plan.channelMix),
    kolPlan: JSON.stringify(plan.kolPlan),
    contentAngles: JSON.stringify(plan.contentAngles),
    launchCalendar: JSON.stringify(plan.launchCalendar),
    successMetrics: JSON.stringify(plan.successMetrics),
    risks: JSON.stringify(plan.risks)
  };
}

export function campaignRecordToPlan(campaign: Campaign): CampaignPlan {
  return {
    name: campaign.name,
    readinessScore: campaign.readinessScore,
    positioning: campaign.positioning,
    icp: campaign.icp,
    channelMix: parseJson(campaign.channelMix, []),
    kolPlan: parseJson(campaign.kolPlan, []),
    contentAngles: parseJson(campaign.contentAngles, []),
    launchCalendar: parseJson(campaign.launchCalendar, []),
    successMetrics: parseJson(campaign.successMetrics, []),
    risks: parseJson(campaign.risks, [])
  };
}
