import type {
  CampaignInput,
  CampaignPlan,
  ChannelRecommendation,
  KolRecommendation,
  LaunchCalendarItem
} from "./types";
import {
  budgetGuidance,
  calendarActions,
  categoryFrames,
  channelRules,
  fallbackChannels,
  marketKolArchetypes,
  toneVerbs
} from "./reference-data";

function uniqueByName(channels: ChannelRecommendation[]) {
  const seen = new Set<string>();
  return channels.filter((channel) => {
    if (seen.has(channel.name)) {
      return false;
    }
    seen.add(channel.name);
    return true;
  });
}

function selectChannels(input: CampaignInput): ChannelRecommendation[] {
  const matched = channelRules.flatMap((rule) => {
    const stageMatches = rule.stages.includes(input.stage);
    const audienceMatches = input.audiences.some((audience) => rule.audiences.includes(audience));
    return stageMatches && audienceMatches ? rule.channels : [];
  });

  return uniqueByName(matched.length > 0 ? matched : fallbackChannels).slice(0, 4);
}

function budgetFor(input: CampaignInput, index: number) {
  const launchMode = budgetGuidance[input.budgetBand];
  const weights = ["core", "supporting", "experimental"];
  return `${launchMode} / ${weights[index] ?? "supporting"}`;
}

function selectKols(input: CampaignInput): KolRecommendation[] {
  const markets = input.targetMarkets.includes("Global") ? ["Global", "US"] : input.targetMarkets;
  const recommendations = markets.flatMap((market) =>
    (marketKolArchetypes[market] ?? marketKolArchetypes.Global).map((kol, index) => ({
      ...kol,
      market,
      budget: budgetFor(input, index)
    }))
  );

  return recommendations.slice(0, 5);
}

function readinessScore(input: CampaignInput) {
  let score = 48;
  score += input.summary.length > 80 ? 10 : 4;
  score += input.moat.length > 45 ? 12 : 5;
  score += input.targetMarkets.length >= 2 ? 8 : 4;
  score += input.audiences.length >= 2 ? 8 : 4;
  score += input.budgetBand === "$25k-$50k" || input.budgetBand === "$50k+" ? 8 : 5;
  score += input.stage === "post-launch" || input.stage === "ecosystem expansion" ? 6 : 3;

  return Math.min(92, Math.max(35, score));
}

function stripTrailingPunctuation(value: string) {
  return value.trim().replace(/[.!?]+$/g, "");
}

function indefiniteArticle(phrase: string) {
  return /^[aeiou]/i.test(phrase.trim()) ? "an" : "a";
}

function contentAngles(input: CampaignInput): string[] {
  const verb = toneVerbs[input.tone];
  const frame = categoryFrames[input.category];
  const goal = stripTrailingPunctuation(input.launchGoal);

  return [
    `${verb} why ${input.name} matters now for ${input.audiences[0]}`,
    `Turn the core moat into a simple before/after workflow: ${input.moat}`,
    `Use one concrete user pain to show why the ${frame} matters now`,
    `Invite ${input.targetMarkets.join(" + ")} builders into a transparent launch journey`,
    `Turn "${goal}" into a public milestone narrative`
  ];
}

function launchCalendar(input: CampaignInput): LaunchCalendarItem[] {
  return calendarActions.map((action, index) => ({
    day: index + 1,
    focus: index < 3 ? "Narrative setup" : index < 8 ? "Distribution sprint" : "Conversion and proof",
    action,
    owner: index % 3 === 0 ? "GTM Lead" : index % 3 === 1 ? "Founder" : "Community Lead"
  }));
}

function successMetrics(input: CampaignInput) {
  const base = [
    "qualified beta signups",
    "KOL post engagement quality",
    "community activation rate",
    "demo or waitlist conversion"
  ];

  if (input.audiences.includes("enterprise buyers")) {
    base.push("qualified pipeline");
  }

  if (input.audiences.includes("developers")) {
    base.push("developer activation and retained usage");
  }

  return base;
}

function riskFlags(input: CampaignInput) {
  const risks = [
    "Narrative may sound too broad if the launch wedge is not repeated across every asset.",
    "KOL reach can create shallow traffic unless paired with a clear conversion path."
  ];

  if (input.stage === "post-launch" || input.audiences.includes("enterprise buyers")) {
    risks.push("Enterprise audiences will expect proof, customer evidence, and concrete deployment context.");
  }

  if (input.targetMarkets.length > 2) {
    risks.push("Multi-market execution needs localization discipline to avoid generic messaging.");
  }

  return risks;
}

