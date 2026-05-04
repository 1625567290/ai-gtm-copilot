export const locales = ["en", "zh", "ja"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeLabels: Record<Locale, string> = {
  en: "EN",
  zh: "中文",
  ja: "日本語"
};

const optionLabels = {
  en: {
    categories: {
      "AI Infra": "AI Infra",
      "GenAI App": "GenAI App",
      "Data Platform": "Data Platform",
      Robotics: "Robotics",
      Fintech: "Fintech",
      "Developer Tool": "Developer Tool",
      Other: "Other"
    },
    stages: {
      "pre-launch": "pre-launch",
      "private beta": "private beta",
      "public beta": "public beta",
      "post-launch": "post-launch",
      fundraising: "fundraising",
      "ecosystem expansion": "ecosystem expansion"
    },
    markets: {
      US: "US",
      Korea: "Korea",
      Japan: "Japan",
      "Southeast Asia": "Southeast Asia",
      CIS: "CIS",
      Europe: "Europe",
      Global: "Global"
    },
    audiences: {
      developers: "developers",
      founders: "founders",
      "AI researchers": "AI researchers",
      "crypto-native users": "crypto-native users",
      "enterprise buyers": "enterprise buyers",
      consumers: "consumers",
      investors: "investors"
    },
    tones: {
      technical: "technical",
      "founder-led": "founder-led",
      bold: "bold",
      trusted: "trusted",
      "community-native": "community-native"
    },
    statuses: {
      draft: "draft",
      active: "active",
      paused: "paused",
      completed: "completed"
    },
    priorities: {
      low: "low",
      medium: "medium",
      high: "high"
    }
  },
  zh: {
    categories: {
      "AI Infra": "AI 基础设施",
      "GenAI App": "生成式 AI 应用",
      "Data Platform": "数据平台",
      Robotics: "机器人",
      Fintech: "金融科技",
      "Developer Tool": "开发者工具",
      Other: "其他"
    },
    stages: {
      "pre-launch": "发布前",
      "private beta": "私密测试",
      "public beta": "公开测试",
      "post-launch": "发布后",
      fundraising: "融资期",
      "ecosystem expansion": "生态扩张"
    },
    markets: {
      US: "美国",
      Korea: "韩国",
      Japan: "日本",
      "Southeast Asia": "东南亚",
      CIS: "独联体",
      Europe: "欧洲",
      Global: "全球"
    },
    audiences: {
      developers: "开发者",
      founders: "创始人",
      "AI researchers": "AI 研究者",
      "crypto-native users": "加密原生用户",
      "enterprise buyers": "企业买家",
      consumers: "消费者",
      investors: "投资人"
    },
    tones: {
      technical: "技术型",
      "founder-led": "创始人叙事",
      bold: "大胆进攻",
      trusted: "可信专业",
      "community-native": "社区原生"
    },
    statuses: {
      draft: "草稿",
      active: "进行中",
      paused: "暂停",
      completed: "已完成"
    },
    priorities: {
      low: "低",
      medium: "中",
      high: "高"
    }
  },
  ja: {
    categories: {
      "AI Infra": "AI インフラ",
      "GenAI App": "生成 AI アプリ",
      "Data Platform": "データプラットフォーム",
      Robotics: "ロボティクス",
      Fintech: "フィンテック",
      "Developer Tool": "開発者ツール",
      Other: "その他"
    },
    stages: {
      "pre-launch": "ローンチ前",
      "private beta": "非公開ベータ",
      "public beta": "公開ベータ",
      "post-launch": "ローンチ後",
      fundraising: "資金調達",
      "ecosystem expansion": "エコシステム拡大"
    },
    markets: {
      US: "米国",
      Korea: "韓国",
      Japan: "日本",
      "Southeast Asia": "東南アジア",
      CIS: "CIS",
      Europe: "欧州",
      Global: "グローバル"
    },
    audiences: {
      developers: "開発者",
      founders: "創業者",
      "AI researchers": "AI 研究者",
      "crypto-native users": "暗号資産ネイティブ層",
      "enterprise buyers": "エンタープライズ購買層",
      consumers: "消費者",
      investors: "投資家"
    },
    tones: {
      technical: "技術重視",
      "founder-led": "創業者主導",
      bold: "大胆",
      trusted: "信頼重視",
      "community-native": "コミュニティ主導"
    },
    statuses: {
      draft: "下書き",
      active: "進行中",
      paused: "一時停止",
      completed: "完了"
    },
    priorities: {
      low: "低",
      medium: "中",
      high: "高"
    }
  }
} as const;

export const dictionaries = {
  en: {
    app: {
      productName: "AI GTM Copilot",
      tagline: "Launch strategy workspace",
      navDashboard: "Dashboard",
      navNewProject: "New GTM Project",
      mobileDashboard: "Dashboard",
      jeFit: "JE Labs fit",
      jeFitDescription:
        "Productizes strategy, KOL planning, founder storytelling, and launch execution into one operator flow.",
      language: "Language"
    },
    common: {
      newProject: "New project",
      view: "View",
      saveChanges: "Save changes"
    },
    dashboard: {
      eyebrow: "AI product launch operations",
      title: "GTM Workspace",
      projects: "Projects",
      projectsDescription: "AI products captured in the GTM workspace.",
      campaigns: "Campaigns",
      activeLaunchPlans: (count: number) => `${count} active launch plans.`,
      avgReadiness: "Avg. Readiness",
      recentLaunchPlans: "Recent Launch Plans",
      recentDescription: "Generated campaigns with saved strategy, channel plan, KOL map, and export.",
      emptyTitle: "Create your first GTM launch plan",
      emptyDescription:
        "Capture an AI product brief and generate positioning, KOL strategy, content angles, and a 14-day launch calendar.",
      startIntake: "Start intake",
      tableCampaign: "Campaign",
      tableProduct: "Product",
      tableStatus: "Status",
      tableReadiness: "Readiness",
      tableOpen: "Open"
    },
    intake: {
      eyebrow: "Structured intake",
      title: "New GTM Project",
      cardTitle: "Product Intake",
      cardDescription: "Capture enough context for a GTM strategist to generate a credible launch plan.",
      productName: "Product name",
      website: "Website",
      category: "Category",
      stage: "Stage",
      budgetBand: "Budget band",
      targetMarkets: "Target markets",
      targetMarketsDescription: "Pick the first markets you would activate.",
      targetAudiences: "Target audiences",
      targetAudiencesDescription: "Pick the buyers, users, or amplifiers the launch must reach.",
      productSummary: "Product summary",
      summaryPlaceholder: "What does the product do, who uses it, and what pain does it solve?",
      moat: "Differentiation or moat",
      moatPlaceholder: "What is technically, strategically, or distributionally hard to copy?",
      launchGoal: "Launch goal",
      launchGoalPlaceholder: "Recruit 500 technical beta users in 30 days.",
      tone: "Tone",
      outputsTitle: "Generated outputs",
      outputsDescription: "The Copilot saves a campaign immediately after generation.",
      outputs: [
        "Positioning and ICP",
        "Channel mix and KOL archetypes",
        "Five content angles",
        "14-day launch calendar",
        "Metrics, risks, and markdown export"
      ],
      submit: "Generate GTM plan"
    },
    campaign: {
      eyebrow: "Campaign strategy",
      launchReadiness: "Launch readiness",
      positioning: "Positioning",
      icp: "ICP",
      channelMix: "Channel Mix",
      channelDescription: "Priority plays for launch distribution.",
      kolPlan: "KOL Plan",
      kolDescription: "Archetypes to brief by market and budget mode.",
      contentAngles: "Content Angles",
      contentDescription: "Storylines for founder posts, KOL briefs, media pitches, and community assets.",
      angle: "Angle",
      calendar: "14-Day Launch Calendar",
      calendarDescription: "Operator-ready sequence from narrative setup to conversion proof.",
      day: "Day",
      controls: "Campaign Controls",
      controlsDescription: "Update operating state and internal notes.",
      status: "Status",
      priority: "Priority",
      notes: "Internal notes",
      notesPlaceholder: "Add operator notes...",
      exportBrief: "Export Brief",
      exportDescription: "Download a markdown launch brief for sharing or deck prep.",
      exportMarkdown: "Export markdown",
      metrics: "Metrics",
      metricsDescription: "Recommended success signals.",
      risks: "Risks"
    },
    options: optionLabels.en
  },
  zh: {
    app: {
      productName: "AI GTM Copilot",
      tagline: "发布策略工作台",
      navDashboard: "仪表盘",
      navNewProject: "新建 GTM 项目",
      mobileDashboard: "仪表盘",
      jeFit: "适配 JE Labs",
      jeFitDescription: "把策略、KOL 规划、创始人叙事和发布执行产品化为一条运营工作流。",
      language: "语言"
    },
    common: {
      newProject: "新建项目",
      view: "查看",
      saveChanges: "保存修改"
    },
    dashboard: {
      eyebrow: "AI 产品发布运营",
      title: "GTM 工作台",
      projects: "项目",
      projectsDescription: "已纳入 GTM 工作台的 AI 产品。",
      campaigns: "活动",
      activeLaunchPlans: (count: number) => `${count} 个进行中的发布计划。`,
      avgReadiness: "平均准备度",
      recentLaunchPlans: "最近发布计划",
      recentDescription: "已保存策略、渠道规划、KOL 地图和导出内容的活动。",
      emptyTitle: "创建第一个 GTM 发布计划",
      emptyDescription: "输入 AI 产品 brief，生成定位、KOL 策略、内容角度和 14 天发布日历。",
      startIntake: "开始填写",
      tableCampaign: "活动",
      tableProduct: "产品",
      tableStatus: "状态",
      tableReadiness: "准备度",
      tableOpen: "打开"
    },
    intake: {
      eyebrow: "结构化输入",
      title: "新建 GTM 项目",
      cardTitle: "产品信息",
      cardDescription: "收集足够上下文，让 GTM 策略师能生成可信的发布计划。",
      productName: "产品名称",
      website: "官网",
      category: "类别",
      stage: "阶段",
      budgetBand: "预算区间",
      targetMarkets: "目标市场",
      targetMarketsDescription: "选择第一批要启动的市场。",
      targetAudiences: "目标受众",
      targetAudiencesDescription: "选择本次发布必须触达的买家、用户或传播者。",
      productSummary: "产品简介",
      summaryPlaceholder: "产品做什么、谁会使用、解决什么痛点？",
      moat: "差异化或护城河",
      moatPlaceholder: "哪些技术、策略或分发能力较难复制？",
      launchGoal: "发布目标",
      launchGoalPlaceholder: "30 天内招募 500 名技术 beta 用户。",
      tone: "叙事语气",
      outputsTitle: "生成内容",
      outputsDescription: "Copilot 会在生成后立即保存一个活动。",
      outputs: ["定位和 ICP", "渠道组合和 KOL 类型", "五个内容角度", "14 天发布日历", "指标、风险和 Markdown 导出"],
      submit: "生成 GTM 计划"
    },
    campaign: {
      eyebrow: "活动策略",
      launchReadiness: "发布准备度",
      positioning: "定位",
      icp: "ICP",
      channelMix: "渠道组合",
      channelDescription: "发布分发的优先打法。",
      kolPlan: "KOL 计划",
      kolDescription: "按市场和预算模式推荐要 brief 的 KOL 类型。",
      contentAngles: "内容角度",
      contentDescription: "用于创始人帖、KOL brief、媒体 pitch 和社区素材的叙事线。",
      angle: "角度",
      calendar: "14 天发布日历",
      calendarDescription: "从叙事铺垫到转化证明的运营节奏。",
      day: "第",
      controls: "活动控制",
      controlsDescription: "更新运营状态和内部备注。",
      status: "状态",
      priority: "优先级",
      notes: "内部备注",
      notesPlaceholder: "添加运营备注...",
      exportBrief: "导出 Brief",
      exportDescription: "下载 Markdown 发布 brief，用于分享或制作 deck。",
      exportMarkdown: "导出 Markdown",
      metrics: "指标",
      metricsDescription: "建议关注的成功信号。",
      risks: "风险"
    },
    options: optionLabels.zh
  },
  ja: {
    app: {
      productName: "AI GTM Copilot",
      tagline: "ローンチ戦略ワークスペース",
      navDashboard: "ダッシュボード",
      navNewProject: "新規 GTM プロジェクト",
      mobileDashboard: "ダッシュボード",
      jeFit: "JE Labs との適合性",
      jeFitDescription:
        "戦略、KOL 設計、創業者ストーリー、ローンチ実行を一つの運用フローとしてプロダクト化します。",
      language: "言語"
    },
    common: {
      newProject: "新規プロジェクト",
      view: "表示",
      saveChanges: "変更を保存"
    },
    dashboard: {
      eyebrow: "AI プロダクトのローンチ運用",
      title: "GTM ワークスペース",
      projects: "プロジェクト",
      projectsDescription: "GTM ワークスペースに登録された AI プロダクト。",
      campaigns: "キャンペーン",
      activeLaunchPlans: (count: number) => `${count} 件の進行中ローンチ計画。`,
      avgReadiness: "平均準備度",
      recentLaunchPlans: "最近のローンチ計画",
      recentDescription: "戦略、チャネル計画、KOL マップ、エクスポートを保存したキャンペーン。",
      emptyTitle: "最初の GTM ローンチ計画を作成",
      emptyDescription: "AI プロダクト brief から、ポジショニング、KOL 戦略、コンテンツ角度、14 日間カレンダーを生成します。",
      startIntake: "入力を開始",
      tableCampaign: "キャンペーン",
      tableProduct: "プロダクト",
      tableStatus: "ステータス",
      tableReadiness: "準備度",
      tableOpen: "開く"
    },
    intake: {
      eyebrow: "構造化インテーク",
      title: "新規 GTM プロジェクト",
      cardTitle: "プロダクト入力",
      cardDescription: "GTM ストラテジストが信頼できるローンチ計画を生成するための文脈を入力します。",
      productName: "プロダクト名",
      website: "Web サイト",
      category: "カテゴリ",
      stage: "ステージ",
      budgetBand: "予算帯",
      targetMarkets: "対象市場",
      targetMarketsDescription: "最初に展開する市場を選択します。",
      targetAudiences: "対象オーディエンス",
      targetAudiencesDescription: "今回のローンチで到達すべき買い手、ユーザー、拡散者を選択します。",
      productSummary: "プロダクト概要",
      summaryPlaceholder: "何をするプロダクトで、誰が使い、どんな痛みを解決しますか？",
      moat: "差別化または堀",
      moatPlaceholder: "技術、戦略、流通面でコピーしにくい強みは何ですか？",
      launchGoal: "ローンチ目標",
      launchGoalPlaceholder: "30 日で技術ベータユーザーを 500 名獲得する。",
      tone: "トーン",
      outputsTitle: "生成される内容",
      outputsDescription: "Copilot は生成後すぐにキャンペーンを保存します。",
      outputs: ["ポジショニングと ICP", "チャネル構成と KOL タイプ", "5 つのコンテンツ角度", "14 日間ローンチカレンダー", "指標、リスク、Markdown エクスポート"],
      submit: "GTM 計画を生成"
    },
    campaign: {
      eyebrow: "キャンペーン戦略",
      launchReadiness: "ローンチ準備度",
      positioning: "ポジショニング",
      icp: "ICP",
      channelMix: "チャネル構成",
      channelDescription: "ローンチ配信で優先すべき施策。",
      kolPlan: "KOL 計画",
      kolDescription: "市場と予算モード別に brief すべき KOL タイプ。",
      contentAngles: "コンテンツ角度",
      contentDescription: "創業者投稿、KOL brief、メディア pitch、コミュニティ素材に使うストーリーライン。",
      angle: "角度",
      calendar: "14 日間ローンチカレンダー",
      calendarDescription: "ナラティブ設計からコンバージョン証明までの運用シーケンス。",
      day: "Day",
      controls: "キャンペーン操作",
      controlsDescription: "運用ステータスと内部メモを更新します。",
      status: "ステータス",
      priority: "優先度",
      notes: "内部メモ",
      notesPlaceholder: "運用メモを追加...",
      exportBrief: "Brief をエクスポート",
      exportDescription: "共有や deck 作成用に Markdown のローンチ brief をダウンロードします。",
      exportMarkdown: "Markdown をエクスポート",
      metrics: "指標",
      metricsDescription: "推奨される成功シグナル。",
      risks: "リスク"
    },
    options: optionLabels.ja
  }
} as const;

export type Dictionary = (typeof dictionaries)[Locale];

export function getLocale(value: string | string[] | null | undefined): Locale {
  const candidate = Array.isArray(value) ? value[0] : value;
  return locales.includes(candidate as Locale) ? (candidate as Locale) : defaultLocale;
}

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export function withLocale(path: string, locale: Locale) {
  const [pathname, query = ""] = path.split("?");
  const params = new URLSearchParams(query);
  params.set("lang", locale);
  const serialized = params.toString();
  return serialized ? `${pathname}?${serialized}` : pathname;
}
