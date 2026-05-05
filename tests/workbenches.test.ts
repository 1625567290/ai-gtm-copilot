import { describe, expect, it } from "vitest";
import { generateCampaignPlan } from "../lib/gtm/generate";
import {
  buildCampaignTaskCalendar,
  buildFounderStoryAssets,
  buildKolPricing,
  buildSocialListeningRadar
} from "../lib/gtm/workbenches";
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

const campaign = generateCampaignPlan(project);

describe("growth workbenches", () => {
  it("prices KOL packages from market, audience, and budget context", () => {
    const pricing = buildKolPricing(project, campaign, "en");

    expect(pricing.summary.recommendedMarket).toBe("US");
    expect(pricing.summary.totalBudgetRange).toBe("$10k-$25k");
    expect(pricing.packages).toHaveLength(2);
    expect(pricing.packages[0]).toMatchObject({
      market: "US",
      archetype: "AI infra builder-educator",
      priority: "core"
    });
    expect(pricing.packages[0]?.priceRange).toContain("$");
    expect(pricing.packages[0]?.deliverables).toEqual(
      expect.arrayContaining(["1 technical thread", "1 demo clip"])
    );
  });

  it("creates founder story, media pitch, X thread, and community copy", () => {
    const assets = buildFounderStoryAssets(project, campaign, "en");

    expect(assets.founderStory.headline).toContain("VectorForge");
    expect(assets.mediaPitch.subject).toContain("VectorForge");
    expect(assets.xThread).toHaveLength(5);
    expect(assets.xThread[0]).toContain("VectorForge");
    expect(assets.communityAnnouncement.body).toContain("developers");
  });

  it("surfaces social listening signals and a recommended content angle", () => {
    const radar = buildSocialListeningRadar(project, campaign, "en");

    expect(radar.summary.topMarket).toBe("US");
    expect(radar.summary.recommendedAngle).toContain("developer");
    expect(radar.signals).toHaveLength(4);
    expect(radar.signals[0]?.strength).toBeGreaterThanOrEqual(80);
    expect(radar.signals[0]?.recommendedMove).toContain("technical");
  });

  it("turns the launch calendar into operator-ready tasks", () => {
    const calendar = buildCampaignTaskCalendar(project, campaign, "en");

    expect(calendar.summary.totalTasks).toBe(14);
    expect(calendar.summary.highPriorityCount).toBeGreaterThan(0);
    expect(calendar.tasks).toHaveLength(14);
    expect(calendar.tasks[0]).toMatchObject({
      day: 1,
      status: "ready",
      priority: "high"
    });
    expect(calendar.tasks[0]?.deliverable).toContain("Positioning");
    expect(calendar.milestones).toHaveLength(3);
  });

  it("localizes workbench output labels for Chinese demos", () => {
    const pricing = buildKolPricing(project, campaign, "zh");
    const assets = buildFounderStoryAssets(project, campaign, "zh");
    const calendar = buildCampaignTaskCalendar(project, campaign, "zh");

    expect(pricing.packages[0]?.packageName).toContain("核心");
    expect(assets.founderStory.headline).toContain("创始人叙事");
    expect(calendar.tasks[0]?.statusLabel).toBe("就绪");
  });
});
