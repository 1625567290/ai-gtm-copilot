import type { Locale } from "../i18n";
import type { ProjectIntakeInput } from "../validation/project";
import { marketKolArchetypes } from "./reference-data";
import type { CampaignPlan } from "./types";

type Priority = "core" | "supporting" | "test";
type TaskStatus = "ready" | "scheduled" | "draft";
type TaskPriority = "high" | "medium" | "low";

export type KolPricingPackage = {
  market: string;
  archetype: string;
  packageName: string;
  priority: Priority;
  priceRange: string;
  exposureRange: string;
  cpm: string;
  deliverables: string[];
  rationale: string;
};

export type KolPricingPlan = {
  summary: {
    recommendedMarket: string;
    totalBudgetRange: string;
    targetExposure: string;
    blendedCpm: string;
  };
  packages: KolPricingPackage[];
};

export type FounderStoryAssets = {
  founderStory: {
    headline: string;
    body: string;
  };
  mediaPitch: {
    subject: string;
    body: string;
  };
  xThread: string[];
  communityAnnouncement: {
    title: string;
    body: string;
  };
};

export type SocialSignal = {
  source: string;
  market: string;
  topic: string;
  strength: number;
  sentiment: "positive" | "mixed" | "watch";
  recommendedMove: string;
};

export type SocialListeningRadar = {
  summary: {
    topMarket: string;
    strongestSignal: string;
    recommendedAngle: string;
  };
  signals: SocialSignal[];
};

export type CampaignTask = {
  day: number;
  phase: string;
  task: string;
  owner: string;
  channel: string;
  deliverable: string;
  status: TaskStatus;
  statusLabel: string;
  priority: TaskPriority;
};

export type CampaignTaskCalendar = {
  summary: {
    totalTasks: number;
    highPriorityCount: number;
    nextMilestone: string;
  };
  milestones: string[];
  tasks: CampaignTask[];
};

const budgetProfiles: Record<ProjectIntakeInput["budgetBand"], { min: number; max: number; exposureMin: number; exposureMax: number }> = {
  "under $5k": { min: 2500, max: 5000, exposureMin: 25_000, exposureMax: 55_000 },
  "$5k-$10k": { min: 5_000, max: 10_000, exposureMin: 55_000, exposureMax: 110_000 },
  "$10k-$25k": { min: 10_000, max: 25_000, exposureMin: 120_000, exposureMax: 280_000 },
  "$25k-$50k": { min: 25_000, max: 50_000, exposureMin: 320_000, exposureMax: 680_000 },
  "$50k+": { min: 50_000, max: 90_000, exposureMin: 750_000, exposureMax: 1_400_000 }
};

const marketMultipliers: Record<string, number> = {
  US: 1.2,
  Japan: 1.1,
  Korea: 1.05,
  "Southeast Asia": 0.82,
  CIS: 0.72,
  Europe: 1.08,
  Global: 1.25
};

const statusLabels: Record<Locale, Record<TaskStatus, string>> = {
  en: { ready: "Ready", scheduled: "Scheduled", draft: "Draft" },
  zh: { ready: "就绪", scheduled: "已排期", draft: "草稿" },
  ja: { ready: "準備完了", scheduled: "予定済み", draft: "下書き" }
};

