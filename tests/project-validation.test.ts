import { describe, expect, it } from "vitest";
import { projectIntakeSchema } from "../lib/validation/project";

const validIntake = {
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

describe("projectIntakeSchema", () => {
  it("parses a complete AI GTM intake", () => {
    const parsed = projectIntakeSchema.parse(validIntake);

    expect(parsed.name).toBe("VectorForge");
    expect(parsed.targetMarkets).toEqual(["US", "Japan"]);
    expect(parsed.audiences).toContain("developers");
    expect(parsed.outputLocale).toBe("en");
  });

  it("defaults generated briefs to English", () => {
    const { outputLocale, ...legacyIntake } = validIntake;
    const parsed = projectIntakeSchema.parse(legacyIntake);

    expect(outputLocale).toBe("en");
    expect(parsed.outputLocale).toBe("en");
  });

  it("rejects a missing product name", () => {
    const result = projectIntakeSchema.safeParse({
      ...validIntake,
      name: ""
    });

    expect(result.success).toBe(false);
    expect(result.error?.issues[0]?.message).toBe("Product name is required.");
  });

  it("rejects invalid website URLs when provided", () => {
    const result = projectIntakeSchema.safeParse({
      ...validIntake,
      website: "not-a-url"
    });

    expect(result.success).toBe(false);
    expect(result.error?.issues[0]?.message).toBe("Website must be a valid URL.");
  });

  it("requires at least one target market and audience", () => {
    const result = projectIntakeSchema.safeParse({
      ...validIntake,
      targetMarkets: [],
      audiences: []
    });

    expect(result.success).toBe(false);
    expect(result.error?.issues.map((issue) => issue.message)).toEqual([
      "Select at least one target market.",
      "Select at least one target audience."
    ]);
  });
});