const localizedChannelCopy = {
  zh: {
    "Developer communities": {
      name: "开发者社区",
      role: "通过 Discord、GitHub、Reddit、Hacker News 和 AI builder 社群招募技术 beta 用户。",
      rationale: "技术产品需要先获得真实使用者验证，再扩大声量。"
    },
    "Technical founder content": {
      name: "创始人技术内容",
      role: "发布创始人技术笔记、架构解析和 benchmark thread。",
      rationale: "开发者信任来自团队展示技术深度，而不是泛泛的市场话术。"
    },
    "Partner demos": {
      name: "伙伴联合 Demo",
      role: "和早期生态伙伴、工具链伙伴或模型生态伙伴做小范围联合 demo。",
      rationale: "伙伴背书能让发布前的产品主张更可信。"
    },
    "Analyst and operator briefings": {
      name: "分析师与运营者 Briefing",
      role: "用 proof-led 材料触达企业运营者、生态分析师和垂直 AI newsletter。",
      rationale: "后发布阶段需要把可信度和购买场景翻译清楚。"
    },
    "Customer proof campaign": {
      name: "客户证明 Campaign",
      role: "把客户工作流转成案例、demo clip 和高管社交素材。",
      rationale: "发布后的增长依赖 proof，而不只是新鲜感。"
    },
    "Narrative reset": {
      name: "叙事重置",
      role: "先明确品类、受众和 wedge，再扩大分发。",
      rationale: "清晰叙事能避免浪费 KOL 和媒体预算。"
    }
  },
  ja: {
    "Developer communities": {
      name: "開発者コミュニティ",
      role: "Discord、GitHub、Reddit、Hacker News、AI builder コミュニティで技術ベータユーザーを獲得します。",
      rationale: "技術プロダクトは広く認知を取る前に、実務者からの検証が必要です。"
    },
    "Technical founder content": {
      name: "創業者による技術コンテンツ",
      role: "創業者の技術ノート、アーキテクチャ解説、benchmark thread を公開します。",
      rationale: "開発者の信頼は抽象的な訴求よりも、チームの技術的な深さから生まれます。"
    },
    "Partner demos": {
      name: "パートナー共同 Demo",
      role: "初期のエコシステム、ツール、モデル関連パートナーと小規模な共同 demo を行います。",
      rationale: "パートナーの証明はローンチ前の主張を信頼しやすくします。"
    },
    "Analyst and operator briefings": {
      name: "アナリストと運用者向け Briefing",
      role: "proof-led な資料で企業運用者、エコシステムアナリスト、AI newsletter に説明します。",
      rationale: "ローンチ後の施策では、信頼性と購買文脈の翻訳が重要です。"
    },
    "Customer proof campaign": {
      name: "顧客証明 Campaign",
      role: "顧客ワークフローをケーススタディ、demo clip、経営層向けソーシャル素材に変換します。",
      rationale: "ローンチ後の成長は新規性だけでなく proof に依存します。"
    },
    "Narrative reset": {
      name: "ナラティブ再設計",
      role: "カテゴリ、対象者、wedge を明確にしてから配信を拡大します。",
      rationale: "明確なナラティブは KOL とメディア予算の浪費を防ぎます。"
    }
  }
} as const;

const localizedCalendarActions = {
  zh: [
    "确定定位一句话和 beta 邀请 CTA。",
    "发布技术叙事文章，展示产品架构或工作流 proof。",
    "用本地化 talking points 和 demo 素材 brief 第一波 KOL。",
    "举办社区验证 session，收集反对意见。",
    "发布创始人 thread，围绕用户痛点和品类时机展开。",
    "发布 benchmark、工作流或客户 proof 资产。",
    "面向目标用户和生态伙伴举办小范围 demo。",
    "用 proof-led 短视频和 quote card 启动第二波 KOL。",
    "用精简 media kit 触达垂直 newsletter 和运营者社区。",
    "用 beta 邀请或 demo 预约 CTA 重新触达暖启动社区。",
    "基于社区问题发布异议处理内容。",
    "启动 ambassador 或早期用户转介绍动作。",
    "收集 campaign 数据，识别最强渠道-市场组合。",
    "发布 launch recap，总结 traction、学习和下一阶段里程碑。"
  ],
  ja: [
    "ポジショニングの一文とベータ招待 CTA を確定します。",
    "プロダクト構造またはワークフロー proof を示す技術ナラティブ記事を公開します。",
    "ローカライズした talking points と demo 素材で最初の KOL 波を brief します。",
    "コミュニティ検証 session を実施し、反論や懸念を収集します。",
    "ユーザー課題とカテゴリタイミングを軸に創業者 thread を公開します。",
    "benchmark、ワークフロー、顧客 proof のいずれかを公開します。",
    "対象ユーザーとエコシステムパートナー向けに小規模 demo を開催します。",
    "proof-led な短尺素材と quote card で第二波 KOL を展開します。",
    "簡潔な media kit で専門 newsletter と運用者コミュニティに pitch します。",
    "ベータ招待または demo 予約 CTA で温度感の高いコミュニティを再接触します。",
    "コミュニティからの質問をもとに反論処理コンテンツを公開します。",
    "ambassador または初期ユーザー紹介の導線を起動します。",
    "campaign 指標を回収し、最も強いチャネル・市場ペアを特定します。",
    "traction、学び、次のマイルストーンをまとめた launch recap を公開します。"
  ]
} as const;