const localizedCopy = {
  en: {
    corePackage: "Core KOL launch package",
    supportPackage: "Supporting KOL proof package",
    testPackage: "Market test KOL package",
    founderHeadline: (name: string) => `${name}: the founder story behind production-ready AI infrastructure`,
    founderBody: (input: ProjectIntakeInput) =>
      `${input.name} should tell a founder-led story around a clear operator pain: ${stripTrailingPunctuation(input.summary)}. The narrative should make the moat tangible, showing how ${stripTrailingPunctuation(input.moat)} changes the day-to-day workflow for ${input.audiences.join(", ")}.`,
    mediaSubject: (name: string) => `Story idea: how ${name} is turning AI infrastructure pain into a launch wedge`,
    mediaBody: (input: ProjectIntakeInput) =>
      `Hi, sharing a concise launch angle for ${input.name}. The team is targeting ${input.targetMarkets.join(", ")} with a ${input.tone} narrative and a concrete goal: ${stripTrailingPunctuation(input.launchGoal)}. The most relevant hook is the product's technical wedge: ${stripTrailingPunctuation(input.moat)}.`,
    communityTitle: (name: string) => `${name} beta community brief`,
    communityBody: (input: ProjectIntakeInput) =>
      `${input.name} is opening a focused feedback loop for ${input.audiences.join(", ")}. The ask is simple: test the workflow, challenge the technical claim, and help shape the launch around ${stripTrailingPunctuation(input.launchGoal)}.`,
    recommendedAngle: "developer proof and benchmark-led education",
    milestoneLabels: ["Narrative lock", "Distribution wave", "Proof recap"]
  },
  zh: {
    corePackage: "核心 KOL 发布包",
    supportPackage: "支撑型 KOL 证明包",
    testPackage: "市场验证 KOL 包",
    founderHeadline: (name: string) => `${name} 创始人叙事：把 AI 技术痛点转成清晰发布 wedge`,
    founderBody: (input: ProjectIntakeInput) =>
      `${input.name} 的创始人叙事应该围绕一个明确的用户痛点展开：${stripTrailingPunctuation(input.summary)}。内容要把护城河讲具体，说明 ${stripTrailingPunctuation(input.moat)} 如何改变 ${input.audiences.join(", ")} 的真实工作流。`,
    mediaSubject: (name: string) => `选题建议：${name} 如何把 AI 基础设施痛点变成增长切入点`,
    mediaBody: (input: ProjectIntakeInput) =>
      `你好，分享一个 ${input.name} 的发布选题。团队计划在 ${input.targetMarkets.join(", ")} 市场启动，用 ${input.tone} 叙事达成目标：${stripTrailingPunctuation(input.launchGoal)}。最值得展开的 hook 是技术差异化：${stripTrailingPunctuation(input.moat)}。`,
    communityTitle: (name: string) => `${name} beta 社区 brief`,
    communityBody: (input: ProjectIntakeInput) =>
      `${input.name} 正在面向 ${input.audiences.join(", ")} 开启一轮聚焦反馈。核心邀请是：试用工作流、挑战技术主张，并帮助把发布目标「${stripTrailingPunctuation(input.launchGoal)}」打磨成可传播的 proof。`,
    recommendedAngle: "开发者 proof 与 benchmark 教育",
    milestoneLabels: ["叙事锁定", "分发波次", "证明复盘"]
  },
  ja: {
    corePackage: "Core KOL ローンチパッケージ",
    supportPackage: "Supporting KOL proof パッケージ",
    testPackage: "市場検証 KOL パッケージ",
    founderHeadline: (name: string) => `${name} 創業者ストーリー：AI 技術課題を明確なローンチ wedge に変える`,
    founderBody: (input: ProjectIntakeInput) =>
      `${input.name} の創業者ストーリーは、明確な利用者課題「${stripTrailingPunctuation(input.summary)}」を中心に語るべきです。${stripTrailingPunctuation(input.moat)} が ${input.audiences.join(", ")} の実務フローをどう変えるかを具体化します。`,
    mediaSubject: (name: string) => `企画案：${name} が AI インフラ課題を成長の wedge に変える方法`,
    mediaBody: (input: ProjectIntakeInput) =>
      `こんにちは。${input.name} のローンチ角度を共有します。チームは ${input.targetMarkets.join(", ")} 市場で ${input.tone} なナラティブを使い、「${stripTrailingPunctuation(input.launchGoal)}」を狙っています。最も強い hook は技術的な差別化：${stripTrailingPunctuation(input.moat)} です。`,
    communityTitle: (name: string) => `${name} beta コミュニティ brief`,
    communityBody: (input: ProjectIntakeInput) =>
      `${input.name} は ${input.audiences.join(", ")} 向けのフィードバックループを開始します。ワークフローを試し、技術主張を検証し、ローンチ目標「${stripTrailingPunctuation(input.launchGoal)}」を伝わる proof に磨くことが目的です。`,
    recommendedAngle: "開発者 proof と benchmark 中心の教育",
    milestoneLabels: ["ナラティブ確定", "配信ウェーブ", "Proof 振り返り"]
  }
} as const;

function stripTrailingPunctuation(value: string) {
  return value.trim().replace(/[.!?。！？]+$/g, "");
}

