import { describe, expect, it } from "vitest";
import { generateCampaignPlan } from "../lib/gtm/generate";
import { buildKolMarketFit } from "../lib/gtm/kol";
import type { ProjectIntakeInput } from "../lib/validation/project";

const project: ProjectIntakeInput = {
  name: "VectorForge",
  website: "https://vectorforge.ai",
  category: "AI Infra",
  stage: "pre-launch",
  targetMarkets: ["US", "Japan"],
  audiences: ["developers", "AI researchers"],
  summary: "A vector database optimized for agent memory and low-latency retrieval.",
  moat: "Hybrid memory compression and developer-first observability.",
  launchGoal: "Recruit 500 technical beta users in 30 days.",
  budgetBand: "$10k-$25k",
  tone: "technical",
  outputLocale: "en"
};

describe("buildKolMarketFit", () => {
  it("scores target markets and produces a copy-ready KOL brief", () => {
    const campaign = generateCampaignPlan(project);
    const fit = buildKolMarketFit(project, campaign);

    expect(fit.summary.bestMarket).toBe("US");
    expect(fit.summary.coreMarketCount).toBe(2);
    expect(fit.marketFits).toHaveLength(2);
    expect(fit.marketFits[0]).toMatchObject({
      market: "US",
      tier: "Core",
      score: 92,
      recommendedArchetype: "AI infra builder-educator"
    });
    expect(fit.marketFits[1]).toMatchObject({
      market: "Japan",
      tier: "Core",
      score: 88
    });
    expect(fit.activationBrief).toContain("VectorForge");
    expect(fit.activationBrief).toContain("AI infra builder-educator");
    expect(fit.activationBrief).toContain("Recruit 500 technical beta users");
  });
});
