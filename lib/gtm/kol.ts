import type { ProjectIntakeInput } from "../validation/project";
import { marketKolArchetypes } from "./reference-data";
import type { CampaignPlan, KolRecommendation } from "./types";

export type KolMarketFit = {
  market: string;
  score: number;
  tier: "Core" | "Expansion" | "Probe";
  recommendedArchetype: string;
  budgetMode: string;
  assetAngle: string;
  rationale: string;
  nextAction: string;
  brief: string;
};

export type KolMarketFitPlan = {
  summary: {
    bestMarket: string;
    coreMarketCount: number;
    averageScore: number;
  };
  marketFits: KolMarketFit[];
  activationBrief: string;
};

const technicalMarkets = new Set(["US", "Japan", "Korea", "Southeast Asia", "CIS", "Global"]);
const technicalCategories = new Set<ProjectIntakeInput["category"]>(["AI Infra", "Developer Tool", "Data Platform"]);
const launchStages = new Set<ProjectIntakeInput["stage"]>(["pre-launch", "private beta", "public beta"]);

function scoreTier(score: number): KolMarketFit["tier"] {
  if (score >= 86) return "Core";
  if (score >= 74) return "Expansion";
  return "Probe";
}

function recommendedKolForMarket(market: string, campaignKols: KolRecommendation[]) {
  const campaignKol = campaignKols.find((kol) => kol.market === market);
  if (campaignKol) return campaignKol;

  const fallback = marketKolArchetypes[market] ?? marketKolArchetypes.Global;
  const archetype = fallback[0];

  return {
    market,
    budget: "focused test",
    archetype: archetype.archetype,
    brief: archetype.brief
  };
}

function marketScore(input: ProjectIntakeInput, campaign: CampaignPlan, market: string) {
  const archetypeCount = (marketKolArchetypes[market] ?? marketKolArchetypes.Global).length;
  const hasCampaignKol = campaign.kolPlan.some((kol) => kol.market === market);
  const hasTechnicalAudience = input.audiences.some((audience) => audience === "developers" || audience === "AI researchers");
  const hasTechnicalFit = hasTechnicalAudience && technicalMarkets.has(market);
  const hasCategoryFit = hasTechnicalAudience && technicalCategories.has(input.category);
  const hasBudgetFit = input.budgetBand !== "under $5k";
  const hasStageFit = launchStages.has(input.stage);

  const score =
    50 +
    Math.min(8, archetypeCount * 4) +
    (hasCampaignKol ? 10 : 0) +
    (hasTechnicalFit ? 8 : 0) +
    (hasCategoryFit ? 8 : 0) +
    (hasBudgetFit ? 4 : 0) +
    (hasStageFit ? 4 : 0);

  return Math.min(96, score);
}

function nextActionFor(tier: KolMarketFit["tier"], market: string) {
  if (tier === "Core") {
    return `Brief 3-5 high-context ${market} KOLs with demo proof, CTA, and localized talking points.`;
  }

  if (tier === "Expansion") {
    return `Run a small ${market} content test before scaling creator budget.`;
  }

  return `Use ${market} for listening, objection mining, and community validation before paid amplification.`;
}

function rationaleFor(input: ProjectIntakeInput, market: string, tier: KolMarketFit["tier"]) {
  const audience = input.audiences.join(", ");
  if (tier === "Core") {
    return `${market} has strong KOL-market fit for ${audience} because the campaign already has matching archetypes and launch-stage urgency.`;
  }

  if (tier === "Expansion") {
    return `${market} can extend distribution, but the team should validate message resonance before a larger KOL wave.`;
  }

  return `${market} is better used as a learning market until the narrative, proof asset, and conversion path are sharper.`;
}

function briefFor(input: ProjectIntakeInput, kol: KolRecommendation, assetAngle: string) {
  return `${input.name} KOL brief for ${kol.archetype}: lead with "${assetAngle}", show the moat (${input.moat}), and close with the launch goal: ${input.launchGoal}`;
}

export function buildKolMarketFit(input: ProjectIntakeInput, campaign: CampaignPlan): KolMarketFitPlan {
  const marketFits = input.targetMarkets.map((market) => {
    const score = marketScore(input, campaign, market);
    const tier = scoreTier(score);
    const kol = recommendedKolForMarket(market, campaign.kolPlan);
    const assetAngle = campaign.contentAngles[0] ?? campaign.positioning;

    return {
      market,
      score,
      tier,
      recommendedArchetype: kol.archetype,
      budgetMode: kol.budget,
      assetAngle,
      rationale: rationaleFor(input, market, tier),
      nextAction: nextActionFor(tier, market),
      brief: briefFor(input, kol, assetAngle)
    };
  });

  const bestFit = marketFits.reduce((best, candidate) => (candidate.score > best.score ? candidate : best), marketFits[0]);
  const averageScore =
    marketFits.length === 0
      ? 0
      : Math.round(marketFits.reduce((total, fit) => total + fit.score, 0) / marketFits.length);

  return {
    summary: {
      bestMarket: bestFit?.market ?? "Global",
      coreMarketCount: marketFits.filter((fit) => fit.tier === "Core").length,
      averageScore
    },
    marketFits,
    activationBrief: [
      `${input.name} KOL activation brief`,
      `Best market: ${bestFit?.market ?? "Global"}`,
      `Primary archetype: ${bestFit?.recommendedArchetype ?? "Global AI research curator"}`,
      `Narrative angle: ${bestFit?.assetAngle ?? campaign.positioning}`,
      `Launch goal: ${input.launchGoal}`
    ].join("\n")
  };
}