function formatMoney(value: number) {
  return `$${Math.round(value / 100) * 100}`;
}

function formatRange(min: number, max: number) {
  return `${formatMoney(min)}-${formatMoney(max)}`;
}

function formatCompact(value: number) {
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1)}M`;
  }
  return `${Math.round(value / 1000)}k`;
}

function marketList(input: ProjectIntakeInput) {
  return input.targetMarkets.includes("Global") ? ["Global", "US"] : input.targetMarkets;
}

function priorityForIndex(index: number): Priority {
  if (index === 0) return "core";
  if (index === 1) return "supporting";
  return "test";
}

function packageName(locale: Locale, priority: Priority) {
  const copy = localizedCopy[locale];
  if (priority === "core") return copy.corePackage;
  if (priority === "supporting") return copy.supportPackage;
  return copy.testPackage;
}

function archetypeForMarket(market: string, campaign: CampaignPlan) {
  return (
    campaign.kolPlan.find((kol) => kol.market === market)?.archetype ??
    marketKolArchetypes[market]?.[0]?.archetype ??
    marketKolArchetypes.Global[0]?.archetype ??
    "AI product educator"
  );
}

function deliverablesFor(input: ProjectIntakeInput, priority: Priority) {
  const technical = input.audiences.includes("developers") || input.audiences.includes("AI researchers");
  const base = technical ? ["1 technical thread", "1 demo clip"] : ["1 positioning thread", "1 product walkthrough"];

  if (priority === "core") {
    return [...base, "1 community AMA", "quote-card reuse rights"];
  }

  if (priority === "supporting") {
    return [...base, "1 follow-up repost"];
  }

  return ["1 market test post", "lightweight comment amplification"];
}

export function buildKolPricing(input: ProjectIntakeInput, campaign: CampaignPlan, locale: Locale = input.outputLocale): KolPricingPlan {
  const profile = budgetProfiles[input.budgetBand];
  const markets = marketList(input).slice(0, 4);
  const packages = markets.map((market, index) => {
    const priority = priorityForIndex(index);
    const share = index === 0 ? 0.48 : index === 1 ? 0.32 : 0.2 / Math.max(1, markets.length - 2);
    const multiplier = marketMultipliers[market] ?? 1;
    const min = profile.min * share * multiplier;
    const max = profile.max * share * multiplier;
    const exposureMin = profile.exposureMin * share * (2 - multiplier / 2);
    const exposureMax = profile.exposureMax * share * (2 - multiplier / 2);
    const cpm = ((min + max) / 2 / ((exposureMin + exposureMax) / 2)) * 1000;

    return {
      market,
      archetype: archetypeForMarket(market, campaign),
      packageName: packageName(locale, priority),
      priority,
      priceRange: formatRange(min, max),
      exposureRange: `${formatCompact(exposureMin)}-${formatCompact(exposureMax)}`,
      cpm: `$${Math.round(cpm)}`,
      deliverables: deliverablesFor(input, priority),
      rationale:
        locale === "zh"
          ? `${market} 适合用 ${archetypeForMarket(market, campaign)} 承接 ${input.audiences.join(", ")} 的早期信任。`
          : locale === "ja"
            ? `${market} では ${archetypeForMarket(market, campaign)} が ${input.audiences.join(", ")} への初期信頼形成に適しています。`
            : `${market} is best activated through ${archetypeForMarket(market, campaign)} for early trust with ${input.audiences.join(", ")}.`
    };
  });

  const totalExposureMin = packages.reduce((sum, item) => sum + Number(item.exposureRange.split("-")[0]?.replace(/[^\d.]/g, "") ?? 0), 0);
  const totalExposureMax = packages.reduce((sum, item) => sum + Number(item.exposureRange.split("-")[1]?.replace(/[^\d.]/g, "") ?? 0), 0);

  return {
    summary: {
      recommendedMarket: packages[0]?.market ?? markets[0] ?? "Global",
      totalBudgetRange: input.budgetBand,
      targetExposure: `${Math.round(totalExposureMin)}k-${Math.round(totalExposureMax)}k`,
      blendedCpm: packages[0]?.cpm ?? "$0"
    },
    packages
  };
}

export function buildFounderStoryAssets(
  input: ProjectIntakeInput,
  campaign: CampaignPlan,
  locale: Locale = input.outputLocale
): FounderStoryAssets {
  const copy = localizedCopy[locale];
  const primaryAngle = campaign.contentAngles[0] ?? `${input.name} matters now`;
  const xThread =
    locale === "zh"
      ? [
          `${input.name} 的发布不应该只讲功能，而要讲为什么这个问题现在必须被解决。`,
          `用户痛点：${stripTrailingPunctuation(input.summary)}。`,
          `技术 wedge：${stripTrailingPunctuation(input.moat)}。`,
          `GTM 切入：先用 ${input.targetMarkets[0]} 的开发者 proof 建立可信度，再扩大 KOL 分发。`,
          `CTA：${stripTrailingPunctuation(input.launchGoal)}。`
        ]
      : locale === "ja"
        ? [
            `${input.name} のローンチでは機能だけでなく、なぜ今この課題を解くべきかを語ります。`,
            `ユーザー課題：${stripTrailingPunctuation(input.summary)}。`,
            `技術 wedge：${stripTrailingPunctuation(input.moat)}。`,
            `GTM：まず ${input.targetMarkets[0]} の開発者 proof で信頼を作り、KOL 配信を広げます。`,
            `CTA：${stripTrailingPunctuation(input.launchGoal)}。`
          ]
        : [
            `${input.name} should not launch with features alone; it should launch with a clear reason this pain matters now.`,
            `The user pain: ${stripTrailingPunctuation(input.summary)}.`,
            `The technical wedge: ${stripTrailingPunctuation(input.moat)}.`,
            `The GTM move: start with developer proof in ${input.targetMarkets[0]}, then expand through KOL distribution.`,
            `CTA: ${stripTrailingPunctuation(input.launchGoal)}.`
          ];

  return {
    founderStory: {
      headline: copy.founderHeadline(input.name),
      body: `${copy.founderBody(input)} ${locale === "en" ? "Lead with this angle:" : locale === "zh" ? "建议主线：" : "推奨角度："} ${primaryAngle}`
    },
    mediaPitch: {
      subject: copy.mediaSubject(input.name),
      body: copy.mediaBody(input)
    },
    xThread,
    communityAnnouncement: {
      title: copy.communityTitle(input.name),
      body: copy.communityBody(input)
    }
  };
}

export function buildSocialListeningRadar(
  input: ProjectIntakeInput,
  campaign: CampaignPlan,
  locale: Locale = input.outputLocale
): SocialListeningRadar {
  const primaryMarket = marketList(input)[0] ?? "Global";
  const secondaryMarket = marketList(input)[1] ?? "Global";
  const technical = input.audiences.includes("developers") || input.audiences.includes("AI researchers");
  const proofSignal = technical ? "developer proof requests" : "operator proof requests";
  const benchmarkSignal = input.category === "AI Infra" || input.category === "Data Platform" ? "benchmark credibility" : "workflow proof";
  const recommendedAngle = localizedCopy[locale].recommendedAngle;

  const signals: SocialSignal[] = [
    {
      source: "Builder communities",
      market: primaryMarket,
      topic: proofSignal,
      strength: 88,
      sentiment: "positive",
      recommendedMove:
        locale === "zh"
          ? "发布技术 proof、benchmark 图和创始人解释 thread。"
          : locale === "ja"
            ? "technical proof、benchmark 図、創業者解説 thread を公開します。"
            : "publish technical proof, benchmark visuals, and a founder explanation thread."
    },
    {
      source: "KOL conversations",
      market: secondaryMarket,
      topic: benchmarkSignal,
      strength: 82,
      sentiment: "mixed",
      recommendedMove:
        locale === "zh"
          ? "用本地化 demo clip 回应可信度问题。"
          : locale === "ja"
            ? "ローカライズした demo clip で信頼性の疑問に答えます。"
            : "answer credibility questions with localized demo clips."
    },
    {
      source: "Newsletter desk",
      market: "Global",
      topic: "category timing",
      strength: 76,
      sentiment: "positive",
      recommendedMove:
        locale === "zh"
          ? "把 launch goal 转成可报道的品类时机。"
          : locale === "ja"
            ? "launch goal を報道しやすいカテゴリタイミングに変換します。"
            : "turn the launch goal into a newsworthy category-timing hook."
    },
    {
      source: "Competitor mentions",
      market: primaryMarket,
      topic: "differentiation pressure",
      strength: 69,
      sentiment: "watch",
      recommendedMove:
        locale === "zh"
          ? "用 before/after 工作流避免落入泛 AI 叙事。"
          : locale === "ja"
            ? "before/after ワークフローで汎用 AI 訴求を避けます。"
            : "use before/after workflow proof to avoid generic AI positioning."
    }
  ];

  return {
    summary: {
      topMarket: primaryMarket,
      strongestSignal: signals[0]?.topic ?? proofSignal,
      recommendedAngle
    },
    signals
  };
}

function channelForDay(day: number, campaign: CampaignPlan) {
  if (day <= 2) return "Founder content";
  if (day <= 4) return campaign.channelMix[0]?.name ?? "Community";
  if (day <= 8) return "KOL distribution";
  if (day <= 11) return campaign.channelMix[1]?.name ?? "Media";
  return "Retargeting and recap";
}

function deliverableForDay(day: number, locale: Locale) {
  const en = [
    "Positioning one-liner and CTA",
    "Technical narrative post",
    "KOL briefing pack",
    "Community objection log",
    "Founder X thread",
    "Benchmark or workflow proof",
    "Small-group demo agenda",
    "Proof-led KOL clips",
    "Niche newsletter media kit",
    "Warm audience CTA refresh",
    "Objection-handling post",
    "Ambassador referral prompt",
    "Channel-market scorecard",
    "Launch recap memo"
  ];
  const zh = [
    "Positioning 一句话和 CTA",
    "技术叙事文章",
    "KOL brief 包",
    "社区异议记录",
    "创始人 X thread",
    "Benchmark 或工作流 proof",
    "小范围 demo 议程",
    "Proof-led KOL 短素材",
    "垂直 newsletter media kit",
    "暖启动受众 CTA 刷新",
    "异议处理内容",
    "Ambassador 转介绍提示",
    "渠道-市场评分表",
    "Launch recap 备忘录"
  ];
  const ja = [
    "Positioning 一文と CTA",
    "技術ナラティブ記事",
    "KOL briefing pack",
    "コミュニティ反論ログ",
    "創業者 X thread",
    "Benchmark または workflow proof",
    "小規模 demo agenda",
    "Proof-led KOL clips",
    "専門 newsletter media kit",
    "温度感の高い audience CTA 更新",
    "反論処理コンテンツ",
    "Ambassador referral prompt",
    "チャネル・市場 scorecard",
    "Launch recap memo"
  ];

  const source = locale === "zh" ? zh : locale === "ja" ? ja : en;
  return source[day - 1] ?? source[0];
}

function statusForDay(day: number): TaskStatus {
  if (day <= 3) return "ready";
  if (day <= 10) return "scheduled";
  return "draft";
}

function priorityForDay(day: number): TaskPriority {
  if ([1, 3, 5, 8, 13].includes(day)) return "high";
  if (day <= 11) return "medium";
  return "low";
}

export function buildCampaignTaskCalendar(
  input: ProjectIntakeInput,
  campaign: CampaignPlan,
  locale: Locale = input.outputLocale
): CampaignTaskCalendar {
  const tasks = campaign.launchCalendar.map((item) => {
    const status = statusForDay(item.day);

    return {
      day: item.day,
      phase: item.focus,
      task: item.action,
      owner: item.owner,
      channel: channelForDay(item.day, campaign),
      deliverable: deliverableForDay(item.day, locale),
      status,
      statusLabel: statusLabels[locale][status],
      priority: priorityForDay(item.day)
    };
  });
  const highPriorityCount = tasks.filter((task) => task.priority === "high").length;

  return {
    summary: {
      totalTasks: tasks.length,
      highPriorityCount,
      nextMilestone: localizedCopy[locale].milestoneLabels[0]
    },
    milestones: localizedCopy[locale].milestoneLabels.map((label, index) => {
      const day = index === 0 ? "D1-D3" : index === 1 ? "D4-D10" : "D11-D14";
      return `${day}: ${label}`;
    }),
    tasks
  };
}
