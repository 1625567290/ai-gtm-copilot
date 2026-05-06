import { describe, expect, it } from "vitest";
import { analysisResultPath } from "../lib/navigation";

describe("analysis navigation", () => {
  it("routes a generated analysis into Signal Radar", () => {
    expect(analysisResultPath("campaign_123", "zh")).toBe("/radar?campaignId=campaign_123&lang=zh");
  });
});
