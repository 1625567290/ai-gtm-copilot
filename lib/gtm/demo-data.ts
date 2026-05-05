import type { ProjectIntakeInput } from "../validation/project";

export const sampleProjects: Array<{
  project: ProjectIntakeInput;
  status: "active" | "draft";
  priority: "high" | "medium";
  notes: string;
}> = [
  {
    project: {
      name: "VectorForge",
      website: "https://vectorforge.ai",
      category: "AI Infra",
      stage: "pre-launch",
      targetMarkets: ["US", "Japan"],
      audiences: ["developers", "AI researchers"],
      summary:
        "A vector database optimized for agent memory, low-latency retrieval, and observability across production AI workflows.",
      moat: "Hybrid memory compression, transparent retrieval traces, and developer-first debugging tools.",
      launchGoal: "Recruit 500 technical beta users and 20 design partners in 30 days.",
      budgetBand: "$10k-$25k",
      tone: "technical",
      outputLocale: "en"
    },
    status: "active",
    priority: "high",
    notes: "Primary English walkthrough case for the interview demo."
  },
  {
    project: {
      name: "MossBench",
      website: "https://mossbench.ai",
      category: "Developer Tool",
      stage: "public beta",
      targetMarkets: ["Korea", "Japan", "Southeast Asia"],
      audiences: ["developers", "founders"],
      summary:
        "An evaluation workspace that helps AI teams compare agent performance, trace failures, and publish reproducible benchmarks.",
      moat: "Deep trace comparison, repeatable benchmark templates, and collaboration workflows for technical teams.",
      launchGoal: "Drive 300 qualified beta signups from AI engineering teams in 14 days.",
      budgetBand: "$10k-$25k",
      tone: "community-native",
      outputLocale: "zh"
    },
    status: "draft",
    priority: "medium",
    notes: "Chinese brief sample to demonstrate multilingual GTM output."
  }
];
