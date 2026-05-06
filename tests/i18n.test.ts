import { describe, expect, it } from "vitest";
import { dictionaries, getDictionary, getLocale, withLocale } from "../lib/i18n";

describe("i18n helpers", () => {
  it("normalizes supported locales and falls back to English", () => {
    expect(getLocale("zh")).toBe("zh");
    expect(getLocale("ja")).toBe("ja");
    expect(getLocale("en")).toBe("en");
    expect(getLocale("fr")).toBe("en");
    expect(getLocale(["ja", "zh"])).toBe("ja");
  });

  it("adds or replaces the lang query parameter", () => {
    expect(withLocale("/projects/new", "ja")).toBe("/projects/new?lang=ja");
    expect(withLocale("/campaigns/123?tab=plan&lang=en", "zh")).toBe(
      "/campaigns/123?tab=plan&lang=zh"
    );
  });

  it("ships Chinese, English, and Japanese dictionaries", () => {
    expect(Object.keys(dictionaries).sort()).toEqual(["en", "ja", "zh"]);
    expect(getDictionary("en").app.productName).toBe("AI Product Signal Radar");
    expect(getDictionary("zh").app.productName).toBe("AI 产品信号雷达");
    expect(getDictionary("ja").app.productName).toBe("AI Product Signal Radar");
    expect(getDictionary("zh").dashboard.title).toBe("AI 产品信号雷达");
    expect(getDictionary("ja").dashboard.title).toBe("AI Product Signal Radar");
    expect(getDictionary("en").app.navDashboard).toBe("Signal Radar");
    expect(getDictionary("en").app.navKolStudio).toBe("KOL Action Plan");
    expect(getDictionary("zh").app.navKolStudio).toBe("KOL 行动计划");
    expect(getDictionary("en").app.navPricer).toBe("KOL Pricer");
    expect(getDictionary("zh").app.navRadar).toBe("信号雷达");
    expect(getDictionary("zh").intake.formError).toContain("网址格式");
    expect(getDictionary("zh").intake.sampleButton).toBe("使用示例 AI 产品");
    expect(getDictionary("en").intake.fieldErrors.website).toContain("valid URL");
    expect(getDictionary("zh").app.navDemoGuide).toBe("展示指南");
    expect(getDictionary("zh").demo.opening).toContain("社交信号");
    expect(getDictionary("en").demo.route).toHaveLength(6);
    expect(getDictionary("ja").demo.route).toHaveLength(6);
  });
});
