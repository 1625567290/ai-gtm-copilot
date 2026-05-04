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
    expect(getDictionary("zh").dashboard.title).toBe("GTM 工作台");
    expect(getDictionary("ja").dashboard.title).toBe("GTM ワークスペース");
    expect(getDictionary("zh").app.navDemoGuide).toBe("展示指南");
    expect(getDictionary("ja").demo.route).toHaveLength(5);
  });
});
