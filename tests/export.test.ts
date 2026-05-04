import { describe, expect, it } from "vitest";
import { campaignToMarkdown } from "../lib/gtm/export";
import { generateCampaignPlan } from "../lib/gtm/generate";
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

describe("campaignToMarkdown", () => {
  it("exports a complete launch brief", () => {
    const campaign = generateCampaignPlan(project);
    const markdown = campaignToMarkdown(project, campaign);

    expect(markdown).toContain("# VectorForge GTM Launch Plan");
    expect(markdown).toContain("Readiness Score");
    expect(markdown).toContain("Positioning");
    expect(markdown).toContain("Channel Mix");
    expect(markdown).toContain("KOL Plan");
    expect(markdown).toContain("14-Day Launch Calendar");
    expect(markdown).toContain("Success Metrics");
    expect(markdown).toContain("Risks");
  });

  it("localizes markdown section headings for Chinese briefs", () => {
    const localizedProject = {
      ...project,
      outputLocale: "zh" as const
    };
    const campaign = generateCampaignPlan(localizedProject);
    const markdown = campaignToMarkdown(localizedProject, campaign);

    expect(markdown).toContain("# VectorForge GTM 发布计划");
    expect(markdown).toContain("## 定位");
    expect(markdown).toContain("## 14 天发布日历");
  });
});
