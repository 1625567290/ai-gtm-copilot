import type { CampaignInput, ChannelRecommendation, KolRecommendation } from "./types";

type ChannelRule = {
  stages: CampaignInput["stage"][];
  audiences: CampaignInput["audiences"][number][];
  channels: ChannelRecommendation[];
};

export const channelRules: ChannelRule[] = [
  {
    stages: ["pre-launch", "private beta", "public beta"],
    audiences: ["developers", "AI researchers"],
    channels: [
      {
        name: "Developer communities",
        role: "Recruit technical beta users through Discord, GitHub, Reddit, Hacker News, and AI builder groups.",
        priority: "primary",
        rationale: "Technical products need practitioner validation before broad awareness."
      },
      {
        name: "Technical founder content",
        role: "Publish founder-led technical notes, architecture explainers, and benchmark threads.",
        priority: "primary",
        rationale: "Developer trust grows when the team demonstrates depth rather than vague positioning."
      },
      {
        name: "Partner demos",
        role: "Run small co-marketing demos with early infra, tooling, or model ecosystem partners.",
        priority: "secondary",
        rationale: "Partner proof makes pre-launch claims easier to believe."
      }
    ]
  },
  {
    stages: ["post-launch", "ecosystem expansion"],
    audiences: ["enterprise buyers", "founders", "investors"],
    channels: [
      {
        name: "Analyst and operator briefings",
        role: "Brief enterprise operators, ecosystem analysts, and niche AI newsletters with proof-led materials.",
        priority: "primary",
        rationale: "Later-stage campaigns need credibility and buying-context translation."
      },
      {
        name: "Customer proof campaign",
        role: "Turn customer workflows into case studies, demo clips, and executive social snippets.",
        priority: "primary",
        rationale: "Post-launch growth depends on proof, not just novelty."
      },
      {
        name: "Founder and investor roundtables",
        role: "Host focused private sessions with founders, funds, and strategic partners.",
        priority: "secondary",
        rationale: "High-context rooms create warmer opportunities than broad paid reach."
      }
    ]
  },
  {
    stages: ["fundraising"],
    audiences: ["investors", "founders"],
    channels: [
      {
        name: "Investor narrative sprint",
        role: "Package traction, category timing, and founder-market fit into investor-facing content.",
        priority: "primary",
        rationale: "Fundraising campaigns need crisp narrative assets that travel quickly."
      },
      {
        name: "Founder-led social proof",
        role: "Coordinate founder threads, builder endorsements, and ecosystem quote cards.",
        priority: "secondary",
        rationale: "Credible third-party validation increases investor confidence."
      }
    ]
  }
];

export const fallbackChannels: ChannelRecommendation[] = [
  {
    name: "Narrative reset",
    role: "Clarify category, audience, and wedge before scaling distribution.",
    priority: "primary",
    rationale: "A clear narrative prevents wasted KOL and media spend."
  },
  {
    name: "Community validation loop",
    role: "Test messaging with a small set of target users and community operators.",
    priority: "secondary",
    rationale: "Early feedback improves the launch plan before public amplification."
  }
];

export const marketKolArchetypes: Record<string, Omit<KolRecommendation, "market" | "budget">[]> = {
  US: [
    {
      archetype: "AI infra builder-educator",
      brief: "Explain the technical wedge through benchmark commentary, demo walkthroughs, and candid tradeoff analysis."
    },
    {
      archetype: "Founder/operator newsletter",
      brief: "Frame the launch around workflow impact, adoption signals, and category timing."
    }
  ],
  Japan: [
    {
      archetype: "Japanese AI developer community lead",
      brief: "Localize technical proof and invite builders into beta feedback sessions."
    }
  ],
  Korea: [
    {
      archetype: "Korean AI and startup ecosystem commentator",
      brief: "Connect product novelty to local builder communities and venture conversations."
    }
  ],
  "Southeast Asia": [
    {
      archetype: "SEA startup and developer ecosystem curator",
      brief: "Position the product as practical infrastructure for fast-moving regional teams."
    }
  ],
  CIS: [
    {
      archetype: "CIS technical founder channel",
      brief: "Use deep technical explainers and community AMAs to earn credibility."
    }
  ],
  Europe: [
    {
      archetype: "European enterprise AI operator",
      brief: "Emphasize trust, compliance-adjacent workflows, and deployment proof."
    }
  ],
  Global: [
    {
      archetype: "Global AI research curator",
      brief: "Translate the technical claim into a concise narrative that travels across markets."
    }
  ]
};

export const budgetGuidance: Record<CampaignInput["budgetBand"], string> = {
  "under $5k": "micro-test",
  "$5k-$10k": "focused test",
  "$10k-$25k": "balanced launch",
  "$25k-$50k": "multi-market sprint",
  "$50k+": "global amplification"
};

export const categoryFrames: Record<CampaignInput["category"], string> = {
  "AI Infra": "infrastructure layer for teams building production AI systems",
  "GenAI App": "AI-native workflow product that makes advanced creation more accessible",
  "Data Platform": "data platform for teams that need reliable AI-ready information flows",
  Robotics: "robotics product connecting intelligent software with real-world execution",
  Fintech: "fintech product translating AI capability into trusted financial workflows",
  "Developer Tool": "developer tool that removes friction from modern AI engineering",
  Other: "AI product with a focused launch wedge and clear adoption path"
};

export const toneVerbs: Record<CampaignInput["tone"], string> = {
  technical: "prove",
  "founder-led": "explain",
  bold: "challenge",
  trusted: "validate",
  "community-native": "mobilize"
};

export const calendarActions = [
  "Finalize positioning one-liner and beta invite CTA.",
  "Publish technical narrative post with product architecture or workflow proof.",
  "Brief first KOL wave with localized talking points and demo assets.",
  "Run community validation session and collect objections.",
  "Release founder thread anchored on user pain and category timing.",
  "Share benchmark, workflow, or customer proof artifact.",
  "Host small group demo for target users and ecosystem partners.",
  "Launch second KOL wave with proof-led clips and quote cards.",
  "Pitch niche newsletters and operator communities with concise media kit.",
  "Retarget warm communities with beta invite or demo booking CTA.",
  "Publish objection-handling post based on community questions.",
  "Activate ambassador or early-user referral prompt.",
  "Collect campaign metrics and identify strongest channel-market pair.",
  "Ship launch recap with traction, learnings, and next milestone."
];