function localizeChannels(channels: ChannelRecommendation[], locale: "zh" | "ja") {
  const copy = localizedChannelCopy[locale];

  return channels.map((channel) => {
    const localized = copy[channel.name as keyof typeof copy];
    return localized ? { ...channel, ...localized } : channel;
  });
}

function localizedCalendar(input: CampaignInput, locale: "zh" | "ja"): LaunchCalendarItem[] {
  const actions = localizedCalendarActions[locale];
  const focus =
    locale === "zh"
      ? ["叙事铺垫", "分发冲刺", "转化与证明"]
      : ["ナラティブ設計", "配信スプリント", "コンバージョンと proof"];
  const owners =
    locale === "zh"
      ? ["GTM 负责人", "创始人", "社区负责人"]
      : ["GTM リード", "創業者", "コミュニティリード"];

  return actions.map((action, index) => ({
    day: index + 1,
    focus: index < 3 ? focus[0] : index < 8 ? focus[1] : focus[2],
    action,
    owner: owners[index % 3]
  }));
}

function localizePlan(input: CampaignInput, plan: CampaignPlan): CampaignPlan {
  const locale = input.outputLocale ?? "en";
  if (locale === "en") {
    return plan;
  }

  if (locale === "zh") {
    return {
      ...plan,
      name: `${input.name} GTM 发布计划`,
      positioning: `${input.name} 是一款面向 ${input.audiences.join(", ")} 的 ${categoryFrames[input.category]}，将在 ${input.targetMarkets.join(", ")} 市场启动，并以 ${input.tone} 叙事突出 ${stripTrailingPunctuation(input.moat)}。`,
      icp: `核心 ICP：${input.audiences.join(", ")}。最适合的首批用户是正在经历「${stripTrailingPunctuation(input.summary)}」这一痛点，并能帮助验证发布目标「${stripTrailingPunctuation(input.launchGoal)}」的团队。`,
      channelMix: localizeChannels(plan.channelMix, "zh"),
      contentAngles: [
        `证明 ${input.name} 为什么现在值得 ${input.audiences[0]} 关注`,
        `把核心护城河转成简单的前后对比工作流：${stripTrailingPunctuation(input.moat)}`,
        `用一个具体用户痛点说明 ${categoryFrames[input.category]} 为什么现在重要`,
        `邀请 ${input.targetMarkets.join(" + ")} 的 builder 参与透明发布过程`,
        `把「${stripTrailingPunctuation(input.launchGoal)}」转成公开里程碑叙事`
      ],
      launchCalendar: localizedCalendar(input, "zh"),
      successMetrics: [
        "合格 beta 注册数",
        "KOL 内容互动质量",
        "社区激活率",
        "demo 或 waitlist 转化",
        ...(input.audiences.includes("developers") ? ["开发者激活和留存使用"] : []),
        ...(input.audiences.includes("enterprise buyers") ? ["合格销售 pipeline"] : [])
      ],
      risks: [
        "如果 launch wedge 没有在所有素材中反复出现，叙事可能显得过宽。",
        "KOL 声量如果没有清晰转化路径，容易带来浅层流量。",
        ...(input.targetMarkets.length > 2 ? ["多市场执行需要严格本地化，避免信息过于泛化。"] : [])
      ]
    };
  }

  return {
    ...plan,
    name: `${input.name} GTM ローンチ計画`,
    positioning: `${input.name} は ${input.audiences.join(", ")} 向けの ${categoryFrames[input.category]} です。${input.targetMarkets.join(", ")} 市場でローンチし、${input.tone} なナラティブで ${stripTrailingPunctuation(input.moat)} を訴求します。`,
    icp: `主要 ICP：${input.audiences.join(", ")}。最初に狙うべきユーザーは「${stripTrailingPunctuation(input.summary)}」という課題を抱え、ローンチ目標「${stripTrailingPunctuation(input.launchGoal)}」の検証に貢献できるチームです。`,
    channelMix: localizeChannels(plan.channelMix, "ja"),
    contentAngles: [
      `${input.name} が今 ${input.audiences[0]} にとって重要である理由を証明する`,
      `コア moat を before/after のワークフローに変換する：${stripTrailingPunctuation(input.moat)}`,
      `一つの具体的なユーザー課題から ${categoryFrames[input.category]} の重要性を示す`,
      `${input.targetMarkets.join(" + ")} の builder を透明なローンチ過程に招待する`,
      `「${stripTrailingPunctuation(input.launchGoal)}」を公開マイルストーンの物語に変える`
    ],
    launchCalendar: localizedCalendar(input, "ja"),
    successMetrics: [
      "有望なベータ登録数",
      "KOL 投稿のエンゲージメント品質",
      "コミュニティ活性化率",
      "demo または waitlist の転換率",
      ...(input.audiences.includes("developers") ? ["開発者のアクティベーションと継続利用"] : []),
      ...(input.audiences.includes("enterprise buyers") ? ["有望な営業 pipeline"] : [])
    ],
    risks: [
      "ローンチ wedge が全アセットで一貫して繰り返されないと、ナラティブが広すぎる印象になります。",
      "KOL のリーチは明確な転換導線がなければ浅い流入になりやすいです。",
      ...(input.targetMarkets.length > 2 ? ["複数市場での実行には、一般的な訴求を避けるためのローカライズ discipline が必要です。"] : [])
    ]
  };
}

