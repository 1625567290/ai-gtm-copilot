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
      productName: "AI GTM Copilot",
      tagline: "Launch strategy workspace",
      navDashboard: "Dashboard",
      navNewProject: "New GTM Project",
      navKolStudio: "KOL Studio",
      navPricer: "KOL Pricer",
      navStory: "Story Studio",
      navRadar: "Social Radar",
      navCalendar: "Campaign Calendar",
      navDemoGuide: "Demo Guide",
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
      workbenchesTitle: "Growth Workbenches",
      workbenchesDescription: "Specialized operator tools for JE Labs-style GTM execution.",
      workbenchDescriptions: {
        kol: "Score market fit and generate KOL activation briefs.",
        pricer: "Estimate KOL pricing, deliverables, exposure, and CPM.",
        story: "Create founder story, media pitch, thread, and community copy.",
        radar: "Read social signals and choose the strongest content angle.",
        calendar: "Turn launch strategy into a 14-day task board."
      },
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
      formError: "Please complete the required product fields and select at least one market and audience.",
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
      growthWorkbenches: "Growth Workbenches",
      growthWorkbenchesDescription: "Continue this campaign through pricing, story, radar, and execution tools.",
      metrics: "Metrics",
      metricsDescription: "Recommended success signals.",
      risks: "Risks"
    },
    kol: {
      eyebrow: "KOL activation intelligence",
      title: "KOL Market Fit",
      campaignsTitle: "Campaigns",
      campaignsDescription: "Pick a saved launch plan to score KOL-market fit.",
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
      emptyDescription: "KOL fit is generated from saved GTM launch plans.",
      createProject: "Create project",
      tierLabels: {
        Core: "Core",
        Expansion: "Expansion",
        Probe: "Probe"
      }
    },
    pricer: {
      eyebrow: "Budget intelligence",
      title: "KOL Pricer",
      campaignsTitle: "Campaigns",
      campaignsDescription: "Select a saved campaign to price market-specific KOL packages.",
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
      emptyDescription: "KOL pricing is calculated from saved GTM launch plans.",
      createProject: "Create project",
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
      title: "Social Listening Radar",
      campaignsTitle: "Campaigns",
      campaignsDescription: "Select a campaign to inspect social signals and recommended content moves.",
      summaryTitle: "Signal Summary",
      topMarket: "Top market",
      strongestSignal: "Strongest signal",
      recommendedAngle: "Recommended angle",
      signalsTitle: "Signals",
      signalsDescription: "Mock market intelligence shaped by audience, market, category, and launch stage.",
      signalStrength: "Signal strength",
      recommendedMove: "Recommended move",
      sentimentLabels: {
        positive: "Positive",
        mixed: "Mixed",
        watch: "Watch"
      },
      emptyTitle: "Create a campaign first",
      emptyDescription: "Social radar is generated from saved GTM launch plans.",
      createProject: "Create project"
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
        "AI GTM Copilot productizes a JE Labs-style launch workflow: capture AI product context, generate positioning, channel strategy, KOL plan, content angles, a 14-day calendar, and export a shareable GTM brief.",
      routeTitle: "Recommended walkthrough",
      route: [
        "Start on the dashboard and explain that saved campaigns are persisted in SQLite.",
        "Open VectorForge to show the English AI Infra launch plan.",
        "Open MossBench to show a Chinese GTM brief for Asia-focused developer growth.",
        "Open KOL Studio to show market scoring, recommended KOL archetypes, and a copy-ready brief.",
        "Open KOL Pricer to turn market fit into budget ranges, deliverables, and expected exposure.",
        "Open Story Studio to show founder story, media pitch, X thread, and community announcement assets.",
        "Open Social Radar to explain market signals and the recommended content angle.",
        "Open Campaign Calendar to show the 14-day plan as operator-ready tasks.",
        "Create a new project and switch the brief language between English, Chinese, and Japanese.",
        "Export markdown to show the work can become a client-facing brief or deck input."
      ],
      signalsTitle: "Signals for JE Labs",
      signals: [
        "Product thinking: turns agency GTM work into a repeatable operator tool.",
        "Engineering: full-stack Next.js, Prisma, Server Actions, tests, and seed data.",
        "Growth fluency: covers ICP, KOL, channels, content, calendar, metrics, and risks.",
        "KOL execution: turns market and audience context into prioritized KOL activation briefs.",
        "Marketing engineering: prices KOL packages, generates story assets, reads market signals, and translates plans into tasks.",
        "Global readiness: UI and generated briefs support English, Chinese, and Japanese."
      ],
      closeTitle: "Closing line",
      close:
        "This MVP shows how a Marketing Engineer can convert GTM playbooks into software: faster strategy drafts, better campaign structure, and reusable launch intelligence.",
      openDashboard: "Open dashboard",
      createProject: "Create project"
    },
    options: optionLabels.en
  },
  zh: {
    app: {
      productName: "AI GTM Copilot",
      tagline: "发布策略工作台",
      navDashboard: "仪表盘",
      navNewProject: "新建 GTM 项目",
      navKolStudio: "KOL 工作台",
      navPricer: "KOL 定价器",
      navStory: "叙事工作台",
      navRadar: "社媒雷达",
      navCalendar: "活动日历",
      navDemoGuide: "展示指南",
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
      workbenchesTitle: "增长工作台",
      workbenchesDescription: "围绕 JE Labs 式 GTM 执行设计的专项运营工具。",
      workbenchDescriptions: {
        kol: "评估市场匹配，并生成 KOL activation brief。",
        pricer: "估算 KOL 报价、交付物、曝光和 CPM。",
        story: "生成创始人故事、媒体 pitch、thread 和社区文案。",
        radar: "读取市场信号，选择最强内容切入角度。",
        calendar: "把发布策略转成 14 天任务看板。"
      },
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
      formError: "请补全必填产品信息，并至少选择一个目标市场和一个目标受众。",
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
      growthWorkbenches: "增长工作台",
      growthWorkbenchesDescription: "继续把这个 campaign 推进到定价、叙事、雷达和执行工具。",
      metrics: "指标",
      metricsDescription: "建议关注的成功信号。",
      risks: "风险"
    },
    kol: {
      eyebrow: "KOL 启动智能",
      title: "KOL 市场匹配",
      campaignsTitle: "活动",
      campaignsDescription: "选择一个已保存的发布计划，评估 KOL-market fit。",
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
      emptyDescription: "KOL 匹配会基于已保存的 GTM 发布计划生成。",
      createProject: "新建项目",
      tierLabels: {
        Core: "核心",
        Expansion: "扩张",
        Probe: "验证"
      }
    },
    pricer: {
      eyebrow: "预算智能",
      title: "KOL 定价器",
      campaignsTitle: "活动",
      campaignsDescription: "选择一个已保存的 campaign，估算不同市场的 KOL 合作包。",
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
      emptyDescription: "KOL 定价会基于已保存的 GTM 发布计划生成。",
      createProject: "新建项目",
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
      title: "社媒监听雷达",
      campaignsTitle: "活动",
      campaignsDescription: "选择一个 campaign，查看市场信号和推荐内容动作。",
      summaryTitle: "信号摘要",
      topMarket: "最强市场",
      strongestSignal: "最强信号",
      recommendedAngle: "推荐切入角度",
      signalsTitle: "市场信号",
      signalsDescription: "基于受众、市场、类别和发布阶段生成的模拟市场 intelligence。",
      signalStrength: "信号强度",
      recommendedMove: "推荐动作",
      sentimentLabels: {
        positive: "正向",
        mixed: "混合",
        watch: "观察"
      },
      emptyTitle: "先创建一个 campaign",
      emptyDescription: "社媒雷达会基于已保存的 GTM 发布计划生成。",
      createProject: "新建项目"
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
        "AI GTM Copilot 把 JE Labs 式发布工作流产品化：输入 AI 产品上下文，生成定位、渠道策略、KOL 计划、内容角度、14 天日历，并导出可分享的 GTM brief。",
      routeTitle: "推荐讲解路线",
      route: [
        "从 dashboard 开始，说明 campaign 会持久化保存到 SQLite。",
        "打开 VectorForge，展示英文 AI Infra 发布计划。",
        "打开 MossBench，展示面向亚洲开发者增长的中文 GTM brief。",
        "打开 KOL 工作台，展示市场评分、推荐 KOL 类型和可直接使用的 brief。",
        "打开 KOL 定价器，展示预算区间、交付物和预估曝光。",
        "打开叙事工作台，展示创始人故事、媒体 pitch、X thread 和社区公告。",
        "打开社媒雷达，说明市场信号和推荐内容切入角度。",
        "打开活动日历，把 14 天计划展示为可执行任务。",
        "新建项目，并切换 brief 语言为英文、中文或日文。",
        "导出 Markdown，说明它可以继续变成客户 brief 或 deck 输入。"
      ],
      signalsTitle: "JE Labs 相关信号",
      signals: [
        "产品判断：把 agency 的 GTM 工作变成可重复的运营工具。",
        "工程能力：Next.js 全栈、Prisma、Server Actions、测试和 seed 数据。",
        "增长理解：覆盖 ICP、KOL、渠道、内容、日历、指标和风险。",
        "KOL 执行：把市场和受众上下文转成优先级明确的 KOL activation brief。",
        "Marketing Engineering：把 KOL 定价、叙事资产、市场信号和执行任务都产品化。",
        "全球化准备：UI 和生成 brief 支持英文、中文、日文。"
      ],
      closeTitle: "收尾表达",
      close:
        "这个 MVP 展示了 Marketing Engineer 如何把 GTM playbook 软件化：更快产出策略初稿，更好组织 campaign，并沉淀可复用的发布 intelligence。",
      openDashboard: "打开仪表盘",
      createProject: "新建项目"
    },
    options: optionLabels.zh
  },
  ja: {
    app: {
      productName: "AI GTM Copilot",
      tagline: "ローンチ戦略ワークスペース",
      navDashboard: "ダッシュボード",
      navNewProject: "新規 GTM プロジェクト",
      navKolStudio: "KOL スタジオ",
      navPricer: "KOL プライサー",
      navStory: "ストーリースタジオ",
      navRadar: "ソーシャルレーダー",
      navCalendar: "キャンペーンカレンダー",
      navDemoGuide: "デモガイド",
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
      workbenchesTitle: "Growth Workbenches",
      workbenchesDescription: "JE Labs 型 GTM 実行のための専門オペレーターツール。",
      workbenchDescriptions: {
        kol: "市場フィットを評価し、KOL activation brief を生成。",
        pricer: "KOL 価格、納品物、露出、CPM を推定。",
        story: "創業者ストーリー、media pitch、thread、コミュニティ文面を生成。",
        radar: "市場シグナルを読み、最も強いコンテンツ角度を選択。",
        calendar: "ローンチ戦略を 14 日間のタスクボードに変換。"
      },
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
      formError: "必須項目を入力し、対象市場とオーディエンスを少なくとも一つずつ選択してください。",
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
      growthWorkbenches: "Growth Workbenches",
      growthWorkbenchesDescription: "この campaign を pricing、story、radar、execution ツールへ進めます。",
      metrics: "指標",
      metricsDescription: "推奨される成功シグナル。",
      risks: "リスク"
    },
    kol: {
      eyebrow: "KOL アクティベーション intelligence",
      title: "KOL 市場フィット",
      campaignsTitle: "キャンペーン",
      campaignsDescription: "保存済みのローンチ計画を選び、KOL-market fit を評価します。",
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
      emptyDescription: "KOL fit は保存済み GTM ローンチ計画から生成されます。",
      createProject: "プロジェクトを作成",
      tierLabels: {
        Core: "Core",
        Expansion: "Expansion",
        Probe: "Probe"
      }
    },
    pricer: {
      eyebrow: "予算 intelligence",
      title: "KOL プライサー",
      campaignsTitle: "キャンペーン",
      campaignsDescription: "保存済み campaign を選び、市場別 KOL パッケージを見積もります。",
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
      emptyDescription: "KOL pricing は保存済み GTM ローンチ計画から生成されます。",
      createProject: "プロジェクトを作成",
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
      title: "ソーシャルリスニングレーダー",
      campaignsTitle: "キャンペーン",
      campaignsDescription: "campaign を選び、市場シグナルと推奨コンテンツ施策を確認します。",
      summaryTitle: "シグナルサマリー",
      topMarket: "最強市場",
      strongestSignal: "最強シグナル",
      recommendedAngle: "推奨角度",
      signalsTitle: "シグナル",
      signalsDescription: "オーディエンス、市場、カテゴリ、ローンチ段階から作る mock market intelligence。",
      signalStrength: "シグナル強度",
      recommendedMove: "推奨アクション",
      sentimentLabels: {
        positive: "Positive",
        mixed: "Mixed",
        watch: "Watch"
      },
      emptyTitle: "まず campaign を作成",
      emptyDescription: "Social radar は保存済み GTM ローンチ計画から生成されます。",
      createProject: "プロジェクトを作成"
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
        "AI GTM Copilot は JE Labs 型のローンチワークフローをプロダクト化します。AI プロダクトの文脈を入力し、ポジショニング、チャネル戦略、KOL 計画、コンテンツ角度、14 日間カレンダー、共有可能な GTM brief を生成します。",
      routeTitle: "おすすめのデモ順序",
      route: [
        "dashboard から始め、campaign が SQLite に保存されることを説明します。",
        "VectorForge を開き、英語の AI Infra ローンチ計画を見せます。",
        "MossBench を開き、アジア向け開発者成長の中国語 GTM brief を見せます。",
        "KOL スタジオを開き、市場スコア、推奨 KOL タイプ、そのまま使える brief を見せます。",
        "KOL プライサーを開き、予算レンジ、納品物、想定露出を見せます。",
        "ストーリースタジオを開き、創業者ストーリー、media pitch、X thread、コミュニティ告知を見せます。",
        "ソーシャルレーダーを開き、市場シグナルと推奨コンテンツ角度を説明します。",
        "キャンペーンカレンダーを開き、14 日間計画を実行タスクとして見せます。",
        "新規プロジェクトを作成し、brief 言語を英語・中国語・日本語に切り替えます。",
        "Markdown をエクスポートし、client brief や deck の入力にできることを示します。"
      ],
      signalsTitle: "JE Labs への適合シグナル",
      signals: [
        "プロダクト思考：agency の GTM 業務を再利用可能な運用ツールに変換。",
        "エンジニアリング：Next.js full-stack、Prisma、Server Actions、テスト、seed データ。",
        "Growth 理解：ICP、KOL、チャネル、コンテンツ、カレンダー、指標、リスクを網羅。",
        "KOL 実行：市場とオーディエンス文脈を優先度付き KOL activation brief に変換。",
        "Marketing Engineering：KOL pricing、story assets、市場シグナル、実行タスクをプロダクト化。",
        "グローバル対応：UI と生成 brief が英語・中国語・日本語に対応。"
      ],
      closeTitle: "締めの一言",
      close:
        "この MVP は、Marketing Engineer が GTM playbook をソフトウェア化し、より速い戦略ドラフト、より構造化された campaign、再利用可能な launch intelligence を作れることを示します。",
      openDashboard: "ダッシュボードを開く",
      createProject: "プロジェクトを作成"
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
