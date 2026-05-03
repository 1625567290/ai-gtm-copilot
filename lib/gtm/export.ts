import type { ProjectIntakeInput } from "../validation/project";
import type { CampaignPlan } from "./types";

export function campaignToMarkdown(project: ProjectIntakeInput, campaign: CampaignPlan) {
  const lines = [
    `# ${campaign.name}`,
    "",
    `**Product:** ${project.name}`,
    `**Category:** ${project.category}`,
    `**Stage:** ${project.stage}`,
    `**Markets:** ${project.targetMarkets.join(", ")}`,
    `**Audiences:** ${project.audiences.join(", ")}`,
    `**Readiness Score:** ${campaign.readinessScore}/100`,
    "",
    "## Positioning",
    "",
    campaign.positioning,
    "",
    "## ICP",
    "",
    campaign.icp,
    "",
    "## Channel Mix",
    "",
    ...campaign.channelMix.map(
      (channel) => `- **${channel.name}** (${channel.priority}): ${channel.role} ${channel.rationale}`
    ),
    "",
    "## KOL Plan",
    "",
    ...campaign.kolPlan.map(
      (kol) => `- **${kol.market} / ${kol.archetype}** (${kol.budget}): ${kol.brief}`
    ),
    "",
    "## Content Angles",
    "",
    ...campaign.contentAngles.map((angle) => `- ${angle}`),
    "",
    "## 14-Day Launch Calendar",
    "",
    ...campaign.launchCalendar.map(
      (item) => `- Day ${item.day}: **${item.focus}** — ${item.action} Owner: ${item.owner}.`
    ),
    "",
    "## Success Metrics",
    "",
    ...campaign.successMetrics.map((metric) => `- ${metric}`),
    "",
    "## Risks",
    "",
    ...campaign.risks.map((risk) => `- ${risk}`),
    ""
  ];

  return lines.join("\n");
}
