import { describe, expect, it } from "vitest";
import { generateCampaignPlan, generateCampaignPlanWithOptionalAi } from "../lib/gtm/generate";
import type { ProjectIntakeInput } from "../lib/validation/project";

const aiInfraProject: ProjectIntakeInput = {
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
  tone: "technical"
};

describe("generateCampaignPlan", () => {
  it("creates a tailored launch plan for an AI infra pre-launch product", () => {
    const plan = generateCampaignPlan(aiInfraProject);

    expect(plan.name).toBe("VectorForge GTM Launch Plan");
    expect(plan.readinessScore).toBeGreaterThanOrEqual(0);
    expect(plan.readinessScore).toBeLessThanOrEqual(100);
    expect(plan.positioning).toContain("VectorForge");
    expect(plan.icp).toContain("developers");
    expect(plan.channelMix.map((channel) => channel.name)).toEqual(
      expect.arrayContaining(["Developer communities", "Technical founder content"])
    );
    expect(plan.kolPlan.some((kol) => kol.market === "Japan")).toBe(true);
    expect(plan.contentAngles).toHaveLength(5);
    expect(plan.launchCalendar).toHaveLength(14);
  });

  it("weights enterprise channels for post-launch data platforms", () => {
    const plan = generateCampaignPlan({
      ...aiInfraProject,
      name: "QueryLake",
      category: "Data Platform",
      stage: "post-launch",
      audiences: ["enterprise buyers", "founders"],
      targetMarkets: ["US", "Europe"],
      tone: "trusted",
      budgetBand: "$25k-$50k"
    });

    expect(plan.channelMix.map((channel) => channel.name)).toEqual(
      expect.arrayContaining(["Analyst and operator briefings", "Customer proof campaign"])
    );
    expect(plan.successMetrics).toContain("qualified pipeline");
    expect(plan.risks.some((risk) => risk.includes("proof"))).toBe(true);
  });

  it("uses the deterministic generator when AI mode is not explicitly enabled", async () => {
    const plan = await generateCampaignPlanWithOptionalAi(aiInfraProject);

    expect(plan.name).toBe("VectorForge GTM Launch Plan");
    expect(plan.channelMix.map((channel) => channel.name)).toContain("Developer communities");
  });
});
