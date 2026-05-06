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
    },
    outputLocales: {
      en: "English",
      zh: "Chinese",
      ja: "Japanese"
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
    },
    outputLocales: {
      en: "英文",
      zh: "中文",
      ja: "日文"
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
    },
    outputLocales: {
      en: "英語",
      zh: "中国語",
      ja: "日本語"
    }
  }
} as const;

export const dictionaries = {
  en: {
    app: {
      productName: "AI Product Signal Radar",
      tagline: "Social listening for AI GTM",
      navDashboard: "Signal Radar",
      navNewProject: "New Analysis",
      navKolStudio: "KOL Action Plan",
      navPricer: "KOL Pricer",
      navStory: "Story Studio",
      navRadar: "Signal Radar",
      navCalendar: "Campaign Calendar",
      navDemoGuide: "Demo Guide",
      mobileDashboard: "Radar",
      jeFit: "JE Labs fit",
      jeFitDescription:
        "Turns AI product social signals into KOL actions, pricing guidance, and launch decisions.",
      language: "Language"
    },
    common: {
      newProject: "New analysis",
      view: "View",
      saveChanges: "Save changes"
    },
    dashboard: {
      eyebrow: "AI product social listening",
      title: "AI Product Signal Radar",
      projects: "Tracked products",
      projectsDescription: "AI products analyzed for market and community signals.",
      campaigns: "Signal reports",
      activeLaunchPlans: (count: number) => `${count} active signal reports.`,
      avgReadiness: "Opportunity Score",
      recentLaunchPlans: "Saved Signal Reports",
      recentDescription: "Campaigns with saved signal context, KOL map, pricing, and export.",
      workbenchesTitle: "Focused Workflow",
      workbenchesDescription: "One path from market signal to KOL action and pricing.",
      workbenchDescriptions: {
        kol: "Turn signal context into market-fit scores and KOL activation briefs.",
        pricer: "Estimate KOL pricing, deliverables, exposure, and CPM.",
        story: "Future expansion for founder stories, media pitch, and community copy.",
        radar: "Read market signals, topics, voices, and action priorities.",
        calendar: "Future expansion for turning actions into a launch task board."
      },
      emptyTitle: "Create your first signal analysis",
      emptyDescription:
        "Capture an AI product brief and generate market signals, KOL actions, pricing ranges, and a launch-ready report.",
      startIntake: "Start analysis",
      signalDeskTitle: "Analyze AI product market signals",
      signalDeskDescription:
        "Start from a product brief or saved campaign, then inspect topics, key voices, action queue, and downstream KOL pricing.",
      openRadar: "Open Signal Radar",
      workflowSteps: ["Product context", "Market signals", "KOL action", "Pricing range"],
      tableCampaign: "Campaign",
      tableProduct: "Product",
      tableStatus: "Status",
      tableReadiness: "Readiness",
      tableOpen: "Open"
    },
    intake: {
      eyebrow: "Signal intake",
      title: "New Signal Analysis",
      cardTitle: "Product Context",
      cardDescription: "Capture enough context to generate credible market signals, KOL actions, and pricing guidance.",
      formError: "Please check the website URL, required product fields, target markets, and target audiences, then submit again.",
      productName: "Product name",
      website: "Website",
      category: "Category",
      stage: "Stage",
      budgetBand: "Budget band",
      outputLanguage: "Brief language",
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
      outputsDescription: "The radar saves a signal report immediately after generation.",
      outputs: [
        "Signal summary and opportunity score",
        "Hot topics and key voices",
        "KOL action plan",
        "KOL pricing ranges",
        "Shareable markdown export"
      ],
      submit: "Generate signal report"
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
      growthWorkbenches: "Signal Workflow",
      growthWorkbenchesDescription: "Continue this report through Signal Radar, KOL Action Plan, and KOL Pricer.",
      metrics: "Metrics",
      metricsDescription: "Recommended success signals.",
      risks: "Risks"
    },
    kol: {
      eyebrow: "Downstream from Signal Radar",
      title: "KOL Action Plan",
      campaignsTitle: "Campaigns",
      campaignsDescription: "Pick a saved signal report to score KOL-market fit.",
      summaryTitle: "Activation Summary",
      avgFit: "Avg. Fit",
      bestMarket: "Best Market",
      coreMarkets: "Core Markets",
      activationBrief: "Activation Brief",
      marketFitMap: "Market Fit Map",
      marketFitDescription: "Deterministic scores based on market, audience, stage, category, and recommended KOL archetypes.",
      recommendedArchetype: "Recommended archetype",
      budgetMode: "Budget mode",
      assetAngle: "Asset angle",
      rationale: "Rationale",
      nextAction: "Next action",
      copyReadyBrief: "Copy-ready brief",
      emptyTitle: "Create a campaign first",
      emptyDescription: "KOL actions are generated from saved signal reports.",
      createProject: "Create analysis",
      tierLabels: {
        Core: "Core",
        Expansion: "Expansion",
        Probe: "Probe"
      }
    },
    pricer: {
      eyebrow: "KOL budget intelligence",
      title: "KOL Pricer",
      campaignsTitle: "Campaigns",
      campaignsDescription: "Select a saved signal report to price market-specific KOL packages.",
      summaryTitle: "Pricing Summary",
      recommendedMarket: "Recommended market",
      totalBudget: "Total budget",
      targetExposure: "Target exposure",
      blendedCpm: "Blended CPM",
      packagesTitle: "Recommended Packages",
      packagesDescription: "Budget ranges are estimated from market cost, audience depth, and launch priority.",
      priceRange: "Price range",
      exposure: "Exposure",
      cpm: "CPM",
      deliverables: "Deliverables",
      rationale: "Rationale",
      emptyTitle: "Create a campaign first",
      emptyDescription: "KOL pricing is calculated from saved signal reports and launch context.",
      createProject: "Create analysis",
      priorityLabels: {
        core: "Core",
        supporting: "Supporting",
        test: "Test"
      }
    },
    story: {
      eyebrow: "Founder-led narrative",
      title: "Founder Storytelling Studio",
      campaignsTitle: "Campaigns",
      campaignsDescription: "Select a campaign and turn GTM strategy into launch-ready story assets.",
      founderStory: "Founder Story",
      mediaPitch: "Media Pitch",
      xThread: "X Thread",
      communityAnnouncement: "Community Announcement",
      subject: "Subject",
      emptyTitle: "Create a campaign first",
      emptyDescription: "Story assets are generated from saved GTM launch plans.",
      createProject: "Create project"
    },
    radar: {
      eyebrow: "Market signal desk",
      title: "Signal Radar",
      campaignsTitle: "Campaigns",
      campaignsDescription: "Select a saved analysis to inspect social signals and recommended GTM moves.",
      summaryTitle: "Signal Summary",
      topMarket: "Top market",
      strongestSignal: "Strongest signal",
      recommendedAngle: "Recommended angle",
      signalsTitle: "Signals",
      signalsDescription: "Deterministic market intelligence shaped by audience, market, category, and launch stage.",
      signalStrength: "Signal strength",
      recommendedMove: "Recommended move",
      totalSignals: "Total signals",
      highUrgency: "High urgency",
      opportunityScore: "Opportunity score",
      topicsTitle: "Hot Topics",
      topicsDescription: "Ranked narratives to act on first.",
      topicUrgency: "Urgency",
      topicRationale: "Why it matters",
      recommendedAction: "Recommended action",
      keyVoicesTitle: "Key Voices",
      keyVoicesDescription: "KOL and community archetypes most likely to move the launch.",
      whyItMatters: "Why it matters",
      activationMove: "Activation move",
      actionQueueTitle: "Action Queue",
      actionQueueDescription: "Concrete GTM moves derived from the signal map.",
      channel: "Channel",
      owner: "Owner",
      evidence: "Evidence",
      strategyReport: "Strategy Report",
      openKolAction: "Open KOL Action Plan",
      openPricer: "Open KOL Pricer",
      urgencyLabels: {
        high: "High",
        medium: "Medium",
        low: "Low"
      },
      sentimentLabels: {
        positive: "Positive",
        mixed: "Mixed",
        watch: "Watch"
      },
      emptyTitle: "Create an analysis first",
      emptyDescription: "Signal Radar is generated from saved AI product context.",
      createProject: "Create analysis"
    },
    calendarWorkbench: {
      eyebrow: "Launch operations",
      title: "Campaign Calendar",
      campaignsTitle: "Campaigns",
      campaignsDescription: "Select a campaign and turn the launch plan into operator-ready tasks.",
      summaryTitle: "Execution Summary",
      totalTasks: "Tasks",
      highPriority: "High priority",
      nextMilestone: "Next milestone",
      milestones: "Milestones",
      tasksTitle: "Task Board",
      tasksDescription: "A 14-day sequence for founder, GTM, community, and KOL execution.",
      day: "Day",
      phase: "Phase",
      task: "Task",
      owner: "Owner",
      channel: "Channel",
      deliverable: "Deliverable",
      status: "Status",
      priority: "Priority",
      emptyTitle: "Create a campaign first",
      emptyDescription: "The task calendar is generated from saved GTM launch plans.",
      createProject: "Create project",
      priorityLabels: {
        high: "High",
        medium: "Medium",
        low: "Low"
      }
    },
    demo: {
      eyebrow: "Interview presentation",
      title: "Demo Guide",
      openingTitle: "Two-minute opening",
      opening:
        "AI Product Signal Radar turns AI product social signals into GTM decisions: it identifies narratives, key voices, urgency, KOL actions, pricing ranges, and a shareable launch report.",
      routeTitle: "Recommended walkthrough",
      route: [
        "Open Signal Radar and frame the product as social listening for AI GTM.",
        "Select VectorForge to show topics, urgency, sentiment, and key voices.",
        "Use the action queue to explain how signals become concrete GTM moves.",
        "Open KOL Action Plan to show market fit, KOL archetypes, and copy-ready activation briefs.",
        "Open KOL Pricer to turn the action plan into budget, deliverables, exposure, and CPM.",
        "Create a new analysis and switch English, Chinese, and Japanese to show global GTM readiness."
      ],
      signalsTitle: "Signals for JE Labs",
      signals: [
        "Product focus: narrows agency GTM work into a clear social signal to KOL action workflow.",
        "Engineering: full-stack Next.js, Prisma, Server Actions, tests, and seed data.",
        "Growth fluency: connects market narratives, sentiment, key voices, KOL briefs, pricing, and risks.",
        "KOL execution: turns signal context into prioritized KOL activation briefs.",
        "Marketing engineering: prices KOL packages and translates market signals into operator actions.",
        "Global readiness: UI and generated briefs support English, Chinese, and Japanese."
      ],
      closeTitle: "Closing line",
      close:
        "This MVP shows how a Marketing Engineer can convert social listening and KOL GTM playbooks into software: faster signal interpretation, clearer actions, and reusable launch intelligence.",
      openDashboard: "Open Signal Radar",
      createProject: "Create analysis"
    },
    options: optionLabels.en
  },
  zh: {
    app: {
      productName: "AI 产品信号雷达",
      tagline: "面向 AI GTM 的社交聆听",
      navDashboard: "信号雷达",
      navNewProject: "新建分析",
      navKolStudio: "KOL 行动计划",
      navPricer: "KOL 定价器",
      navStory: "叙事工作台",
      navRadar: "信号雷达",
      navCalendar: "活动日历",
      navDemoGuide: "展示指南",
      mobileDashboard: "雷达",
      jeFit: "适配 JE Labs",
      jeFitDescription: "把 AI 产品社交信号转成 KOL 动作、定价建议和发布决策。",
      language: "语言"
    },
    common: {
      newProject: "新建分析",
      view: "查看",
      saveChanges: "保存修改"
    },
    dashboard: {
      eyebrow: "AI 产品社交聆听",
      title: "AI 产品信号雷达",
      projects: "追踪产品",
      projectsDescription: "已分析市场和社区信号的 AI 产品。",
      campaigns: "信号报告",
      activeLaunchPlans: (count: number) => `${count} 个进行中的信号报告。`,
      avgReadiness: "机会评分",
      recentLaunchPlans: "已保存信号报告",
      recentDescription: "已保存信号上下文、KOL 地图、定价和导出内容的活动。",
      workbenchesTitle: "聚焦工作流",
      workbenchesDescription: "从市场信号到 KOL 行动和报价的一条完整路径。",
      workbenchDescriptions: {
        kol: "把信号上下文转成市场匹配评分和 KOL activation brief。",
        pricer: "估算 KOL 报价、交付物、曝光和 CPM。",
        story: "未来扩展：创始人故事、媒体 pitch 和社区文案。",
        radar: "读取市场信号、热点话题、关键声音和行动优先级。",
        calendar: "未来扩展：把行动转成发布任务看板。"
      },
      emptyTitle: "创建第一个信号分析",
      emptyDescription: "输入 AI 产品 brief，生成市场信号、KOL 动作、报价区间和可展示报告。",
      startIntake: "开始分析",
      signalDeskTitle: "分析 AI 产品市场信号",
      signalDeskDescription: "从产品 brief 或已保存 campaign 出发，查看话题、关键声音、行动队列和后续 KOL 定价。",
      openRadar: "打开信号雷达",
      workflowSteps: ["产品上下文", "市场信号", "KOL 行动", "报价区间"],
      tableCampaign: "活动",
      tableProduct: "产品",
      tableStatus: "状态",
      tableReadiness: "准备度",
      tableOpen: "打开"
    },
    intake: {
      eyebrow: "信号输入",
      title: "新建信号分析",
      cardTitle: "产品上下文",
      cardDescription: "收集足够上下文，用来生成可信的市场信号、KOL 动作和报价建议。",
      formError: "请检查网址格式、必填产品信息、目标市场和目标受众，然后重新提交。",
      productName: "产品名称",
      website: "官网",
      category: "类别",
      stage: "阶段",
      budgetBand: "预算区间",
      outputLanguage: "Brief 语言",
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
      outputsDescription: "信号雷达会在生成后立即保存一份报告。",
      outputs: ["信号摘要和机会评分", "热点话题和关键声音", "KOL 行动计划", "KOL 报价区间", "可分享的 Markdown 导出"],
      submit: "生成信号报告"
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
      growthWorkbenches: "信号工作流",
      growthWorkbenchesDescription: "继续把这份报告推进到信号雷达、KOL 行动计划和 KOL 定价器。",
      metrics: "指标",
      metricsDescription: "建议关注的成功信号。",
      risks: "风险"
    },
    kol: {
      eyebrow: "信号雷达的下游行动",
      title: "KOL 行动计划",
      campaignsTitle: "活动",
      campaignsDescription: "选择一个已保存的信号报告，评估 KOL-market fit。",
      summaryTitle: "启动摘要",
      avgFit: "平均匹配度",
      bestMarket: "最佳市场",
      coreMarkets: "核心市场",
      activationBrief: "启动 Brief",
      marketFitMap: "市场匹配地图",
      marketFitDescription: "基于市场、受众、阶段、类别和推荐 KOL 类型生成确定性评分。",
      recommendedArchetype: "推荐 KOL 类型",
      budgetMode: "预算模式",
      assetAngle: "内容角度",
      rationale: "判断依据",
      nextAction: "下一步动作",
      copyReadyBrief: "可直接使用的 brief",
      emptyTitle: "先创建一个 campaign",
      emptyDescription: "KOL 行动会基于已保存的信号报告生成。",
      createProject: "新建分析",
      tierLabels: {
        Core: "核心",
        Expansion: "扩张",
        Probe: "验证"
      }
    },
    pricer: {
      eyebrow: "KOL 预算智能",
      title: "KOL 定价器",
      campaignsTitle: "活动",
      campaignsDescription: "选择一个已保存的信号报告，估算不同市场的 KOL 合作包。",
      summaryTitle: "定价摘要",
      recommendedMarket: "推荐市场",
      totalBudget: "总预算",
      targetExposure: "目标曝光",
      blendedCpm: "综合 CPM",
      packagesTitle: "推荐合作包",
      packagesDescription: "预算区间基于市场成本、受众深度和发布优先级估算。",
      priceRange: "报价区间",
      exposure: "曝光",
      cpm: "CPM",
      deliverables: "交付物",
      rationale: "判断依据",
      emptyTitle: "先创建一个 campaign",
      emptyDescription: "KOL 定价会基于已保存的信号报告和发布上下文生成。",
      createProject: "新建分析",
      priorityLabels: {
        core: "核心",
        supporting: "支撑",
        test: "验证"
      }
    },
    story: {
      eyebrow: "创始人叙事",
      title: "叙事工作台",
      campaignsTitle: "活动",
      campaignsDescription: "选择一个 campaign，把 GTM 策略转成可发布的故事资产。",
      founderStory: "创始人故事",
      mediaPitch: "媒体 Pitch",
      xThread: "X Thread",
      communityAnnouncement: "社区公告",
      subject: "标题",
      emptyTitle: "先创建一个 campaign",
      emptyDescription: "叙事资产会基于已保存的 GTM 发布计划生成。",
      createProject: "新建项目"
    },
    radar: {
      eyebrow: "市场信号台",
      title: "信号雷达",
      campaignsTitle: "活动",
      campaignsDescription: "选择一个已保存的分析，查看市场信号和推荐 GTM 动作。",
      summaryTitle: "信号摘要",
      topMarket: "最强市场",
      strongestSignal: "最强信号",
      recommendedAngle: "推荐切入角度",
      signalsTitle: "市场信号",
      signalsDescription: "基于受众、市场、类别和发布阶段生成的确定性市场 intelligence。",
      signalStrength: "信号强度",
      recommendedMove: "推荐动作",
      totalSignals: "信号总量",
      highUrgency: "高紧急度",
      opportunityScore: "机会评分",
      topicsTitle: "热点话题",
      topicsDescription: "优先行动的叙事排序。",
      topicUrgency: "紧急度",
      topicRationale: "为什么重要",
      recommendedAction: "推荐动作",
      keyVoicesTitle: "关键声音",
      keyVoicesDescription: "最可能推动发布的 KOL 和社区角色。",
      whyItMatters: "为什么重要",
      activationMove: "启动动作",
      actionQueueTitle: "行动队列",
      actionQueueDescription: "从信号地图推导出的具体 GTM 动作。",
      channel: "渠道",
      owner: "负责人",
      evidence: "证据",
      strategyReport: "策略报告",
      openKolAction: "打开 KOL 行动计划",
      openPricer: "打开 KOL 定价器",
      urgencyLabels: {
        high: "高",
        medium: "中",
        low: "低"
      },
      sentimentLabels: {
        positive: "正向",
        mixed: "混合",
        watch: "观察"
      },
      emptyTitle: "先创建一个分析",
      emptyDescription: "信号雷达会基于已保存的 AI 产品上下文生成。",
      createProject: "新建分析"
    },
    calendarWorkbench: {
      eyebrow: "发布运营",
      title: "活动日历",
      campaignsTitle: "活动",
      campaignsDescription: "选择一个 campaign，把发布计划转成可执行任务。",
      summaryTitle: "执行摘要",
      totalTasks: "任务数",
      highPriority: "高优先级",
      nextMilestone: "下一里程碑",
      milestones: "里程碑",
      tasksTitle: "任务看板",
      tasksDescription: "覆盖创始人、GTM、社区和 KOL 执行的 14 天节奏。",
      day: "天",
      phase: "阶段",
      task: "任务",
      owner: "负责人",
      channel: "渠道",
      deliverable: "交付物",
      status: "状态",
      priority: "优先级",
      emptyTitle: "先创建一个 campaign",
      emptyDescription: "活动日历会基于已保存的 GTM 发布计划生成。",
      createProject: "新建项目",
      priorityLabels: {
        high: "高",
        medium: "中",
        low: "低"
      }
    },
    demo: {
      eyebrow: "面试展示",
      title: "展示指南",
      openingTitle: "两分钟开场",
      opening:
        "AI 产品信号雷达把 AI 产品的社交信号转成 GTM 决策：识别叙事、关键声音、紧急度、KOL 行动、报价区间，并生成可分享的发布报告。",
      routeTitle: "推荐讲解路线",
      route: [
        "打开信号雷达，把产品定位为面向 AI GTM 的社交聆听工具。",
        "选择 VectorForge，展示话题、紧急度、情绪和关键声音。",
        "用行动队列说明信号如何变成具体 GTM 动作。",
        "打开 KOL 行动计划，展示市场匹配、KOL 类型和可直接使用的 activation brief。",
        "打开 KOL 定价器，把行动计划转成预算、交付物、曝光和 CPM。",
        "新建分析，并切换英文、中文、日文，展示全球 GTM 准备度。"
      ],
      signalsTitle: "JE Labs 相关信号",
      signals: [
        "产品聚焦：把 agency 的 GTM 工作收束成清晰的「社交信号 -> KOL 行动」流程。",
        "工程能力：Next.js 全栈、Prisma、Server Actions、测试和 seed 数据。",
        "增长理解：连接市场叙事、情绪、关键声音、KOL brief、报价和风险。",
        "KOL 执行：把信号上下文转成优先级明确的 KOL activation brief。",
        "Marketing Engineering：把 KOL 定价和市场信号转成运营动作。",
        "全球化准备：UI 和生成 brief 支持英文、中文、日文。"
      ],
      closeTitle: "收尾表达",
      close:
        "这个 MVP 展示了 Marketing Engineer 如何把 social listening 和 KOL GTM playbook 软件化：更快解读市场信号，更清晰地生成行动，并沉淀可复用的发布 intelligence。",
      openDashboard: "打开信号雷达",
      createProject: "新建分析"
    },
    options: optionLabels.zh
  },
  ja: {
    app: {
      productName: "AI Product Signal Radar",
      tagline: "AI GTM のためのソーシャルリスニング",
      navDashboard: "Signal Radar",
      navNewProject: "新規分析",
      navKolStudio: "KOL Action Plan",
      navPricer: "KOL プライサー",
      navStory: "ストーリースタジオ",
      navRadar: "Signal Radar",
      navCalendar: "キャンペーンカレンダー",
      navDemoGuide: "デモガイド",
      mobileDashboard: "Radar",
      jeFit: "JE Labs との適合性",
      jeFitDescription:
        "AI プロダクトのソーシャルシグナルを KOL アクション、価格ガイド、ローンチ判断へ変換します。",
      language: "言語"
    },
    common: {
      newProject: "新規分析",
      view: "表示",
      saveChanges: "変更を保存"
    },
    dashboard: {
      eyebrow: "AI プロダクトのソーシャルリスニング",
      title: "AI Product Signal Radar",
      projects: "追跡プロダクト",
      projectsDescription: "市場とコミュニティシグナルを分析した AI プロダクト。",
      campaigns: "シグナルレポート",
      activeLaunchPlans: (count: number) => `${count} 件のアクティブなシグナルレポート。`,
      avgReadiness: "機会スコア",
      recentLaunchPlans: "保存済みシグナルレポート",
      recentDescription: "シグナル文脈、KOL マップ、価格、エクスポートを保存したキャンペーン。",
      workbenchesTitle: "Focused Workflow",
      workbenchesDescription: "市場シグナルから KOL アクションと価格へ進む一つの流れ。",
      workbenchDescriptions: {
        kol: "シグナル文脈を市場フィットスコアと KOL activation brief に変換。",
        pricer: "KOL 価格、納品物、露出、CPM を推定。",
        story: "将来拡張：創業者ストーリー、media pitch、コミュニティ文面。",
        radar: "市場シグナル、トピック、キーボイス、アクション優先度を読む。",
        calendar: "将来拡張：アクションをローンチタスクボードへ変換。"
      },
      emptyTitle: "最初のシグナル分析を作成",
      emptyDescription: "AI プロダクト brief から、市場シグナル、KOL アクション、価格レンジ、共有可能なレポートを生成します。",
      startIntake: "分析を開始",
      signalDeskTitle: "AI プロダクトの市場シグナルを分析",
      signalDeskDescription:
        "プロダクト brief または保存済み campaign から、トピック、キーボイス、アクションキュー、KOL pricing まで確認します。",
      openRadar: "Signal Radar を開く",
      workflowSteps: ["プロダクト文脈", "市場シグナル", "KOL アクション", "価格レンジ"],
      tableCampaign: "キャンペーン",
      tableProduct: "プロダクト",
      tableStatus: "ステータス",
      tableReadiness: "準備度",
      tableOpen: "開く"
    },
    intake: {
      eyebrow: "シグナル入力",
      title: "新規シグナル分析",
      cardTitle: "プロダクト文脈",
      cardDescription: "信頼できる市場シグナル、KOL アクション、価格ガイドを生成するための文脈を入力します。",
      formError: "URL 形式、必須プロダクト情報、対象市場、対象オーディエンスを確認してから再送信してください。",
      productName: "プロダクト名",
      website: "Web サイト",
      category: "カテゴリ",
      stage: "ステージ",
      budgetBand: "予算帯",
      outputLanguage: "Brief 言語",
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
      outputsDescription: "Radar は生成後すぐにシグナルレポートを保存します。",
      outputs: ["シグナルサマリーと機会スコア", "Hot topics と key voices", "KOL action plan", "KOL pricing ranges", "共有可能な Markdown export"],
      submit: "シグナルレポートを生成"
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
      growthWorkbenches: "Signal Workflow",
      growthWorkbenchesDescription: "このレポートを Signal Radar、KOL Action Plan、KOL Pricer へ進めます。",
      metrics: "指標",
      metricsDescription: "推奨される成功シグナル。",
      risks: "リスク"
    },
    kol: {
      eyebrow: "Signal Radar からの下流アクション",
      title: "KOL Action Plan",
      campaignsTitle: "キャンペーン",
      campaignsDescription: "保存済みシグナルレポートを選び、KOL-market fit を評価します。",
      summaryTitle: "アクティベーション概要",
      avgFit: "平均フィット",
      bestMarket: "最適市場",
      coreMarkets: "Core 市場",
      activationBrief: "アクティベーション Brief",
      marketFitMap: "市場フィットマップ",
      marketFitDescription: "市場、オーディエンス、ステージ、カテゴリ、推奨 KOL タイプから決定的にスコアリングします。",
      recommendedArchetype: "推奨 KOL タイプ",
      budgetMode: "予算モード",
      assetAngle: "アセット角度",
      rationale: "根拠",
      nextAction: "次のアクション",
      copyReadyBrief: "そのまま使える brief",
      emptyTitle: "まず campaign を作成",
      emptyDescription: "KOL actions は保存済みシグナルレポートから生成されます。",
      createProject: "分析を作成",
      tierLabels: {
        Core: "Core",
        Expansion: "Expansion",
        Probe: "Probe"
      }
    },
    pricer: {
      eyebrow: "KOL 予算 intelligence",
      title: "KOL プライサー",
      campaignsTitle: "キャンペーン",
      campaignsDescription: "保存済みシグナルレポートを選び、市場別 KOL パッケージを見積もります。",
      summaryTitle: "価格サマリー",
      recommendedMarket: "推奨市場",
      totalBudget: "総予算",
      targetExposure: "目標露出",
      blendedCpm: "総合 CPM",
      packagesTitle: "推奨パッケージ",
      packagesDescription: "予算レンジは市場コスト、オーディエンス深度、ローンチ優先度から推定します。",
      priceRange: "価格レンジ",
      exposure: "露出",
      cpm: "CPM",
      deliverables: "納品物",
      rationale: "根拠",
      emptyTitle: "まず campaign を作成",
      emptyDescription: "KOL pricing は保存済みシグナルレポートとローンチ文脈から生成されます。",
      createProject: "分析を作成",
      priorityLabels: {
        core: "Core",
        supporting: "Supporting",
        test: "Test"
      }
    },
    story: {
      eyebrow: "創業者ナラティブ",
      title: "ストーリースタジオ",
      campaignsTitle: "キャンペーン",
      campaignsDescription: "campaign を選び、GTM 戦略を公開可能なストーリー素材に変換します。",
      founderStory: "創業者ストーリー",
      mediaPitch: "Media Pitch",
      xThread: "X Thread",
      communityAnnouncement: "コミュニティ告知",
      subject: "件名",
      emptyTitle: "まず campaign を作成",
      emptyDescription: "Story assets は保存済み GTM ローンチ計画から生成されます。",
      createProject: "プロジェクトを作成"
    },
    radar: {
      eyebrow: "市場シグナルデスク",
      title: "Signal Radar",
      campaignsTitle: "キャンペーン",
      campaignsDescription: "保存済み分析を選び、市場シグナルと推奨 GTM アクションを確認します。",
      summaryTitle: "シグナルサマリー",
      topMarket: "最強市場",
      strongestSignal: "最強シグナル",
      recommendedAngle: "推奨角度",
      signalsTitle: "シグナル",
      signalsDescription: "オーディエンス、市場、カテゴリ、ローンチ段階から作る決定的 market intelligence。",
      signalStrength: "シグナル強度",
      recommendedMove: "推奨アクション",
      totalSignals: "総シグナル",
      highUrgency: "高緊急度",
      opportunityScore: "機会スコア",
      topicsTitle: "Hot Topics",
      topicsDescription: "最初に動くべきナラティブのランキング。",
      topicUrgency: "緊急度",
      topicRationale: "重要な理由",
      recommendedAction: "推奨アクション",
      keyVoicesTitle: "Key Voices",
      keyVoicesDescription: "ローンチを動かしやすい KOL とコミュニティ archetype。",
      whyItMatters: "重要な理由",
      activationMove: "Activation move",
      actionQueueTitle: "Action Queue",
      actionQueueDescription: "シグナルマップから導く具体的な GTM アクション。",
      channel: "チャネル",
      owner: "担当",
      evidence: "根拠",
      strategyReport: "Strategy Report",
      openKolAction: "KOL Action Plan を開く",
      openPricer: "KOL Pricer を開く",
      urgencyLabels: {
        high: "High",
        medium: "Medium",
        low: "Low"
      },
      sentimentLabels: {
        positive: "Positive",
        mixed: "Mixed",
        watch: "Watch"
      },
      emptyTitle: "まず分析を作成",
      emptyDescription: "Signal Radar は保存済み AI プロダクト文脈から生成されます。",
      createProject: "分析を作成"
    },
    calendarWorkbench: {
      eyebrow: "ローンチ運用",
      title: "キャンペーンカレンダー",
      campaignsTitle: "キャンペーン",
      campaignsDescription: "campaign を選び、ローンチ計画を実行タスクに変換します。",
      summaryTitle: "実行サマリー",
      totalTasks: "タスク",
      highPriority: "高優先度",
      nextMilestone: "次のマイルストーン",
      milestones: "マイルストーン",
      tasksTitle: "タスクボード",
      tasksDescription: "創業者、GTM、コミュニティ、KOL 実行をつなぐ 14 日間シーケンス。",
      day: "Day",
      phase: "フェーズ",
      task: "タスク",
      owner: "担当",
      channel: "チャネル",
      deliverable: "納品物",
      status: "ステータス",
      priority: "優先度",
      emptyTitle: "まず campaign を作成",
      emptyDescription: "Task calendar は保存済み GTM ローンチ計画から生成されます。",
      createProject: "プロジェクトを作成",
      priorityLabels: {
        high: "High",
        medium: "Medium",
        low: "Low"
      }
    },
    demo: {
      eyebrow: "面接プレゼンテーション",
      title: "デモガイド",
      openingTitle: "2 分間の導入",
      opening:
        "AI Product Signal Radar は AI プロダクトのソーシャルシグナルを GTM 判断へ変換します。ナラティブ、キーボイス、緊急度、KOL アクション、価格レンジ、共有可能なローンチレポートを生成します。",
      routeTitle: "おすすめのデモ順序",
      route: [
        "Signal Radar を開き、AI GTM 向けソーシャルリスニングとして位置付けます。",
        "VectorForge を選び、トピック、緊急度、センチメント、キーボイスを見せます。",
        "Action Queue で、シグナルが具体的な GTM アクションへ変わることを説明します。",
        "KOL Action Plan を開き、市場フィット、KOL タイプ、そのまま使える activation brief を見せます。",
        "KOL Pricer を開き、予算、納品物、露出、CPM を見せます。",
        "新規分析を作成し、英語・中国語・日本語を切り替えてグローバル GTM 対応を示します。"
      ],
      signalsTitle: "JE Labs への適合シグナル",
      signals: [
        "プロダクトフォーカス：agency の GTM 業務を明確な「social signal -> KOL action」フローに集約。",
        "エンジニアリング：Next.js full-stack、Prisma、Server Actions、テスト、seed データ。",
        "Growth 理解：市場ナラティブ、センチメント、キーボイス、KOL brief、価格、リスクを接続。",
        "KOL 実行：シグナル文脈を優先度付き KOL activation brief に変換。",
        "Marketing Engineering：KOL pricing と市場シグナルを運用アクションに変換。",
        "グローバル対応：UI と生成 brief が英語・中国語・日本語に対応。"
      ],
      closeTitle: "締めの一言",
      close:
        "この MVP は、Marketing Engineer が social listening と KOL GTM playbook をソフトウェア化し、より速いシグナル解釈、明確なアクション、再利用可能な launch intelligence を作れることを示します。",
      openDashboard: "Signal Radar を開く",
      createProject: "分析を作成"
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
