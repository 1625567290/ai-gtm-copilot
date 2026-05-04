import type { ProjectIntakeInput } from "../validation/project";
import type { CampaignPlan } from "./types";

export function campaignToMarkdown(project: ProjectIntakeInput, campaign: CampaignPlan) {
  const labels = {
    en: {
      product: "Product",
      category: "Category",
      stage: "Stage",
      markets: "Markets",
      audiences: "Audiences",
      readiness: "Readiness Score",
      positioning: "Positioning",
      icp: "ICP",
      channelMix: "Channel Mix",
      kolPlan: "KOL Plan",
      contentAngles: "Content Angles",
      calendar: "14-Day Launch Calendar",
      day: "Day",
      owner: "Owner",
      successMetrics: "Success Metrics",
      risks: "Risks"
    },
    zh: {
      product: "产品",
      category: "类别",
      stage: "阶段",
      markets: "市场",
      audiences: "受众",
      readiness: "准备度",
      positioning: "定位",
      icp: "ICP",
      channelMix: "渠道组合",
      kolPlan: "KOL 计划",
      contentAngles: "内容角度",
      calendar: "14 天发布日历",
      day: "第",
      owner: "负责人",
      successMetrics: "成功指标",
      risks: "风险"
    },
    ja: {
      product: "プロダクト",
      category: "カテゴリ",
      stage: "ステージ",
      markets: "市場",
      audiences: "オーディエンス",
      readiness: "準備度",
      positioning: "ポジショニング",
      icp: "ICP",
      channelMix: "チャネル構成",
      kolPlan: "KOL 計画",
      contentAngles: "コンテンツ角度",
      calendar: "14 日間ローンチカレンダー",
      day: "Day",
      owner: "担当",
      successMetrics: "成功指標",
      risks: "リスク"
    }
  }[project.outputLocale ?? "en"];

  const lines = [
    `# ${campaign.name}`,
    "",
    `**${labels.product}:** ${project.name}`,
    `**${labels.category}:** ${project.category}`,
    `**${labels.stage}:** ${project.stage}`,
    `**${labels.markets}:** ${project.targetMarkets.join(", ")}`,
    `**${labels.audiences}:** ${project.audiences.join(", ")}`,
    `**${labels.readiness}:** ${campaign.readinessScore}/100`,
    "",
    `## ${labels.positioning}`,
    "",
    campaign.positioning,
    "",
    `## ${labels.icp}`,
    "",
    campaign.icp,
    "",
    `## ${labels.channelMix}`,
    "",
    ...campaign.channelMix.map(
      (channel) => `- **${channel.name}** (${channel.priority}): ${channel.role} ${channel.rationale}`
    ),
    "",
    `## ${labels.kolPlan}`,
    "",
    ...campaign.kolPlan.map(
      (kol) => `- **${kol.market} / ${kol.archetype}** (${kol.budget}): ${kol.brief}`
    ),
    "",
    `## ${labels.contentAngles}`,
    "",
    ...campaign.contentAngles.map((angle) => `- ${angle}`),
    "",
    `## ${labels.calendar}`,
    "",
    ...campaign.launchCalendar.map(
      (item) => `- ${labels.day} ${item.day}: **${item.focus}** — ${item.action} ${labels.owner}: ${item.owner}.`
    ),
    "",
    `## ${labels.successMetrics}`,
    "",
    ...campaign.successMetrics.map((metric) => `- ${metric}`),
    "",
    `## ${labels.risks}`,
    "",
    ...campaign.risks.map((risk) => `- ${risk}`),
    ""
  ];

  return lines.join("\n");
}
