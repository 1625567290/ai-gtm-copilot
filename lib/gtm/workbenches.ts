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

export type SignalTopic = {
  name: string;
  urgency: "high" | "medium" | "low";
  strength: number;
  rationale: string;
  recommendedAction: string;
};

export type KeyVoice = {
  name: string;
  role: string;
  market: string;
  whyItMatters: string;
  activationMove: string;
};

export type SignalAction = {
  action: string;
  priority: TaskPriority;
  channel: string;
  owner: string;
  evidence: string;
};

export type SocialListeningRadar = {
  summary: {
    topMarket: string;
    strongestSignal: string;
    recommendedAngle: string;
  };
  stats: {
    totalSignals: number;
    positive: number;
    mixed: number;
    watch: number;
    highUrgency: number;
    opportunityScore: number;
  };
  signals: SocialSignal[];
  topics: SignalTopic[];
  keyVoices: KeyVoice[];
  actionQueue: SignalAction[];
  strategyReport: string;
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
  const totalSignals = 120 + input.targetMarkets.length * 24 + input.audiences.length * 18;
  const positive = Math.round(totalSignals * 0.48);
  const mixed = Math.round(totalSignals * 0.34);
  const watch = totalSignals - positive - mixed;
  const highUrgency = Math.max(8, Math.round(totalSignals * 0.12));
  const opportunityScore = Math.min(94, 78 + input.targetMarkets.length * 4 + (technical ? 6 : 2));

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
  const strongestSignal = signals[0]?.topic ?? proofSignal;

  const topics: SignalTopic[] = [
    {
      name:
        locale === "zh"
          ? `${input.name} 的 proof 可信度`
          : locale === "ja"
            ? `${input.name} の proof 信頼性`
            : `${input.name} proof credibility`,
      urgency: "high",
      strength: 92,
      rationale:
        locale === "zh"
          ? `${primaryMarket} 的早期讨论正在寻找可验证的技术证明，而不是泛泛的 AI 叙事。`
          : locale === "ja"
            ? `${primaryMarket} の初期議論は一般的な AI 訴求ではなく、検証可能な技術 proof を求めています。`
            : `${primaryMarket} conversations are asking for verifiable technical proof instead of generic AI positioning.`,
      recommendedAction:
        locale === "zh"
          ? "优先发布 benchmark 图、demo clip 和 founder thread。"
          : locale === "ja"
            ? "benchmark 図、demo clip、founder thread を優先公開します。"
            : "Reply with benchmark visuals, a demo clip, and a founder thread."
    },
    {
      name:
        locale === "zh"
          ? `${secondaryMarket} 本地化 KOL 教育`
          : locale === "ja"
            ? `${secondaryMarket} ローカル KOL 教育`
            : `${secondaryMarket} localized KOL education`,
      urgency: "medium",
      strength: 84,
      rationale:
        locale === "zh"
          ? "跨市场受众需要本地语境下的使用案例和可信解释。"
          : locale === "ja"
            ? "複数市場のオーディエンスには、ローカル文脈でのユースケースと信頼できる説明が必要です。"
            : "Cross-market audiences need local use cases and trusted explanation from familiar voices.",
      recommendedAction:
        locale === "zh"
          ? "给 2-3 位本地 builder-educator brief 一条教育型 thread。"
          : locale === "ja"
            ? "2-3 名のローカル builder-educator に教育型 thread を brief します。"
            : "Brief 2-3 local builder-educators on one education-led thread."
    },
    {
      name:
        locale === "zh"
          ? "竞品差异化压力"
          : locale === "ja"
            ? "競合との差別化圧力"
            : "competitor differentiation pressure",
      urgency: "medium",
      strength: 78,
      rationale:
        locale === "zh"
          ? "用户会把新 AI 产品放进已知竞品框架里比较，需要明确 before/after。"
          : locale === "ja"
            ? "ユーザーは新しい AI プロダクトを既存競合の枠組みで比較するため、明確な before/after が必要です。"
            : "Users compare new AI products through known competitor frames, so the before/after needs to be explicit.",
      recommendedAction:
        locale === "zh"
          ? "把护城河转成一张 before/after 工作流对比图。"
          : locale === "ja"
            ? "moat を before/after ワークフロー比較に変換します。"
            : "Turn the moat into a before/after workflow comparison."
    },
    {
      name:
        locale === "zh"
          ? "发布时机叙事"
          : locale === "ja"
            ? "ローンチタイミングのナラティブ"
            : "launch timing narrative",
      urgency: "low",
      strength: 72,
      rationale:
        locale === "zh"
          ? "媒体和社区更容易传播带有品类时机判断的发布故事。"
          : locale === "ja"
            ? "メディアとコミュニティはカテゴリタイミングを含むローンチストーリーを広げやすいです。"
            : "Media and communities are more likely to share launch stories with a category-timing point of view.",
      recommendedAction:
        locale === "zh"
          ? "把发布目标包装成“为什么现在”的市场 timing hook。"
          : locale === "ja"
            ? "launch goal を「なぜ今か」の market timing hook に変換します。"
            : "Package the launch goal as a why-now market timing hook."
    }
  ];

  const keyVoices: KeyVoice[] = [
    {
      name: technical ? "AI infra builder-educator" : "AI product workflow educator",
      role:
        locale === "zh"
          ? "技术解释型 KOL"
          : locale === "ja"
            ? "技術解説型 KOL"
            : "Technical explainer KOL",
      market: primaryMarket,
      whyItMatters:
        locale === "zh"
          ? "能把复杂技术转成开发者愿意转发的 proof。"
          : locale === "ja"
            ? "複雑な技術を開発者が共有しやすい proof に変換できます。"
            : "Can turn complex product proof into developer-native content that travels.",
      activationMove:
        locale === "zh"
          ? "brief 一条 benchmark-led thread，并提供 demo clip 素材。"
          : locale === "ja"
            ? "benchmark-led thread を brief し、demo clip 素材を提供します。"
            : "brief a benchmark-led thread and provide demo clip assets."
    },
    {
      name: "Community operator",
      role:
        locale === "zh"
          ? "社区运营型 KOL"
          : locale === "ja"
            ? "コミュニティ運営型 KOL"
            : "Community operator",
      market: secondaryMarket,
      whyItMatters:
        locale === "zh"
          ? "能把讨论从单条曝光推进到 AMA、反馈和 beta 转化。"
          : locale === "ja"
            ? "単発露出から AMA、feedback、beta conversion へ議論を進められます。"
            : "Moves attention from one-off exposure into AMA, feedback, and beta conversion.",
      activationMove:
        locale === "zh"
          ? "brief 一个 30 分钟社区 AMA 和反馈收集帖。"
          : locale === "ja"
            ? "30 分の community AMA と feedback post を brief します。"
            : "brief a 30-minute community AMA and feedback capture post."
    },
    {
      name: "Newsletter analyst",
      role:
        locale === "zh"
          ? "垂直媒体分析师"
          : locale === "ja"
            ? "専門 newsletter analyst"
            : "Vertical newsletter analyst",
      market: "Global",
      whyItMatters:
        locale === "zh"
          ? "能把产品发布放进品类趋势和市场 timing 中解释。"
          : locale === "ja"
            ? "プロダクトローンチをカテゴリトレンドと market timing の文脈で説明できます。"
            : "Frames the launch inside category timing and market trend context.",
      activationMove:
        locale === "zh"
          ? "brief 一段 why-now pitch，加上 3 个 proof bullet。"
          : locale === "ja"
            ? "why-now pitch と 3 つの proof bullet を brief します。"
            : "brief a why-now pitch with 3 proof bullets."
    }
  ];

  const actionQueue: SignalAction[] = [
    {
      action:
        locale === "zh"
          ? "回复高意图讨论并附上技术 proof"
          : locale === "ja"
            ? "高意図の議論に technical proof 付きで返信"
            : "Reply to high-intent discussions with technical proof",
      priority: "high",
      channel: "X / developer communities",
      owner: "Growth",
      evidence: topics[0]?.name ?? strongestSignal
    },
    {
      action:
        locale === "zh"
          ? "给核心 KOL 发送本地化 activation brief"
          : locale === "ja"
            ? "Core KOL にローカライズした activation brief を送付"
            : "Send localized activation briefs to core KOLs",
      priority: "high",
      channel: "KOL outreach",
      owner: "Partnerships",
      evidence: keyVoices[0]?.name ?? "KOL conversations"
    },
    {
      action:
        locale === "zh"
          ? "放大 benchmark 和 before/after 工作流"
          : locale === "ja"
            ? "benchmark と before/after workflow を増幅"
            : "Amplify benchmark and before/after workflow proof",
      priority: "medium",
      channel: "Founder content",
      owner: "Founder",
      evidence: topics[2]?.name ?? benchmarkSignal
    },
    {
      action:
        locale === "zh"
          ? "监控竞品对比和负面异议"
          : locale === "ja"
            ? "競合比較と反論をモニタリング"
            : "Monitor competitor comparisons and objections",
      priority: "medium",
      channel: "Social listening",
      owner: "Marketing engineer",
      evidence: signals[3]?.topic ?? "differentiation pressure"
    }
  ];

  const strategyReport =
    locale === "zh"
      ? `${input.name} 当前最值得抓住的 GTM 机会是 ${primaryMarket} 的「${topics[0]?.name}」。建议先用 founder-led proof 回应高意图讨论，再把 ${keyVoices[0]?.name} 和 ${keyVoices[1]?.name} 组合成一轮 KOL activation。预算应优先投向 ${primaryMarket}，同时用 ${secondaryMarket} 做本地化教育验证。`
      : locale === "ja"
        ? `${input.name} の最も強い GTM 機会は ${primaryMarket} の「${topics[0]?.name}」です。まず founder-led proof で高意図の議論に応答し、${keyVoices[0]?.name} と ${keyVoices[1]?.name} を組み合わせた KOL activation を実行します。予算は ${primaryMarket} を優先し、${secondaryMarket} でローカライズ教育を検証します。`
        : `${input.name}'s strongest GTM opportunity is ${topics[0]?.name} in ${primaryMarket}. Lead with founder-led proof for high-intent conversations, then activate ${keyVoices[0]?.name} and ${keyVoices[1]?.name} as a paired KOL motion. Budget should prioritize ${primaryMarket} while using ${secondaryMarket} to validate localized education.`;

  return {
    summary: {
      topMarket: primaryMarket,
      strongestSignal,
      recommendedAngle
    },
    stats: {
      totalSignals,
      positive,
      mixed,
      watch,
      highUrgency,
      opportunityScore
    },
    signals,
    topics,
    keyVoices,
    actionQueue,
    strategyReport
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
