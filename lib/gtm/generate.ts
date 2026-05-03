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

export function generateCampaignPlan(input: CampaignInput): CampaignPlan {
  const frame = categoryFrames[input.category];
  const primaryAudience = input.audiences.join(", ");
  const markets = input.targetMarkets.join(", ");
  const moat = stripTrailingPunctuation(input.moat);

  return {
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
