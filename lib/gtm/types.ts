import type { ProjectIntakeInput } from "../validation/project";

export type ChannelRecommendation = {
  name: string;
  role: string;
  priority: "primary" | "secondary" | "supporting";
  rationale: string;
};

export type KolRecommendation = {
  archetype: string;
  market: string;
  budget: string;
  brief: string;
};

export type LaunchCalendarItem = {
  day: number;
  focus: string;
  action: string;
  owner: string;
};

export type CampaignPlan = {
  name: string;
  readinessScore: number;
  positioning: string;
  icp: string;
  channelMix: ChannelRecommendation[];
  kolPlan: KolRecommendation[];
  contentAngles: string[];
  launchCalendar: LaunchCalendarItem[];
  successMetrics: string[];
  risks: string[];
};

export type CampaignInput = ProjectIntakeInput;