export function generateCampaignPlan(input: CampaignInput): CampaignPlan {
  const frame = categoryFrames[input.category];
  const primaryAudience = input.audiences.join(", ");
  const markets = input.targetMarkets.join(", ");
  const moat = stripTrailingPunctuation(input.moat);

  const plan = {
    name: `${input.name} GTM Launch Plan`,
    readinessScore: readinessScore(input),
    positioning: `${input.name} is ${indefiniteArticle(frame)} ${frame} helping ${primaryAudience} launch across ${markets} with a ${input.tone} narrative anchored on ${moat}.`,
    icp: `Primary ICP: ${primaryAudience}. Best-fit launch users are teams who feel the pain described in "${stripTrailingPunctuation(input.summary)}" and can help validate the launch goal: ${stripTrailingPunctuation(input.launchGoal)}.`,
    channelMix: selectChannels(input),
    kolPlan: selectKols(input),
    contentAngles: contentAngles(input),
    launchCalendar: launchCalendar(input),
    successMetrics: successMetrics(input),
    risks: riskFlags(input)
  };

  return localizePlan(input, plan);
}

export async function generateCampaignPlanWithOptionalAi(input: CampaignInput): Promise<CampaignPlan> {
  if (process.env.AI_GENERATION_MODE !== "openai" || !process.env.OPENAI_API_KEY) {
    return generateCampaignPlan(input);
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL ?? "gpt-4o-mini",
        response_format: { type: "json_object" },
        messages: [
          {
            role: "system",
            content:
              "You are a GTM strategist for AI products. Return JSON matching the provided campaign plan shape. Keep arrays concise and actionable."
          },
          {
            role: "user",
            content: JSON.stringify({
              input,
              requiredShape: {
                name: "string",
                readinessScore: "number 0-100",
                positioning: "string",
                icp: "string",
                channelMix: "array of {name, role, priority, rationale}",
                kolPlan: "array of {archetype, market, budget, brief}",
                contentAngles: "array of 5 strings",
                launchCalendar: "array of 14 {day, focus, action, owner}",
                successMetrics: "array of strings",
                risks: "array of strings"
              }
            })
          }
        ]
      })
    });
    clearTimeout(timeout);

    if (!response.ok) {
      return generateCampaignPlan(input);
    }

    const data = (await response.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const content = data.choices?.[0]?.message?.content;
    if (!content) {
      return generateCampaignPlan(input);
    }

    const parsed = JSON.parse(content) as CampaignPlan;
    if (!Array.isArray(parsed.channelMix) || !Array.isArray(parsed.launchCalendar)) {
      return generateCampaignPlan(input);
    }

    return {
      ...generateCampaignPlan(input),
      ...parsed,
      readinessScore: Math.max(0, Math.min(100, Math.round(parsed.readinessScore)))
    };
  } catch {
    return generateCampaignPlan(input);
  }
}
